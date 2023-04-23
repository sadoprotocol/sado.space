var sado = 
{
    sdk:
    {
        lookup:
        {
            address: function(params = {}, callback)
            {
                var options = 
                {
                    address: false,
                    network: 'regtest',
                    ordinals: true
                };
                Object.assign(options, params);
                if(options.address && options.network && typeof callback == 'function')
                {
                    ordit_apis.batter('unspents', options.address, function(results)
                    {
                        if
                        (
                            typeof results == 'object'
                            && typeof results[0].ordinals == 'object'
                            && typeof results[0].ordinals[0].name != 'undefined'
                            && typeof results[0].ordinals[0].output != 'undefined'
                            && typeof results[0].ordinals[0].rarity != 'undefined'
                            && typeof results[0].ordinals[0].size != 'undefined'
                            && typeof results[0].ordinals[0].start != 'undefined'
                        ){
                            var wallet = 
                            {
                                counts:
                                {
                                    satoshis: 0,
                                    cardinals: 0,
                                    ordinals: 0,
                                    inscriptions: 0
                                },
                                ordinals: [],
                                inscriptions: []
                            };
                            jQuery.each(results, function(txi)
                            {
                                var tx = results[txi];
                                var value = parseInt(parseFloat(tx.amount) * (10 ** 8));
                                wallet.counts.satoshis+= value;
                                jQuery.each(tx.ordinals, function(oi)
                                {
                                    var ord = tx.ordinals[oi];
                                    wallet.ordinals.push(ord);
                                    wallet.counts.ordinals++;
                                });
                                if
                                (
                                    typeof tx.inscriptions == 'object'
                                    && tx.inscriptions.length > 0
                                ){
                                    jQuery.each(tx.inscriptions, function(ii)
                                    {
                                        var art = tx.inscriptions[ii];
                                        wallet.inscriptions.push(art);
                                        wallet.counts.inscriptions++;
                                    });
                                }
                                else
                                {
                                    wallet.counts.cardinals+= value;
                                }
                            });
                            callback(wallet);
                        }
                        else
                        {
                            callback(false);
                        }
                    }, options.network);
                }
            },
            offer: function(params = {}, callback)
            {
                var options = 
                {
                    cid: false,
                    network: 'regtest'
                };
                Object.assign(options, params);
                if(options.cid && options.network && typeof callback == 'function')
                {
                    var first_callback = function(results)
                    {
                        if
                        (
                            typeof results == 'object'
                            && typeof results.ts != 'undefined'
                            && typeof results.origin != 'undefined'
                            && typeof results.taker != 'undefined'
                            && typeof results.signature != 'undefined'
                            && typeof results.offer != 'undefined'
                        ){
                            var this_callback = function(order)
                            {
                                if(typeof order == 'object')
                                {
                                    results.order = order;
                                }
                                callback(results);
                            }
                            fetch
                            (
                                ordit_db.apis.gateway + results.origin, 
                                {
                                    method: 'GET',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    }
                                }
                            )
                            .then(response => response.json())
                            .then(response => this_callback(response))
                            .catch(response => this_callback(false))
                        }
                        else
                        {
                            batter.modal('Warning', 'Invalid JSON for SADO offer!');
                        }
                    }
                    fetch
                    (
                        ordit_db.apis.gateway + options.cid, 
                        {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    .then(response => response.json())
                    .then(response => first_callback(response))
                    .catch(response => first_callback(false))
                }
            },
            order: function(params = {}, callback)
            {
                var options = 
                {
                    cid: false,
                    network: 'regtest'
                };
                Object.assign(options, params);
                if(options.cid && options.network && typeof callback == 'function')
                {
                    var this_callback = function(results)
                    {
                        if
                        (
                            typeof results == 'object'
                            && typeof results.ts != 'undefined'
                            && typeof results.location != 'undefined'
                            && typeof results.maker != 'undefined'
                            && typeof results.signature != 'undefined'
                            && typeof results.type != 'undefined'
                            && 
                            (
                                typeof results.satoshis != 'undefined' // TODO - change to cardinals
                                || typeof results.satoshi != 'undefined'
                            )
                        ){
                            callback(results);
                        }
                        else
                        {
                            callback(false);
                        }
                    }
                    fetch
                    (
                        ordit_db.apis.gateway + options.cid, 
                        {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    .then(response => response.json())
                    .then(response => this_callback(response))
                    .catch(response => this_callback(false))
                }
            },
            orderbook: function(params = {}, callback)
            {
                var options = 
                {
                    address: false,
                    network: 'regtest'
                };
                Object.assign(options, params);
                if(options.address && options.network && typeof callback == 'function')
                {
                    ordit_apis.batter('../sado/get/', options.address, function(results)
                    {
                        callback(results);
                    });
                }
            }
        }
    },
    html:
    {
        buttons: function()
        {
            jQuery('body').on('click', '.btn-sado-clear-cache', function(e)
            {
                e.preventDefault();
                batter.loader(true, 'REFRESHING');
                var v = ordit_db.defaults.version;
                var n = ordit_db.defaults.network;
                sessionStorage.removeItem('ordit_orderbook_cache_' + v + '_' + n);
                setTimeout(function()
                {
                    winodw.location.reload();
                }, 150);
            });
        },
        forms: function()
        {
            sado.html.buttons();
            batter.copy();
            jQuery('body').on('submit', 'form.sado-address-form', function(e)
            {
                e.preventDefault();
                var form =jQuery(this);
                var address = jQuery(form).find('.sado-input-address').val();
                var network = jQuery(form).find('.sado-input-network').val();
                if(address && network)
                {
                    batter.loader(true, "FECTHING");
                    var lookup = 
                    {
                        address: address,
                        network: network
                    };
                    sado.sdk.lookup.address(lookup, function(wallet)
                    {
                        if(typeof wallet == 'object')
                        {
                            var contents = '<alert class="alert alert-block alert-info">';
                            contents+= '<div class="row">';
                            contents+= '<div class="col-md-6"><small>Ordinals</small><hr><h3>' + wallet.counts.ordinals.toLocaleString() + '</h3></div>';
                            contents+= '<div class="col-md-6"><small>Inscriptions</small><hr><h3>' + wallet.counts.inscriptions.toLocaleString() + '</h3></div>';
                            contents+= '</div>';
                            contents+= '<p>&nbsp</p>';
                            contents+= '<div class="row">';
                            contents+= '<div class="col-md-6"><small>Cardinals</small><hr><h3>' + wallet.counts.cardinals.toLocaleString() + '</h3></div>';
                            contents+= '<div class="col-md-6"><small>Satoshis</small><hr><h3>' + wallet.counts.satoshis.toLocaleString() + '</h3></div>';
                            contents+= '</div>';
                            contents+= '</alert>';
                            
                            contents+= '<a href="#" class="btn btn-block btn-outline-light" data-bs-toggle="collapse" data-bs-target="#collapseResults">SHOW CONTENTS</a>';
                            
                            contents+= '<div class="collapse" id="collapseResults">';
                            contents+= '<alert class="alert alert-block">';
                            
                            var in_count = 0;
                            if(typeof wallet.inscriptions == 'object')
                            {
                                in_count = wallet.inscriptions.length;
                            }
                            jQuery.each(wallet.ordinals, function(wo)
                            {
                                var o = wallet.ordinals[wo];
                                if(typeof o.inscriptions == 'object' && o.inscriptions.length > 0)
                                {
                                    in_count = o.inscriptions.length;
                                }
                                contents+= '<hr>Ordinal ID: <strong>' + o.start + '</strong>';
                                contents+= '<small>';
                                contents+= '<br />Name: <strong>' + o.name + '</strong> | Rarity: <strong>' + o.rarity + '</strong>';
                                contents+= '<br />Inscriptions: <strong>' + in_count + '</strong>';
                                contents+= '</small>';
                            });
                            
                            if(in_count)
                            {
                                jQuery.each(wallet.inscriptions, function(ois)
                                {
                                    var s = wallet.inscriptions[ois];
                                    contents+= '<hr>';
                                    contents+= '<small>Inscription ID: <pre>' + s.id + '</pre>';
                                    if(typeof s.media_type != 'undefined' && s.media_type.indexOf('image') === 0)
                                    {
                                        contents+ '<br />';
                                        contents+= '<img src="' + s.media_content + '" class="img img-thumbnail img-responsive img-block" crossorigin="anonymous" />';
                                    }
                                    else if(typeof s.media_type != 'undefined' && s.media_type.indexOf('audio') === 0)
                                    {
                                        contents+ '<br />';
                                        contents+= '<audio src="' + s.media_content + '" class="img img-thumbnail img-responsive img-block" crossorigin="anonymous" />';
                                    }
                                    else if(typeof s.media_type != 'undefined' && s.media_type.indexOf('video') === 0)
                                    {
                                        contents+ '<br />';
                                        contents+= '<video src="' + s.media_content + '" class="img img-thumbnail img-responsive img-block" crossorigin="anonymous" />';
                                    }
                                    else if
                                    (
                                        typeof s.media_type != 'undefined' 
                                        && 
                                        (
                                            s.media_type.indexOf('text') === 0
                                            || s.media_type.indexOf('json') > -1
                                        )
                                    )
                                    {
                                        var text = 'N/A';
                                        
                                        contents+ '<br />';
                                        contents+= '<textarea class="form-control">'+text+'</textarea>';
                                    }
                                })
                            }
                            contents+= '</alert>';
                            contents+= '</div>';
                            
                            batter.modal('Results', contents);
                        }
                        else
                        {
                            batter.modal('Warning', 'No valid unspents found');
                        }
                    })
                }
            });
            jQuery('body').on('submit', 'form.sado-orders-form', function(e)
            {
                e.preventDefault();
                var form =jQuery(this);
                var cid = jQuery(form).find('.sado-input-cid').val();
                var network = jQuery(form).find('.sado-input-network').val();
                if(cid && network)
                {
                    batter.loader(true, "FECTHING");
                    var lookup = 
                    {
                        cid: cid,
                        network: network
                    };
                    sado.sdk.lookup.order(lookup, function(results)
                    {
                        if(typeof results == 'object')
                        {
                            var contents = '<alert class="alert alert-block alert-info">';
                                contents+= '<small style="text-transform:uppercase;">';
                                contents+= results.type + ' ORDER</small>';
                            contents+= '</alert>';
                            contents+= '<alert class="alert alert-block">';
                                contents+= '<pre><small>Location <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + results.location + '"><small>COPY</small></a><br /><code>' + results.location + '</code><br /><br />';
                                if(typeof results.satoshi != 'undefined')
                                {
                                    contents+= 'Satoshi <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + results.satoshi + '"><small>COPY</small></a><br /><code>' + results.satoshi + '</code>';
                                }
                                else
                                {
                                    contents+= 'Cardinals <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-ordit-copy" data-content="' + results.satoshis + '"><small>COPY</small></a><br /><code>' + results.satoshis + '</code>';
                                }
                                contents+= '<br /><br />Maker <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + results.maker + '"><small>COPY</small></a><br /><code>' + results.maker + '</code><br /><br />Signature <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + results.signature + '"><small>COPY</small></a><br /><code>' + results.signature + '</code>';
                                if(typeof results.desc != 'undefined')
                                {
                                    contents+= '<br /><br />Descriptor <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + results.desc + '"><small>COPY</small></a><br /><code>' + results.desc + '</code>';
                                }
                                if(typeof results.expiry != 'undefined')
                                {
                                    contents+= '<br /><br />Expiry Block <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + results.expiry + '"><small>COPY</small></a><br /><code>' + results.expiry + '</code>';
                                }
                                contents+= '</small></pre>';
                            contents+= '</alert>';
                            contents+= '<alert class="alert alert-block alert-danger">';
                                contents+= '<small style="text-transform:uppercase;">ONLY SCHEMA HAS BEEN VERIFIED<hr><strong>HAS NOT BEEN AUTHENTICATED ON-CHAIN</strong></small>';
                            contents+= '</alert>';
                            batter.modal('Results', contents);
                        }
                        else
                        {
                            batter.modal('Warning', 'Invalid JSON for SADO order!');
                        }
                    });
                }
            });
            jQuery('body').on('submit', 'form.sado-offers-form', function(e)
            {
                e.preventDefault();
                var form =jQuery(this);
                var cid = jQuery(form).find('.sado-input-cid').val();
                var network = jQuery(form).find('.sado-input-network').val();
                
                var this_callback = function(res)
                {
                    var wording = 'OFFER TO BUY';
                    if(res.order.type == 'buy')
                    {
                        wording = 'OFFER TO SELL';
                    }
                    var contents = '<alert class="alert alert-block alert-info">';
                        contents+= '<small style="text-transform:uppercase;">' + wording + '</small>';
                    contents+= '</alert>';
                    contents+= '<alert class="alert alert-block">';
                        contents+= '<pre><small>Order <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + res.origin + '"><small>COPY</small></a><br /><code>' + res.origin + '</code><br /><br />';
                        contents+= '<br /><br />Offer <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + res.offer + '"><small>COPY</small></a><br /><code>' + res.offer + '</code><br /><br />Taker <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + res.taker + '"><small>COPY</small></a><br /><code>' + res.taker + '</code><br /><br />Signature <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + res.signature + '"><small>COPY</small></a><br /><code>' + res.signature + '</code>';
                        if(typeof res.desc != 'undefined')
                        {
                            contents+= '<br /><br />Descriptor <a href="#" class="btn btn-sm btn-xs btn-outline-light btn-batter-copy" data-content="' + results.desc + '"><small>COPY</small></a><br /><code>' + res.desc + '</code>';
                        }
                        contents+= '</small></pre>';
                    contents+= '</alert>';
                    contents+= '<alert class="alert alert-block alert-danger">';
                        contents+= '<small style="text-transform:uppercase;">ONLY SCHEMA HAS BEEN VERIFIED<hr><strong>HAS NOT BEEN AUTHENTICATED ON-CHAIN</strong></small>';
                    contents+= '</alert>';
                    batter.modal('Results', contents);
                }
                
                if(cid && network)
                {
                    batter.loader(true, "FECTHING");
                    var lookup = 
                    {
                        cid: cid,
                        network: network
                    };
                    sado.sdk.lookup.offer(lookup, function(results)
                    {
                        if(typeof results == 'object')
                        {
                            this_callback(results);
                        }
                        else
                        {
                            batter.modal('Warning', 'Invalid offer CID');
                        }
                    });
                }
            });
        }
    },
    init: function()
    {
        sado.html.forms();
    }
}

