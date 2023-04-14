var ordit_ordinals = 
{
    get: function(this_txid = false, callback = false)
    {
        var tx_count = 0;
        var tx_limit = 1;
        var ordinals = [];
        var final_callback = function(ords)
        {
            async function loop() 
            {
                for (var i = 0; i < ordinals.length; i++) 
                { 
                    await new Promise(next=> 
                    {
                        ordit.apis.ord(['list', ordinals[i].txid + ':' + ordinals[i].vout], function(sats)
                        {
                            if
                            (
                                typeof sats[ordinals[i].index] == 'object'
                                && typeof sats[ordinals[i].index].start != 'undefined'
                            ){
                                var ord_id = sats[ordinals[i].index].start;
                                ordinals[i].sat = sats[ordinals[i].index];
                                ordinals[i].oid = ord_id;
                                ordinals[i].location = ordinals[i].txid + ':' + ordinals[i].vout + ':' + ordinals[i].index;
                            }
                            next();
                        });
                    });
                }
            }
            loop().then(() => 
            {
                callback(ords);
            })
        }
        var decode_tx = function(txid, index1 = -1, index2 = -1)
        {
            ordit.apis.rpc(['getrawtransaction', [txid]], function(rawtx)
            {
                ordit.apis.rpc(['decoderawtransaction', [rawtx]], function(tx)
                {   
                    try
                    {
                    var asm = '';

                    try
                    {
                        jQuery.each(tx.vin[0].txinwitness, function(t)
                        {
                            asm+= tx.vin[0].txinwitness[t];
                        })
                    }
                    catch(err){}

                    asm = tx.vin[0].txinwitness[1];
                    
                    var owner = tx.vout[0].scriptPubKey.address;

                    if(asm)
                    {
                        ordit.apis.rpc(['decodescript', [asm]], function(utxo)
                        {
                            if(typeof utxo.asm != 'undefined')
                            {
                                var utxa = utxo.asm.split(' ');

                                var utxd = [];
                                var utxb = [];

                                jQuery.each(utxa, function(u)
                                {
                                    try
                                    {
                                        utxd.push(bitcoinjs.script.decompile(new bitcoinjs.Buffer(bitcoinjs.script.fromASM(utxa[u]).toString('hex'), 'hex')).toString());
                                        utxb.push(ordit.utils.hexToBase64(utxa[u]));
                                    }
                                    catch(err){}
                                });

                                var ordinal = 
                                {
                                    format: utxd[3],
                                    data: utxd[4],
                                    owner: owner,
                                    txid: txid
                                };

                                if(ordinal.format.indexOf('image') === 0)
                                {
                                    var media_hex = utxa[8];
                                    
                                    jQuery.each(utxa, function(utxai)
                                    {
                                        if(utxai > 8)
                                        {
                                            if(utxa[utxai] != 'OP_ENDIF')
                                            {
                                                media_hex+= utxa[utxai];
                                            }
                                        }
                                    })
                                    ordinal.data = ordit.utils.hexToBase64(media_hex);
                                    
                                    var temp_data = 'data:' + ordinal.format + ';base64, ' + ordinal.data;
                                    jQuery('body').prepend('<img id="temp_img" src="' + temp_data + '" />');
                                    jQuery("img#temp_img").one("load", function()
                                    {
                                        var meta = false;
                                        var d = steg.decode(this);
                                        try
                                        {
                                            meta = JSON.parse(d);
                                        }
                                        catch(e){}
                                        jQuery('body').find('#temp_img').remove();
                                        if(meta)
                                        {
                                            ordinal.meta = meta;
                                        }
                                        
                                        if(index1 >= 0 && index2 >= 0)
                                        {
                                            ordinal.vout = index1;
                                            ordinal.index = index2;
                                            
                                            ordinals.push(ordinal);
                                            tx_count++;
                                            if(typeof callback == 'function' && tx_count == tx_limit)
                                            {
                                                final_callback(ordinals);
                                            }
                                        }
                                        else
                                        {
                                            tx_count++;

                                            if(typeof callback == 'function' && tx_count == tx_limit)
                                            {
                                                final_callback(ordinals);
                                            }
                                        }
                                    });
                                }
                            }
                            else
                            {
                                tx_count++;
                                if(typeof callback == 'function' && tx_count == tx_limit)
                                {
                                    final_callback(ordinals);
                                }
                            }
                        });
                    }
                    else
                    {
                        tx_count++;
                        if(typeof callback == 'function' && tx_count == tx_limit)
                        {
                            final_callback(ordinals);
                        }
                    }
                    }
                    catch(derr)
                    {
                        tx_count++;
                        if(typeof callback == 'function' && tx_count == tx_limit)
                        {
                            final_callback(ordinals);
                        }
                    }
                });
            });
        }

        if(this_txid)
        {
            decode_tx(this_txid);
        }
        else
        {
            ordit.apis.ord(['wallet', 'inscriptions'], function(these_ordinals)
            {
                
                var ordinal = 
                {
                    format: utxd[3],
                    data: utxd[4],
                    owner: owner,
                    txid: txid
                };
                
                /*
                if(typeof these_ordinals == 'object' && these_ordinals.length > 0)
                {
                    tx_limit = these_ordinals.length;
                    jQuery.each(these_ordinals, function(oid)
                    {
                        var ord_index = JSON.parse(JSON.stringify(oid));
                        if
                        (
                            typeof these_ordinals[ord_index].inscription != 'undefined'
                            && typeof these_ordinals[ord_index].location != 'undefined'
                        )
                        {
                            var oid = these_ordinals[ord_index].inscription;
                            var locs = these_ordinals[ord_index].location.split(':');

                            var txid = locs[0];

                            decode_tx(txid, locs[1], locs[2]);
                        }
                    });
                }
                else
                {
                    callback(ordinals);
                }
                */
            });
        }
    },
    inscriptions: function(this_txid, callback, loop_this = true)
    {
        if(this_txid && typeof callback == 'function')
        {
            ordit.apis.rpc(['getrawtransaction', [this_txid]], function(this_rawtx)
            {
                ordit.apis.rpc(['decoderawtransaction', [this_rawtx]], function(this_tx)
                {
                    var this_asm = '';

                    try
                    {
                        jQuery.each(this_tx.vin[0].txinwitness, function(t)
                        {
                            asm+= this_tx.vin[0].txinwitness[t];
                        })
                    }
                    catch(err){}

                    if(typeof this_tx.vin == 'object')
                    {
                        var vin_count = 0;
                        var ordinal = false;
                        
                        jQuery.each(this_tx.vin, function(vin)
                        {
                            this_asm = false;
                            
                            try
                            {
                                //this_asm = this_tx.vin[vin].txinwitness[0];
                                this_asm = this_tx.vin[vin].txinwitness[1];
                            }catch(e){}

                            if(this_asm && typeof this_asm != 'undefined')
                            {
                                ordit.apis.rpc(['decodescript', [this_asm]], function(this_utxo)
                                {
                                    try
                                    {
                                        var utxa = this_utxo.asm.split(' ');

                                        var utxd = [];
                                        var utxb = [];
                                        var skip_this_one = false;

                                        jQuery.each(utxa, function(u)
                                        {
                                            try
                                            {
                                                utxd.push(bitcoinjs.script.decompile(new bitcoinjs.Buffer(bitcoinjs.script.fromASM(utxa[u]).toString('hex'), 'hex')).toString());
                                                utxb.push(ordit.utils.hexToBase64(utxa[u]));
                                            }
                                            catch(e){}
                                        });

                                        ordinal = 
                                        {
                                            format: utxd[3],
                                            data: utxd[4],
                                            txid: this_txid,
                                            location: this_txid + ':' + vin
                                        };

                                        if(ordinal.format.indexOf('image') === 0)
                                        {
                                            ordinal.data = ordit.utils.hexToBase64(utxa[8] + utxa[9]);
                                        }

                                        if
                                        (
                                            ordinal.format.indexOf('=') > 1
                                            || ordinal.format.indexOf('image') >= 0
                                        )
                                        {
                                            vin_count++;
                                            if(vin_count == this_tx.vin.length)
                                            {
                                                callback(ordinal);
                                            }
                                        }
                                        else
                                        {
                                            vin_count++;
                                            if(vin_count == this_tx.vin.length)
                                            {
                                                callback(false, this_tx.vin);
                                            }
                                        }
                                    }
                                    catch(err)
                                    {
                                        vin_count++;
                                        if(vin_count == this_tx.vin.length)
                                        {
                                            callback(false, this_tx.vin);
                                        }
                                    }
                                });
                            }
                            else
                            {
                                vin_count++;
                                if(vin_count == this_tx.vin.length)
                                {
                                    var ordinal = false;
                                    
                                    if(loop_this)
                                    {
                                        async function loop() 
                                        {
                                            for (var tv = 0; tv < this_tx.vin.length; tv++) 
                                            { 
                                                await new Promise(next=> 
                                                {
                                                    ordit.ordinals.loops.inscriptions(this_tx.vin[tv].txid, function(o)
                                                    {
                                                        if
                                                        (
                                                            o 
                                                            && typeof o.format != 'undefined' 
                                                            && typeof o.data != 'undefined'
                                                        ){
                                                            ordinal = 
                                                            {
                                                                //owner: owner,
                                                                txid: this_tx.txid,
                                                                location: this_tx.txid + ':' + tv,
                                                                format: o.format,
                                                                data: o.data
                                                            };
                                                            callback(ordinal);
                                                        }
                                                        else
                                                        {
                                                            next();
                                                        }
                                                    });
                                                })
                                            }
                                        }
                                        loop().then(() => 
                                        {
                                            callback(ordinal);
                                        })
                                    }
                                    else
                                    {
                                        callback(false);
                                    }
                                }
                            }
                        });
                    }
                    else
                    {
                        callback(false, false);
                    }
                });
            });
        }
    },
    loops:
    {
        inscriptions: function(loop_id, callback)
        {
            if(loop_id && typeof callback == 'function')
            {
                ordit_ordinals.inscriptions(loop_id, function(loop_res, ins)
                {
                    if(loop_res && typeof loop_res == 'object')
                    {
                        callback(loop_res);
                    }
                    else
                    {
                        jQuery.each(ins, function(i)
                        {
                            ordit_ordinals.loops.inscriptions(ins[i].txid, callback);
                        })
                    }
                });
            }
        }
    },
    owner: function(location, callback)
    {
        if(location && typeof callback == 'function')
        {
            var locs = location.split(':');
            var txid = locs[0];
            var vout = locs[1];
            ordit.apis.rpc(['getrawtransaction', [txid]], function(rawtx)
            {
                ordit.apis.rpc(['decoderawtransaction', [rawtx]], function(tx)
                {
                    if
                    (
                        typeof tx == 'object'
                        && typeof tx.vout == 'object'
                        && typeof tx.vout[vout] == 'object'
                        && typeof tx.vout[vout].scriptPubKey == 'object'
                        && typeof tx.vout[vout].scriptPubKey.address != 'undefined'
                    ){
                        callback(tx.vout[vout].scriptPubKey.address);
                    }
                    else
                    {
                        callback(false);
                    }
                });
            });
        }
    },
    scan: function(address, callback)
    {
        var collected_inscriptions = false;
        
        var got_unspents = function(unspents)
        {   
            var unspent_count = 0;

            // TODO - Needs an async loop?
            if(typeof unspents == 'object' && unspents.length > 0)
            {
                jQuery.each(unspents, function(u)
                {
                    ordit.ordinals.inscriptions(unspents[u].txid, function(inscription)
                    {
                        if
                        (
                            typeof inscription == 'object'
                            && typeof inscription.data != 'undefined'
                            && typeof inscription.format != 'undefined'
                        )
                        {
                            if(typeof collected_inscriptions != 'object')
                            {
                                collected_inscriptions = [];
                            }
                            collected_inscriptions.push(inscription);
                        }
                        unspent_count++;
                        if(unspent_count == unspents.length)
                        {
                            var edit_count = 0;
                            jQuery.each(collected_inscriptions, function(ci)
                            {
                                var locs = collected_inscriptions[ci].location.split(':');
                                var out = collected_inscriptions[ci].txid + ':' + locs[1];
                                ordit.apis.ord(['list', out], function(r)
                                {
                                    if(typeof r == 'object' && r.length > 0)
                                    {
                                        // TODO - How to fix assumption of ZERO ???
                                        collected_inscriptions[ci].sat = r[0];
                                    }
                                    edit_count++;
                                    if(edit_count == collected_inscriptions.length)
                                    {
                                        callback(collected_inscriptions);
                                    }
                                });
                            })
                        }
                    });
                });
            }
            else
            {
                callback(collected_inscriptions);
            }
        }
        ordit.apis.unspents(address, function(txs)
        {
            if
            (
                typeof txs == 'object'
                && txs.length > 0
            ){
                got_unspents(txs);
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
                                    tx_hash: r[rtx].txid
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
                                            tx_hash: r[rtx].txid
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
    },
    search: function(ord, callback)
    {
        if(ord && typeof callback == 'function')
        {
            ordit_apis.ord(['find', ord], function(results)
            {
                if(typeof results == 'object' && typeof results.satpoint != 'undefined')
                {
                    var location = results.satpoint;
                    var locs = location.split(':');
                    
                    var txid = locs[0];
                    var index1 = locs[1];search:
                    var index2 = locs[2];
                    
                    ordit_apis.rpc(['getrawtransaction', [txid]], function(rawtx)
                    {
                        ordit_apis.rpc(['decoderawtransaction', [rawtx]], function(tx)
                        {
                            var asm = '';

                            try
                            {
                                jQuery.each(tx.vin[0].txinwitness, function(t)
                                {
                                    asm+= tx.vin[0].txinwitness[t];
                                })
                            }
                            catch(err){}

                            asm = tx.vin[0].txinwitness[1];

                            var owner = tx.vout[0].scriptPubKey.address;

                            if(asm && typeof asm != 'undefined')
                            {
                                ordit_apis.rpc(['decodescript', [asm]], function(utxo)
                                {
                                    if(typeof utxo == 'object')
                                    {
                                        var utxa = utxo.asm.split(' ');

                                        var utxd = [];
                                        var utxb = [];

                                        jQuery.each(utxa, function(u)
                                        {
                                            try
                                            {
                                                utxd.push(bitcoinjs.script.decompile(new bitcoinjs.Buffer(bitcoinjs.script.fromASM(utxa[u]).toString('hex'), 'hex')).toString());
                                                utxb.push(ordit.utils.hexToBase64(utxa[u]));
                                            }
                                            catch(err){}
                                        });

                                        var ordinal = 
                                        {
                                            format: utxd[3],
                                            data: utxd[4],
                                            owner: owner,
                                            location: location,
                                            formats:
                                            {
                                                image: false,
                                                audio: false,
                                                video: false,
                                                text: false
                                            }
                                        };
                                        if(ordinal.format.indexOf('image') === 0)
                                        {
                                            ordinal.formats.image = true;
                                            var media_hex = utxa[8];
                                            jQuery.each(utxa, function(utxai)
                                            {
                                                if(utxai > 8)
                                                {
                                                    if(utxa[utxai] != 'OP_ENDIF')
                                                    {
                                                        media_hex+= utxa[utxai];
                                                    }
                                                }
                                            });
                                            ordinal.data = ordit_utils.hexToBase64(media_hex);
                                        }
                                        else if(ordinal.format.indexOf('audio') === 0)
                                        {
                                            ordinal.formats.audio = true;
                                        }
                                        else if(ordinal.format.indexOf('video') === 0)
                                        {
                                            ordinal.formats.video = true;
                                        }
                                        else if(ordinal.format.indexOf('text') === 0)
                                        {
                                            ordinal.formats.text = true;
                                        }

                                        callback(ordinal);
                                    }
                                    else
                                    {
                                        callback(false);
                                    }
                                });
                            }
                            else
                            {   
                                jQuery.each(tx.vin, function(tv)
                                {
                                    ordit_ordinals.loops.inscriptions(tx.vin[tv].txid, function(o)
                                    {
                                        if
                                        (
                                            o 
                                            && typeof o.format != 'undefined' 
                                            && typeof o.data != 'undefined'
                                        ){
                                            var ordinal = 
                                            {
                                                owner: owner,
                                                location: location,
                                                format: o.format,
                                                data: o.data
                                            };
                                            callback(ordinal);
                                        }
                                        else
                                        {
                                            callback(false);
                                        }
                                    })
                                })
                            }
                        });
                    });
                }
            })
        }
    }
}