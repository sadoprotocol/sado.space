## Introducing SADO
#### Self-Authenticating Decentralized Ordinalbook
----------------------------------------------------

##### Abstract

Ordinals as a mathematical concept for notation are not new. However, using them to identify and track individual satoshis for the transportation of digital artifacts on the Bitcoin blockchain is a relatively new craze. At present, the majority of trade is tracked in a Google spreadsheet. Despite the trustless nature of blockchain technology, the seamless trading of Ordinals between two unknown entities without the involvement of third-party arbitration and/or services has proven to be elusive.

By utilizing a content-addressable decentralized data storage method, it is possible to broadcast and fulfill self-authenticating orders to buy or sell Ordinals at specific prices. This can be done without needing to involve any third-parties for anything other than relaying signed transactions.


--------------------

##### Specifications

The objective of these specifications is to provide a flexible protocol that can enable multiple use-cases as efficiently as possible whilst removing the need for centralized third-parties and also providing enough core functionality to allow for more easily added future improvements.

The initial protocol will focus on four generic use cases:

* [Making Sell Orders](#making-sell-orders)
* [Making Buy Orders](#making-buy-orders)
* [Taking Sell Orders](#taking-sell-orders)
* [Taking Buy Orders](#taking-buy-orders)

The SADO SDK currently provides access to the following functions:

* [sado.sdk.lookup.address](#sadosdklookupaddress--options-callback-)
* [sado.sdk.lookup.order](#sadosdklookuporder--options-callback-)
* [sado.sdk.lookup.offer](#sadosdklookupoffer--options-callback-)
* [sado.sdk.lookup.orderbook](#sadosdklookuporderbook--options-callback-)

------------------------

##### Making Sell Orders

Required JSON In order to make a sell order:

* type = sell
* ts = timestamp to act as nonce
* location = the location of ordinal being sold (txid:vout format)
* cardinals = the integer number of lowest denomination required to purchase the ordinal
* maker = the address of the maker correlating to key used in signature

Optional JSON parameters for making sell orders:

* expiry = the block height at which the offer should no longer be valid
* satoshi = can be used to replace cardinals to indicate specific ordinal location required
* meta = JSON string containing additional meta pertaining to ordinal

Messages must then be signed and signature added to JSON as follows:

* signature = the signature of signing the JSON string with the sellers private key
* desc = additional field required for bech32 signature standard

An example SELL order can be seen below:

```
{
    type: "sell",
    ts: 1679737275283,
    location: "85a65e72fa42ef6937e1edcda2d4f28dacff1141a803416caae36c584ed4cc5f:0",
    cardinals: 1000001,
    maker: "bcrt1p4stjdtqpf8tx5zfhl3aerl7csvzxz8g6hqj0s3ywldtrdagnpcsqzmmjfw",
    signature: "H6Sw5AgnN7i/3R0JlTZ6jo2h8CGzgot/++rMwZeK4xmYGy+V/w82NHG4MKZe4MRxQVrdf++RteInvAQ9u1KGteY=",
    desc: "tr([f73a2091/86'/1'/0']tpubDCSmR8wkbXm1XLqJ3mtgoTCb7kGYWEj2Mz89XM4Qxo6aKTUpEZqE9RCJnJfTGRVVsarssCBocvRmY7opp9V9ayqoLcFb9k1ggt6xFk4tpSG/1/*)#u7lw3a02",
    "meta": "{name: \"My Ordinal\", url: \"http://myurl.com\"}"
}
```

Messages are then added to IPFS in order to generate a CID, which is then added within the OP_RETURN of a transaction with outputs to the ordinal owner and any collation addresses used to publicly publish or moderate orderbooks.

The OP_RETURN must follow the following format:

```
sado=order:<CID_FROM_IPFS_ORDER>
```

-----------------------
##### Making Buy Orders

Required JSON In order to make a sell order:

* type = buy
* ts = timestamp to act as nonce
* location = the location of ordinal seeking to buy (txid:vout format)
* cardinals = the integer number of lowest denomination offered to purchase the ordinal
* maker = the address of the maker correlating to key used in signature

Optional JSON parameters for making sell orders:

* expiry = the block height at which the offer should no longer be valid
* satoshi = can be used to replace cardinals to indicate specific ordinal location offered
* meta = JSON string containing additional meta pertaining to buyer

Messages must then be signed and signature added to JSON as follows:

* signature = the signature of signing the JSON string with the buyers private key
* desc = additional field required for bech32 signature standard

An example BUY order can be seen below:

```
{
    type: "buy",
    ts: 1679737275283,
    location: "85a65e72fa42ef6937e1edcda2d4f28dacff1141a803416caae36c584ed4cc5f:0",
    cardinals: 1000001,
    maker: "mkaU8N6B9A4SPEXobjPmodpkqLuurSsEvY",
    signature: "HyqXSeUWlwnGJryOZCKH0Zm5aS1xSlQ2j+yZ6JqR98/jbmqsKSYHQ9A0zaIuiREbIL06haZPdTdIQXbRXksxg6g="
}
```

Messages are then added to IPFS in order to generate a CID, which is then added within the OP_RETURN of a transaction with outputs to the ordinal owner and any collation addresses used to publicly publish or moderate orderbooks.

The OP_RETURN must follow the following format:

```
sado=order:<CID_FROM_IPFS_ORDER>
```

------------------------
##### Taking Sell Orders

In order to BUY an ordinal, the taker must:

* Construct a partially signed bitcoin transaction (PSBT) as specified by order
* Sign the PSBT and construct an offer object 
* Add the offer object to IPFS in order to obtain an offer CID 
* Relay the offer CID to the order maker

The offer should be constructed as follows:

* ts = timestamp to act as nonce
* origin = CID of original order
* offer = signed PSBT
* taker = the address of the taker correlating to key used in signature

Messages must then be signed and signature added to JSON as follows:

* signature = the signature of signing the JSON string with the takers private key
* desc = additional field required for bech32 signature standard

An example offer can be seen below:

```
{
  "ts": 1680523358381,
  "origin": "QmTFhPVSexToGQKP3Do8ur8UTLZ9LizZY65Mr4o1da4sv8",
  "offer": "02000000029a238a7e5cb960cc2f434e731f18c5037d0f9f8951500cde14c84f9e255e95b50000000000fdffffff2de87813640b3ad928a1d9e20a46e3d5adf79ce8ef109d87707164e7b2bbeaf0000000006a47304402207f4ecfb453df1a1e40035553f64cdebbfb97b69db6da6e9a6493544851cd12140220288342186b7ca64d0942f9a0972cc1f1b97746e03c234244492554edea55b2e3012103601d238f9c0d8b908fd7b0829761dda2368425898861e4b8dbc42cd1be64508ffdffffff0200b70700000000001976a914fa9f81c4ea48dd77f4360f0602bdd7c5dc7a757f88aca025260000000000225120790a5bde0e6f5b9d5171b851914b1f856802cc1ceff4f4883d525857e0dad75b00000000",
  "taker": "n4N8JkE71jxqZcyVVaNJHWppr9Nb4n6eGh",
  "signature": "HyqXSeUWlwnGJryOZCKH0Zm5aS1xSlQ2j+yZ6JqR98/jbmqsKSYHQ9A0zaIuiREbIL06haZPdTdIQXbRXksxg6g=",
}
```

Offers are then added to IPFS in order to generate a CID, which is then added within the OP_RETURN of a transaction with outputs to the maker and any collation addresses used to publicly publish or moderate ordinalbooks.

The OP_RETURN must follow the following format:

```
sado=offer:<CID_FROM_IPFS_ORDER>
```

In order to accept the BUY offer, the maker must:

* Decrypt, authenticate, sign and relay PSBT

-----------------------
##### Taking Buy Orders

In order to SELL an ordinal, the taker must:

* Construct a partially signed bitcoin transaction (PSBT) as specified by order
* Sign the PSBT and construct an offer object 
* Add the offer object to IPFS in order to obtain an offer CID 
* Relay the offer CID to the order maker

The offer should be constructed as follows:

* ts = timestamp to act as nonce
* origin = CID of original order
* offer = signed PSBT
* taker = the address of the taker correlating to key used in signature

Messages must then be signed and signature added to JSON as follows:

* signature = the signature of signing the JSON string with the takers private key
* desc = additional field required for bech32 signature standard

An example order can be seen below:

```
{
  "ts": 1680523358381,
  "origin": "QmTFhPVSexToGQKP3Do8ur8UTLZ9LizZY65Mr4o1da4sv8",
  "offer": "02000000029a238a7e5cb960cc2f434e731f18c5037d0f9f8951500cde14c84f9e255e95b50000000000fdffffff2de87813640b3ad928a1d9e20a46e3d5adf79ce8ef109d87707164e7b2bbeaf0000000006a47304402207f4ecfb453df1a1e40035553f64cdebbfb97b69db6da6e9a6493544851cd12140220288342186b7ca64d0942f9a0972cc1f1b97746e03c234244492554edea55b2e3012103601d238f9c0d8b908fd7b0829761dda2368425898861e4b8dbc42cd1be64508ffdffffff0200b70700000000001976a914fa9f81c4ea48dd77f4360f0602bdd7c5dc7a757f88aca025260000000000225120790a5bde0e6f5b9d5171b851914b1f856802cc1ceff4f4883d525857e0dad75b00000000",
  "taker": "n4N8JkE71jxqZcyVVaNJHWppr9Nb4n6eGh",
  "signature": "HyqXSeUWlwnGJryOZCKH0Zm5aS1xSlQ2j+yZ6JqR98/jbmqsKSYHQ9A0zaIuiREbIL06haZPdTdIQXbRXksxg6g=",
}
```

Offers are then added to IPFS in order to generate a CID, which is then added within the OP_RETURN of a transaction with outputs to the maker and any collation addresses used to publicly publish or moderate ordinalbooks.

The OP_RETURN must follow the following format:

```
sado=offer:<CID_FROM_IPFS_ORDER>
```

In order to accept the SELL offer, the maker must:

* Decrypt, authenticate, sign and relay PSBT

-------------------------------------------------------

##### sado.sdk.lookup.address ( `options`, `callback` )

This function checks the __unspents__ of an address for both ordinals and inscriptions.

All options are required and can be used as follows:

```
var options = 
{
    address: 'bcrt1p0y99hhswdade65t3hpgezjcls45q9nqual60fzpa2fv90cx66adse4ckla',
    network: 'regtest'
};
sado.sdk.lookup.address(options, function(r){ console.log(r); });
```

This should result in an output similar to the following:

```
{
  "counts": {
    "satoshis": 207400,
    "cardinals": 197400,
    "ordinals": 4,
    "inscriptions": 1
  },
  "ordinals": [
    {
      "number": 4670067995975,
      "decimal": "934.67995975",
      "degree": "0°934′934″67995975‴",
      "name": "nuwtwtzaoak",
      "height": 934,
      "cycle": 0,
      "epoch": 0,
      "period": 0,
      "offset": 67995975,
      "rarity": "common",
      "output": "b5955e259e4fc814de0c5051899f0f7d03c5181f734e432fcc60b95c7e8a239a:0",
      "start": 4670067995975,
      "size": 10000,
      "inscriptions": [
        {
          "id": "b5955e259e4fc814de0c5051899f0f7d03c5181f734e432fcc60b95c7e8a239ai0",
          "fee": 676,
          "height": 3113,
          "number": 8,
          "sat": 4670067995975,
          "timestamp": 1679451601,
          "media_type": "image/jpeg",
          "media_size": 2155,
          "media_content": "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"
        }
      ]
    },
    {
      "number": 4625010091000,
      "decimal": "925.10091000",
      "degree": "0°925′925″10091000‴",
      "name": "nuwzmqheppp",
      "height": 925,
      "cycle": 0,
      "epoch": 0,
      "period": 0,
      "offset": 10091000,
      "rarity": "common",
      "output": "b36af150bd64015b30f57eda055212699266e134aa5c003b8b7658c13ccd168e:0",
      "start": 4625010091000,
      "size": 100000
    },
    {
      "number": 4835000101600,
      "decimal": "967.101600",
      "degree": "0°967′967″101600‴",
      "name": "nuvziwkhxgj",
      "height": 967,
      "cycle": 0,
      "epoch": 0,
      "period": 0,
      "offset": 101600,
      "rarity": "common",
      "output": "ab885d85ba59b2132c48fbb7f86ccba7991cd3f416df4cc0291f68f257ae21c7:2",
      "start": 4835000101600,
      "size": 96800
    },
    {
      "number": 4625016656720,
      "decimal": "925.16656720",
      "degree": "0°925′925″16656720‴",
      "name": "nuwzmpsvazx",
      "height": 925,
      "cycle": 0,
      "epoch": 0,
      "period": 0,
      "offset": 16656720,
      "rarity": "common",
      "output": "705a2bdf309eb83fa5cd7ba89c65aef0e308faf96d5026de878f5efcaabe8613:0",
      "start": 4625016656720,
      "size": 600
    }
  ],
  "inscriptions": [
    {
      "id": "b5955e259e4fc814de0c5051899f0f7d03c5181f734e432fcc60b95c7e8a239ai0",
      "fee": 676,
      "height": 3113,
      "number": 8,
      "sat": 4670067995975,
      "timestamp": 1679451601,
      "media_type": "image/jpeg",
      "media_size": 2155,
      "media_content": "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"
    }
  ]
}
```

-----------------------------------------------------

##### sado.sdk.lookup.order ( `options`, `callback` )

This function validates the JSON schema of IPFS based __orders__.

All options are required and can be used as follows:

```
var options = 
{
    cid: 'QmTFhPVSexToGQKP3Do8ur8UTLZ9LizZY65Mr4o1da4sv8'
};
sado.sdk.lookup.order(options, function(r){ console.log(r); });
```

This should result in an output similar to the following:

```
{
  "ts": 1680519015447,
  "type": "sell",
  "location": "b5955e259e4fc814de0c5051899f0f7d03c5181f734e432fcc60b95c7e8a239a:0",
  "maker": "bcrt1p0y99hhswdade65t3hpgezjcls45q9nqual60fzpa2fv90cx66adse4ckla",
  "satoshis": "2500000",
  "signature": "IE52V3Y0zFN0OAnKiSRM44ZFnc0OEdRCggwfusx1xY/8f46IOXIL1UnovZbE2enRboYsv3gxGUD2OW3PLxL9LVY=",
  "desc": "tr([f73a2091/86'/1'/0']tpubDCSmR8wkbXm1XLqJ3mtgoTCb7kGYWEj2Mz89XM4Qxo6aKTUpEZqE9RCJnJfTGRVVsarssCBocvRmY7opp9V9ayqoLcFb9k1ggt6xFk4tpSG/1/*)#u7lw3a02"
}
```

-----------------------------------------------------

##### sado.sdk.lookup.offer ( `options`, `callback` )

This function validates the JSON schema of IPFS based __offers__.

All options are required and can be used as follows:

```
var options = 
{
    cid: 'QmVTMepQNojNC82CQmSt8hGf9MRLG3L91QiUZMsENhaXyT'
};
sado.sdk.lookup.offer(options, function(r){ console.log(r); });
```

This should result in an output similar to the following:

```
{
  "ts": 1680523358381,
  "origin": "QmTFhPVSexToGQKP3Do8ur8UTLZ9LizZY65Mr4o1da4sv8",
  "offer": "02000000029a238a7e5cb960cc2f434e731f18c5037d0f9f8951500cde14c84f9e255e95b50000000000fdffffff2de87813640b3ad928a1d9e20a46e3d5adf79ce8ef109d87707164e7b2bbeaf0000000006a47304402207f4ecfb453df1a1e40035553f64cdebbfb97b69db6da6e9a6493544851cd12140220288342186b7ca64d0942f9a0972cc1f1b97746e03c234244492554edea55b2e3012103601d238f9c0d8b908fd7b0829761dda2368425898861e4b8dbc42cd1be64508ffdffffff0200b70700000000001976a914fa9f81c4ea48dd77f4360f0602bdd7c5dc7a757f88aca025260000000000225120790a5bde0e6f5b9d5171b851914b1f856802cc1ceff4f4883d525857e0dad75b00000000",
  "taker": "n4N8JkE71jxqZcyVVaNJHWppr9Nb4n6eGh",
  "signature": "HyqXSeUWlwnGJryOZCKH0Zm5aS1xSlQ2j+yZ6JqR98/jbmqsKSYHQ9A0zaIuiREbIL06haZPdTdIQXbRXksxg6g=",
  "order": {
    "ts": 1680519015447,
    "type": "sell",
    "location": "b5955e259e4fc814de0c5051899f0f7d03c5181f734e432fcc60b95c7e8a239a:0",
    "maker": "bcrt1p0y99hhswdade65t3hpgezjcls45q9nqual60fzpa2fv90cx66adse4ckla",
    "satoshis": "2500000",
    "signature": "IE52V3Y0zFN0OAnKiSRM44ZFnc0OEdRCggwfusx1xY/8f46IOXIL1UnovZbE2enRboYsv3gxGUD2OW3PLxL9LVY=",
    "desc": "tr([f73a2091/86'/1'/0']tpubDCSmR8wkbXm1XLqJ3mtgoTCb7kGYWEj2Mz89XM4Qxo6aKTUpEZqE9RCJnJfTGRVVsarssCBocvRmY7opp9V9ayqoLcFb9k1ggt6xFk4tpSG/1/*)#u7lw3a02"
  }
}
```

---------------------------------------------------------

##### sado.sdk.lookup.orderbook ( `options`, `callback` )

This function validates orders and offers for specific addresses using on-chain data.

All options are required and can be used as follows:

```
var options = 
{
    address: 'bcrt1q2ys7qws8g072dqe3psp92pqz93ac6wmztexkh5',
    network: 'regtest`
};
sado.sdk.lookup.orderbook(options, function(r){ console.log(r); });
```

This should result in an output similar to the following:

```
{
  "orders": [
    {
      "ts": 1680519015447,
      "type": "sell",
      "location": "b5955e259e4fc814de0c5051899f0f7d03c5181f734e432fcc60b95c7e8a239a:0",
      "maker": "bcrt1p0y99hhswdade65t3hpgezjcls45q9nqual60fzpa2fv90cx66adse4ckla",
      "satoshis": "2500000",
      "signature": "IE52V3Y0zFN0OAnKiSRM44ZFnc0OEdRCggwfusx1xY/8f46IOXIL1UnovZbE2enRboYsv3gxGUD2OW3PLxL9LVY=",
      "desc": "tr([f73a2091/86'/1'/0']tpubDCSmR8wkbXm1XLqJ3mtgoTCb7kGYWEj2Mz89XM4Qxo6aKTUpEZqE9RCJnJfTGRVVsarssCBocvRmY7opp9V9ayqoLcFb9k1ggt6xFk4tpSG/1/*)#u7lw3a02",
      "buy": false,
      "sell": true,
      "ago": "2 days ago",
      "cid": "QmTFhPVSexToGQKP3Do8ur8UTLZ9LizZY65Mr4o1da4sv8",
      "inscription": {
        "format": "image/jpeg",
        "data": "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",
        "owner": "bcrt1p0y99hhswdade65t3hpgezjcls45q9nqual60fzpa2fv90cx66adse4ckla",
        "location": "b5955e259e4fc814de0c5051899f0f7d03c5181f734e432fcc60b95c7e8a239a:0:0"
      }
    },
    {
      "ts": 1679737275283,
      "type": "sell",
      "location": "85a65e72fa42ef6937e1edcda2d4f28dacff1141a803416caae36c584ed4cc5f:0",
      "maker": "bcrt1p4stjdtqpf8tx5zfhl3aerl7csvzxz8g6hqj0s3ywldtrdagnpcsqzmmjfw",
      "satoshis": "1000001",
      "signature": "H6Sw5AgnN7i/3R0JlTZ6jo2h8CGzgot/++rMwZeK4xmYGy+V/w82NHG4MKZe4MRxQVrdf++RteInvAQ9u1KGteY=",
      "desc": "tr([f73a2091/86'/1'/0']tpubDCSmR8wkbXm1XLqJ3mtgoTCb7kGYWEj2Mz89XM4Qxo6aKTUpEZqE9RCJnJfTGRVVsarssCBocvRmY7opp9V9ayqoLcFb9k1ggt6xFk4tpSG/1/*)#u7lw3a02",
      "buy": false,
      "sell": true,
      "ago": "11 days ago",
      "cid": "Qmenhnz4CoKE8zyesdkPAaZLieJf583B5zsfaNhXJ7yBRy",
      "inscription": {
        "format": "image/png",
        "data": "iVBORw0KGgoAAAANSUhEUgAAAB0AAAAaCAYAAABLlle3AAABvElEQVRIS91Wy26DMBBcB0OkSvTQb8mp/Zwemv6/WjUY2I7XNphXZJxElZoDIqvd2ZnxEKLOb/UPE2nF1DDhKh/WRKpVxCiEGsqKD7iWKF9cH0rSg3midtJLXCpFPbPqhl7Flcx8vD5/hSKWlXYjADoL0DUlFVUzIeBqxrYtQIUUE4ipduhDDXjKNBXr0vR+aX1xS8iCWzQvYQQYSaFDcQHgPlYlapWIFlDvliWFGpmpg8AQe1csQK25ToA1QK0yAQ3K1gnIkZXhCCJ7N+yanaHYY89mpiAm4JVq6CxwbyYOKD5iaQ1Fo62d0VUB7wHCowNeleUbOeBDVIQMRIGxy2zvIkR2fqI0DpGLJh9gm9aV6QKA2HhsjgsFLoQQF6XYhQhZQWZiAufX+nstBJg+TB8j4f4Uh6oFARCKS3I/r8+/W3v9s7mYfVjhb5a+n154zaJHybRWX1W6dWZrhPb0LpbuGc51I+tM9xBb681amqtw+PG49yOT4kKS0hSgFPUBJ2npFmAumWFpLkCKwnnPptJ7kNjCuMneHJXyJtqb3msOpLqze2muunju/y5dvMQ/T+4l3uNvcOqZ3GrxL+6WJYmXNOiOAAAAAElFTkSuQmCC",
        "owner": "bcrt1p4stjdtqpf8tx5zfhl3aerl7csvzxz8g6hqj0s3ywldtrdagnpcsqzmmjfw",
        "location": "85a65e72fa42ef6937e1edcda2d4f28dacff1141a803416caae36c584ed4cc5f:0:0"
      }
    }
  ],
  "offers": [
    {
      "ts": 1680523358381,
      "origin": "QmTFhPVSexToGQKP3Do8ur8UTLZ9LizZY65Mr4o1da4sv8",
      "offer": "02000000029a238a7e5cb960cc2f434e731f18c5037d0f9f8951500cde14c84f9e255e95b50000000000fdffffff2de87813640b3ad928a1d9e20a46e3d5adf79ce8ef109d87707164e7b2bbeaf0000000006a47304402207f4ecfb453df1a1e40035553f64cdebbfb97b69db6da6e9a6493544851cd12140220288342186b7ca64d0942f9a0972cc1f1b97746e03c234244492554edea55b2e3012103601d238f9c0d8b908fd7b0829761dda2368425898861e4b8dbc42cd1be64508ffdffffff0200b70700000000001976a914fa9f81c4ea48dd77f4360f0602bdd7c5dc7a757f88aca025260000000000225120790a5bde0e6f5b9d5171b851914b1f856802cc1ceff4f4883d525857e0dad75b00000000",
      "taker": "n4N8JkE71jxqZcyVVaNJHWppr9Nb4n6eGh",
      "signature": "HyqXSeUWlwnGJryOZCKH0Zm5aS1xSlQ2j+yZ6JqR98/jbmqsKSYHQ9A0zaIuiREbIL06haZPdTdIQXbRXksxg6g=",
      "order": {
        "ts": 1680519015447,
        "type": "sell",
        "location": "b5955e259e4fc814de0c5051899f0f7d03c5181f734e432fcc60b95c7e8a239a:0",
        "maker": "bcrt1p0y99hhswdade65t3hpgezjcls45q9nqual60fzpa2fv90cx66adse4ckla",
        "satoshis": "2500000",
        "signature": "IE52V3Y0zFN0OAnKiSRM44ZFnc0OEdRCggwfusx1xY/8f46IOXIL1UnovZbE2enRboYsv3gxGUD2OW3PLxL9LVY=",
        "desc": "tr([f73a2091/86'/1'/0']tpubDCSmR8wkbXm1XLqJ3mtgoTCb7kGYWEj2Mz89XM4Qxo6aKTUpEZqE9RCJnJfTGRVVsarssCBocvRmY7opp9V9ayqoLcFb9k1ggt6xFk4tpSG/1/*)#u7lw3a02"
      },
      "buy": false,
      "sell": true,
      "ago": "2 days ago",
      "cid": "QmVTMepQNojNC82CQmSt8hGf9MRLG3L91QiUZMsENhaXyT",
      "inscription": {
        "format": "image/jpeg",
        "data": "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",
        "owner": "bcrt1p0y99hhswdade65t3hpgezjcls45q9nqual60fzpa2fv90cx66adse4ckla",
        "location": "b5955e259e4fc814de0c5051899f0f7d03c5181f734e432fcc60b95c7e8a239a:0:0"
      }
    },
    {
      "ts": 1679895642988,
      "origin": "Qmenhnz4CoKE8zyesdkPAaZLieJf583B5zsfaNhXJ7yBRy",
      "offer": "02000000035fccd44e586ce3aa6c4103a84111ffac8df2d4a2cdede13769ef42fa725ea6850000000000fdffffffdcae5c7f6d3b9405381f6124f965e67f284d59540dd751869f470eaff3c6a8fd000000006a473044022014c7e758e2d389c2c91f216c53239b75625d784a7991a6d7d28575877e60f15a022066471edb18bfcc2e3698122c2eb603a73a780e45863a21f6c31df50e08258c100121030f174214806f267cd950f8db14c0a1598983476bfb03c2268a8763f73d7d1fe5fdffffffad90fe5f8ffdc0fec6fda1427b9d24bf8967cf3a8b56a91fe3551644e6674430000000006a473044022051f30fa001a3d49e7e9adb0dbf571f035cedba68a2ee024adaf56bc82accf9b7022003546c10eca31edf93014f7a40f0f8131c86f13f389e01462c286635b1db2b650121030f174214806f267cd950f8db14c0a1598983476bfb03c2268a8763f73d7d1fe5fdffffff02f7af0700000000001976a9143782c7b3c41a6beef3af89e3debcd363814724d388ac41420f0000000000225120ac1726ac0149d66a0937fc7b91ffd88304611d1ab824f8448efb5636f5130e2000000000",
      "taker": "mkaU8N6B9A4SPEXobjPmodpkqLuurSsEvY",
      "signature": "H3+4e4wctnDxmF6VX19tjN6sBI9vJ0apMRz05Eul5/ZRe4QCOU/QZflDaJ09VgZXyEbK5TYfK+a4flqH4PRxv+A=",
      "order": {
        "ts": 1679737275283,
        "type": "sell",
        "location": "85a65e72fa42ef6937e1edcda2d4f28dacff1141a803416caae36c584ed4cc5f:0",
        "maker": "bcrt1p4stjdtqpf8tx5zfhl3aerl7csvzxz8g6hqj0s3ywldtrdagnpcsqzmmjfw",
        "satoshis": "1000001",
        "signature": "H6Sw5AgnN7i/3R0JlTZ6jo2h8CGzgot/++rMwZeK4xmYGy+V/w82NHG4MKZe4MRxQVrdf++RteInvAQ9u1KGteY=",
        "desc": "tr([f73a2091/86'/1'/0']tpubDCSmR8wkbXm1XLqJ3mtgoTCb7kGYWEj2Mz89XM4Qxo6aKTUpEZqE9RCJnJfTGRVVsarssCBocvRmY7opp9V9ayqoLcFb9k1ggt6xFk4tpSG/1/*)#u7lw3a02"
      },
      "buy": false,
      "sell": true,
      "ago": "9 days ago",
      "cid": "QmX4GdmW6fWphdNnkapjcGfAgaXVFzhLmuei8VdcLu1s9Z",
      "inscription": {
        "format": "image/png",
        "data": "iVBORw0KGgoAAAANSUhEUgAAAB0AAAAaCAYAAABLlle3AAABvElEQVRIS91Wy26DMBBcB0OkSvTQb8mp/Zwemv6/WjUY2I7XNphXZJxElZoDIqvd2ZnxEKLOb/UPE2nF1DDhKh/WRKpVxCiEGsqKD7iWKF9cH0rSg3midtJLXCpFPbPqhl7Flcx8vD5/hSKWlXYjADoL0DUlFVUzIeBqxrYtQIUUE4ipduhDDXjKNBXr0vR+aX1xS8iCWzQvYQQYSaFDcQHgPlYlapWIFlDvliWFGpmpg8AQe1csQK25ToA1QK0yAQ3K1gnIkZXhCCJ7N+yanaHYY89mpiAm4JVq6CxwbyYOKD5iaQ1Fo62d0VUB7wHCowNeleUbOeBDVIQMRIGxy2zvIkR2fqI0DpGLJh9gm9aV6QKA2HhsjgsFLoQQF6XYhQhZQWZiAufX+nstBJg+TB8j4f4Uh6oFARCKS3I/r8+/W3v9s7mYfVjhb5a+n154zaJHybRWX1W6dWZrhPb0LpbuGc51I+tM9xBb681amqtw+PG49yOT4kKS0hSgFPUBJ2npFmAumWFpLkCKwnnPptJ7kNjCuMneHJXyJtqb3msOpLqze2muunju/y5dvMQ/T+4l3uNvcOqZ3GrxL+6WJYmXNOiOAAAAAElFTkSuQmCC",
        "owner": "bcrt1p4stjdtqpf8tx5zfhl3aerl7csvzxz8g6hqj0s3ywldtrdagnpcsqzmmjfw",
        "location": "85a65e72fa42ef6937e1edcda2d4f28dacff1141a803416caae36c584ed4cc5f:0:0"
      }
    }
  ]
}
```