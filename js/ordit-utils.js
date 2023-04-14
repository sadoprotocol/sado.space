var ordit_utils = 
{
    hexToBase64: function(str) 
    {
        var bString = "";
        for(var i = 0; i < str.length; i +=2) 
        {
             bString += String.fromCharCode(parseInt(str.substr(i, 2), 16));
        }
        return btoa(bString);
    },
    sign: function(signer, msg, wallet, callback)
    {
        if(signer && msg && wallet && typeof callback == 'function')
        {
            ordit.apis.rpc(['getaddressinfo', [signer]], function(address_info)
            {
                if
                (
                    typeof address_info == 'object' 
                    && typeof address_info.hdmasterfingerprint != 'undefined'
                    && typeof address_info.iswitness != 'undefined'
                    && address_info.iswitness === true
                )
                {
                    var parent_desc = address_info.parent_desc;
                    var fp = address_info.hdmasterfingerprint;
                    ordit.apis.rpc(['listdescriptors', []], function(public_descriptors)
                    {
                        ordit.apis.rpc(['listdescriptors', [true]], function(descriptors)
                        {
                            if
                            (
                                typeof descriptors == 'object' 
                                && typeof descriptors.descriptors == 'object' 
                                && descriptors.descriptors.length > 0
                            ){
                                var pkey = false;
                                var descr = false;
                                jQuery.each(descriptors.descriptors, function(d)
                                {
                                    var desc = descriptors.descriptors[d].desc;
                                    var public_desc = public_descriptors.descriptors[d].desc;
                                    var bits = desc.split('/');
                                    var fp2 = bits[1] + '/' + bits[2] + '/' + bits[3] + '/' + bits[4];
                                    if(desc.indexOf(fp) > 0)
                                    {
                                        descr = public_desc;
                                        pkey = desc.split(']')[1].split('/')[0];
                                    }
                                    else if(desc.indexOf(fp2) > 0)
                                    {
                                        descr = public_desc;
                                        pkey = desc.split('(')[1].split('/')[0];
                                    }
                                });
                                if(pkey)
                                {
                                    var hd = bitcoin.HDNode.fromBase58(pkey);
                                    var wif = hd.privKey.toWIF(bitcoinjs.networks.regtest);
                                    var key = bitcoin.ECKey.fromWIF(wif, bitcoinjs.networks.regtest);
                                    var signature = bitcoin.Message.sign(key, msg, bitcoin.networks.testnet).toString('base64');
                                    callback(signature, descr);
                                }
                                else
                                {
                                    callback(false);
                                }
                            }
                            else
                            {
                                callback(false);
                            }
                        }, wallet);
                    }, wallet);
                }
                else
                {
                    ordit.apis.rpc(['walletpassphrase', ["bitcoin-testnet", 30]], function(passed)
                    {
                        ordit.apis.rpc(['signmessage', [signer, msg]], function(signature)
                        {
                            callback(signature);
                        }, wallet);
                    }, wallet);
                }
            }, wallet);
        }
    },
    verify: function(signer, msg, signature, wallet, callback)
    {
        if(signer && msg && signature && wallet && typeof callback == 'function')
        {
            ordit.apis.rpc(['getaddressinfo', [signer]], function(address_info)
            {
                if
                (
                    typeof address_info == 'object' 
                    && typeof address_info.hdmasterfingerprint != 'undefined'
                    && typeof address_info.iswitness != 'undefined'
                    && address_info.iswitness === true
                )
                {
                    var parent_desc = address_info.parent_desc;
                    var fp = address_info.hdmasterfingerprint;
                    ordit.apis.rpc(['listdescriptors', [true]], function(descriptors)
                    {
                        if
                        (
                            typeof descriptors == 'object' 
                            && typeof descriptors.descriptors == 'object' 
                            && descriptors.descriptors.length > 0
                        ){
                            var pkey = false;
                            var descr = false;
                            jQuery.each(descriptors.descriptors, function(d)
                            {
                                var desc = descriptors.descriptors[d].desc;
                                var bits = desc.split('/');
                                var fp2 = bits[1] + '/' + bits[2] + '/' + bits[3] + '/' + bits[4];
                                if(desc.indexOf(fp) > 0)
                                {
                                    descr = desc;
                                    pkey = desc.split(']')[1].split('/')[0];
                                }
                                else if(desc.indexOf(fp2) > 0)
                                {
                                    descr = desc;
                                    pkey = desc.split('(')[1].split('/')[0];
                                }
                            });
                            if(pkey)
                            {
                                var hd = bitcoin.HDNode.fromBase58(pkey);
                                var wif = hd.privKey.toWIF(bitcoinjs.networks.regtest);
                                var key = bitcoin.ECKey.fromWIF(wif, bitcoinjs.networks.regtest);
                                var address = key.pub.getAddress().toString();
                                var verified = bitcoin.Message.verify(address, signature, msg, bitcoin.networks.testnet);
                                callback(verified);
                            }
                            else
                            {
                                callback(false);
                            }
                        }
                        else
                        {
                            callback(false);
                        }
                    }, wallet);
                }
                else
                {
                    ordit.apis.rpc(['walletpassphrase', ["bitcoin-testnet", 30]], function(passed)
                    {
                        ordit.apis.rpc(['verifymessage', [signer, signature, msg]], function(verified)
                        {
                            callback(verified);
                        }, wallet);
                    }, wallet);
                }
            }, wallet);
        }
    }
}