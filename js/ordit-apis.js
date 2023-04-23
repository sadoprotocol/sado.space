var ordit_apis = 
{    
    batter: function(func, input, callback = false, network = ordit_db.defaults.network)
    {
        if(func && input && typeof callback == 'function')
        {
            var this_callback = function(res)
            {
                var results = false;
                if
                (
                    typeof res == 'object' 
                    && typeof res.rdata != 'undefined'
                    && typeof res.success != 'undefined'
                    && res.success === true
                ){
                    try
                    {
                        results = JSON.parse(res.rdata);
                    }
                    catch(err)
                    {
                        results = res.rdata;
                    }
                }
                else if(typeof res == 'object')
                {
                    results = res;
                }
                else if(res)
                {
                    results = res;
                }
                if(func == 'unspents')
                {
                    var txs = false;
                    if(typeof results == 'object' && results.length > 0)
                    {
                        txs = [];
                        jQuery.each(results, function(r)
                        {
                            txs.push({
                                txid: results[r].txid,
                                vout: results[r].n,
                                scriptPubKey: results[r].scriptPubKey,
                                amount: results[r].value,
                                ordinals: results[r].ordinals,
                                inscriptions: results[r].inscriptions
                            });
                        })
                    }
                    callback(txs);
                }
                else
                {
                    callback(results);
                }
            }
            
            try
            {
                var data = {};
                var key = 'address';
                var value = input;
                if(func == 'transaction')
                {
                    key = 'txid';
                }
                data[key] = value;
                data.ordinals = true;
                fetch
                (
                    ordit_db.networks[network].batter + func, 
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }
                )
                .then(response => response.json())
                .then(response => this_callback(response))
                .catch(response => callback(false))
            }
            catch(err)
            {
                callback(false);
            }
        }
    },
    blockcypher: function(func = '', params = false, method = 'GET', bc_callback = false)
    {
        if(typeof bc_callback == 'function')
        {
            if(params)
            {
                fetch
                (
                    ordit.db.apis.blockcypher + func + '?token=' + ordit.db.ids.blockcypher, 
                    {
                        method: method,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: params
                    }
                )
                .then(response => response.json())
                .then(response => bc_callback(response))
            }
            else
            {
                fetch
                (
                    ordit_db.apis.blockcypher + func + '?token=' + ordit_db.ids.blockcypher, 
                    {
                        method: method,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(response => response.json())
                .then(response => bc_callback(response))
            }
        }
    },
    ipfs: 
    {
        add: function(data, callback = false)
        {   
            if(typeof callback == 'function')
            {
                var headers = 
                {
                    'Authorization': 'Basic ' + btoa(ordit.db.ids.infura + ':' + ordit.db.keys.infura)
                }
                fetch
                (
                    ordit.db.apis.ipfs + '/api/v0/add', 
                    {
                        method: 'POST',
                        headers: headers,
                        body: data
                    }
                )
                .then(response => response.json())
                .then(response => callback(response))
            }
        },
        get: function(cid = false, callback = false)
        {
            if(cid && callback && typeof callback == 'function')
            {
                fetch
                (
                    ordit_db.ipfs.gateway + '/ipfs/' + cid, 
                    {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(response => response.json())
                .then(response => callback(response))
            }
        }
    },
    ord: function(params = [], callback = false)
    {
        if(typeof callback == 'function')
        {
            var this_callback = function(res)
            {
                var results = false;
                if
                (
                    typeof res == 'object' 
                    && typeof res.rdata != 'undefined'
                    && typeof res.success != 'undefined'
                    && res.success === true
                ){
                    try
                    {
                        results = JSON.parse(res.rdata);
                    }
                    catch(err)
                    {
                        results = res.rdata;
                    }
                }
                callback(results);
            }
            
            try
            {
                fetch
                (
                    ordit_db.apis.ord, 
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(params)
                    }
                )
                .then(response => response.json())
                .then(response => this_callback(response))
                .catch(response => this_callback(false))
            }
            catch(err)
            {
                callback(false);
            }
        }
    },
    owner: function(location, callback, wallet = false)
    {
        if(location && location.indexOf(':') > 0 && typeof callback == 'function')
        {
            var locs = location.split(':');
            var txid = locs[0];
            var vout = locs[1];
            ordit_apis.transaction(txid, function(res)
            {
                if
                (
                    typeof res == 'object' 
                    && typeof res.vout == 'object'
                    && typeof res.vout[vout] == 'object'
                    && typeof res.vout[vout].scriptPubKey == 'object'
                    && typeof res.vout[vout].scriptPubKey.address != 'undefined'
                ){
                    callback(res.vout[vout].scriptPubKey.address);
                }
                else
                {
                    callback(false);
                }
            }, wallet);
        }
    },
    rpc: function(params = [], callback = false)
    {
        if(typeof callback == 'function')
        {
            try
            {
                fetch
                (
                    ordit_db.apis.rpc, 
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(params)
                    }
                )
                .then(response => response.json())
                .then(response => callback(response))
                .catch(response => callback(false))
            }
            catch(err)
            {
                callback(false);
            }
        }
    },
    transaction: function(txid, callback, wallet = false)
    {
        if(txid && typeof callback == 'function')
        {
            ordit_apis.batter('transaction', txid, function(bt)
            {
                if(typeof bt == 'object')
                {
                    callback(bt);
                }
                else
                {
                    var this_wallet = 'ord';
                    var next_wallet = 'rpc';
                    if(wallet)
                    {
                        this_wallet = wallet;
                    }
                    ordit.apis.rpc(['getrawtransaction', [txid]], function(res)
                    {
                        if(res)
                        {
                            ordit.apis.rpc(['decoderawtransaction', [res]], function(results)
                            {
                                callback(results);
                            }, default_wallet);
                        }
                        else
                        {
                            if(!wallet)
                            {
                                ordit.apis.rpc(['getrawtransaction', [txid]], function(res)
                                {
                                    if(res)
                                    {
                                        ordit.apis.rpc(['decoderawtransaction', [res]], function(results)
                                        {
                                            callback(results);
                                        }, next_wallet);
                                    }
                                }, next_wallet);
                            }
                        }
                    }, this_wallet);
                }
            });
        }
    },
    unspents: function(address, callback)
    {
        if(address && typeof callback == 'function')
        {
            var got_unspents = function(unspents)
            {
                callback(unspents);
            }
            ordit.apis.blockcypher
            (
                'addrs/' + address + '?unspentOnly=1', 
                false, 
                'GET', 
                function(lookup)
                {
                    if
                    (
                        typeof lookup == 'object'
                        && typeof lookup.txrefs == 'object'
                        && lookup.txrefs.length > 0
                    ){
                        got_unspents(lookup.txrefs);
                    }
                    else
                    {
                        ordit.apis.batter('unspents', address, function(br)
                        {
                            if
                            (
                                typeof br == 'object'
                                && br.length > 0
                            ){
                                got_unspents(br);
                            }
                            else
                            {
                                ordit.apis.rpc(['listunspent', []], function(r)
                                {
                                    var txs = false;
                                    if(typeof r == 'object' && r.length > 0)
                                    {
                                        txs = [];
                                        jQuery.each(r, function(rtx)
                                        {
                                            if(r[rtx].address == address)
                                            {
                                                txs.push({
                                                    tx_hash: r[rtx].txid,
                                                    vout: r[rtx].vout
                                                })
                                            }
                                        });
                                    }

                                    if(txs.length < 1)
                                    {
                                        ordit.apis.rpc(['listunspent', []], function(r)
                                        {
                                            var txs = false;
                                            if(typeof r == 'object' && r.length > 0)
                                            {
                                                txs = [];
                                                jQuery.each(r, function(rtx)
                                                {
                                                    if(r[rtx].address == address)
                                                    {
                                                        txs.push({
                                                            tx_hash: r[rtx].txid,
                                                            vout: r[rtx].vout
                                                        })
                                                    }
                                                });
                                            }

                                            got_unspents(txs);

                                        });
                                    }
                                    else
                                    {
                                        got_unspents(txs);
                                    }

                                }, 'rpc');
                            }
                        });
                    }
                }
            );
        }
    },
    vout: function(location, callback, wallet = false)
    {
        if(location && location.indexOf(':') > 0 && typeof callback == 'function')
        {
            var locs = location.split(':');
            var txid = locs[0];
            var vout = locs[1];
            ordit.apis.transaction(txid, function(res)
            {
                if
                (
                    typeof res == 'object' 
                    && typeof res.vout == 'object'
                    && typeof res.vout[vout] == 'object'
                ){
                    callback(res.vout[vout]);
                }
                else
                {
                    callback(false);
                }
            }, wallet);
        }
    }
}