## Introducing SADO
##### Self-Authenticating Decentralized Ordinalbook
----------------------------------------------------

And then?

The SADO JavaScript SDK provides wrapper functions for the following APIs:

* [Bitcoin RPC](#bitcoin-rpc) - uses SSH tunnels to communicating with a Bitcoin core node
* [IPFS](#ipfs) - used by SADO protocol for ordinal orderbooks

In order to access these API endpoints, you must first configure the SDK.

Configuration settings can be accessed in the `js/db.js` file:

```
var ordit_db = 
{
    apis:
    {
        rpc: 'http://localhost/ordit/api/', // currently requires PHP :-(
        ipfs: 'https://ipfs.infura.io:5001' // used by SADO for orderbook
    }
}
```
The `rpc` and endpoint require SSH tunnels to be setup and running in the background.

The sado SDK also features the following functions:

* [sado.order.make](#sadoordermake--options-callback-)
* [ordit.order.take](#sadoordertake--options-callback-)

More exposed functionality will be documented soon.

---------------
### Bitcoin RPC

Perform RPC requests with the Bitcoin server from the browser using SSH tunnels.

An example of how to use the `rpc` API function:

```
sado.apis.rpc(['getchaintips', []], function(r){console.log(r)});
```
This would `console.log` the following results:

```
[
  {
    "height": 2422751,
    "hash": "000000005242811d6e159e61dcae5e12be220835ec052487cf9905747fb4d394",
    "branchlen": 0,
    "status": "active"
  }
]
```

--------
### IPFS

In order for ORDIT to communicate using the SADO protocol, a connection to IPFS is required. 

Currently, this API is designed specifically to communicate with Infura using the following functions:

* [sado.apis.ipfs.add](#sadoapisipfsadd--data-callback-)
* [sado.apis.ipfs.get](#sadoapisipfsget--cid-callback-)

----------------------------------------------
### sado.apis.ipfs.add ( `data`, `callback` )

Upload files or data to IPFS.

In this example, we will generate a SADO order object as follows:

```
var data = new FormData();
data.append('file', JSON.stringify(
{
    ordinal: '<integer_notation_for_ordinal>',
    satoshis: '<number_of_satoshis_ordinal_being_sold_for>',
    maker: '<the_address_of_maker>',
    signature: '<signature_of_this_message_by_maker>'
}));

sado.apis.ipfs.add(data, function(res)
{
    var cid = false;
    if
    (
        typeof res == 'object'
        && typeof res.Hash != 'undefined'
    ){
        cid = res.Hash;
    }
});
```
The CID (content-indentifier) is used in order to `get` data from the IPFS network.

If being used for SADO orders, it is this CID that is added to the `OP_RETURN` within a transaction to the owner of the ordinal as follows:

```
sado=ipfs:<CID>
```

---------------------------------------------
### sado.apis.ipfs.get ( `cid`, `callback` )

Get objects from IPFS using content-indentifiers as follows:

```
sado.apis.ipfs.get(cid, function(response)
{
    var order = false;
    try
    {
        JSON.parse(response);
    }
    catch(err){}
});
```

---------------------------------------------
### sado.order.make ( `options`, `callback` )

This function is used to make orders using SADO as follows:

```
var options = 
{
    type: '<string_must_equal_either_buy_or_sell>',
    ordinal: '<integer_notation_of_ordinals_to_buy_or_sell>',
    satoshis: '<integer_value_of_satoshis_required_to_buy_ordinal>',
    satoshi: '<optional_integer_notation_of_ordinal_offered_in_exchange>',
    expiry: '<optional_expiry_date_of_offer>'
}
sado.order.make(options, function(txid)
{
    // either false or valid transaction ID containg maker link
});
```

---------------------------------------------
### sado.order.take ( `options`, `callback` )

This function is used to make orders using SADO as follows:

```
var options = 
{
    cid: '<location_of_order>'
}
sado.order.take(options, function(txid)
{
    // either false or valid transaction ID confirming order completion
});
```
