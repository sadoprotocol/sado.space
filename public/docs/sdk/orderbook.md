---
title: Orderbook
pageTitle: Sado SDK - Orderbooks
description: Service for interacting with Sado protocol compliant API.
---

Orderbook service provide a means of retrieving information about the current state of sado compliant collections, orders and offers residing under a bitcoin address.

If you are running in a `node` or `browser` environment you can use our JavaScript SDK to interact with the Sado API.

---

## Methods

List of methods currently available on the orderbook service.

---

### Get Orderbook Analytics

Analytics provide provides analytics details for a given orderbook.

{% preview tabs=["API","SDK","CLI"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "GetOrderbookAnalytics",
      "params": {
        "network": "regtest",
        "address": "bcrt1q2ys7qws8g072dqe3psp92pqz93ac6wmztexkh5"
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="network" type="string" required=true description="Which network to create the order on" %}
        {% preview-object-value name="mainnet" description="Transactions on a mainnet are recorded on the blockchain permanently and are visible to the public. Transactions are irreversible so take all possble precautions when relaying your transactions." /%}
        {% preview-object-value name="testnet" description="Transactions on testnet are used for testing and development purposes and are not recorded on the blockchain permanently." /%}
        {% preview-object-value name="regtest" description="Transactions on regtest are used for testing and development purposes and are hosted independently of the two other networks. Regtest can be customized to behave more favorably for these purposes and transactions are not recorded on the blockchain permanently." /%}
      {% /preview-object-item %}
      {% preview-object-item name="address" type="string" required=true description="Bitcoin address to retrieve Sado transaction analytics from." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="analytics" type="Analytics" type-link="#analytics-2" description="Analytics data for the orderbook." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```ts {% preview=true %}
    const analytics = await sado.orderbook.analytics(
      "bcrt1q2ys7qws8g072dqe3psp92pqz93ac6wmztexkh5"
    );
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Bitcoin address to retrieve Sado transaction analytics from." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="analytics" type="Analytics" type-link="#analytics-2" description="Analytics data for the orderbook." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```bash {% preview=true %}
    sado orderbook analytics <address>
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Bitcoin address to retrieve Sado transaction analytics from." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="analytics" type="Analytics" type-link="#analytics-2" description="Analytics data for the orderbook." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

### Get Orderbook

You can retrieve the entierty of a orderbook by using the `.get` method which provides a means of retrieving the current sado compliant collections, orders and offers residing under a bitcoin address as well as an analytics overview.

{% preview tabs=["API","SDK","CLI"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "GetOrderbook",
      "params": {
        "network": "regtest",
        "address": "bcrt1q2ys7qws8g072dqe3psp92pqz93ac6wmztexkh5"
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="network" type="string" required=true description="Which network to create the order on" %}
        {% preview-object-value name="mainnet" description="Transactions on a mainnet are recorded on the blockchain permanently and are visible to the public. Transactions are irreversible so take all possble precautions when relaying your transactions." /%}
        {% preview-object-value name="testnet" description="Transactions on testnet are used for testing and development purposes and are not recorded on the blockchain permanently." /%}
        {% preview-object-value name="regtest" description="Transactions on regtest are used for testing and development purposes and are hosted independently of the two other networks. Regtest can be customized to behave more favorably for these purposes and transactions are not recorded on the blockchain permanently." /%}
      {% /preview-object-item %}
      {% preview-object-item name="address" type="string" required=true description="Bitcoin address to retrieve Sado transactions from." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="orderbook" type="Orderbook" type-link="#orderbook" description="Orderbook is a collection of analytics, offers and orders in various states. See the linked Orderbook model for more details." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```ts {% preview=true %}
    const orderbook = await sado.orderbook.get(
      "bcrt1q2ys7qws8g072dqe3psp92pqz93ac6wmztexkh5"
    );
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Bitcoin address to retrieve Sado transactions from." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="orderbook" type="Orderbook" type-link="#orderbook" description="Orderbook is a collection of analytics, offers and orders in various states. See the linked Orderbook model for more details." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```bash {% preview=true %}
    $ sado orderbook get <address>
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Bitcoin address to retrieve Sado transactions from." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="orderbook" type="Orderbook" type-link="#orderbook" description="Orderbook is a collection of analytics, offers and orders in various states. See the linked Orderbook model for more details." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

### Get Orderbook Orders

Retrieve a list of orders for a given address. A filter object can also be provided to narrow down the search results returned by the API.

{% preview tabs=["API","SDK","CLI"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "GetOrderbookOrders",
      "params": {
        "network": "regtest",
        "address": "bcrt1q2ys7qws8g072dqe3psp92pqz93ac6wmztexkh5",
        "filter": {
          "status": "pending",
          "order": {
            "type": "sell"
          }
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address to retrieve orders for." /%}
      {% preview-object-item name="filter" type="object" description="Filter object to narrow down the search results." /%}
      {% preview-object-item name="filter.status" type="string" required=false description="Filter result based on the status of the order." %}
        {% preview-object-value name="pending" description="Orders which is still awaiting resolution through rejection or completion." /%}
        {% preview-object-value name="rejected" description="Oders which was rejected by the sado protocol." /%}
        {% preview-object-value name="completed" description="Orders which has been successfully completed." /%}
      {% /preview-object-item %}
      {% preview-object-item name="filter.order" type="object" required=false description="Filters specific to the order as listed on IPFS." /%}
      {% preview-object-item name="filter.order.type" type="string" required=false description="Filter by the order type." %}
        {% preview-object-value name="sell" description="Filter by orders in the sell category." /%}
        {% preview-object-value name="buy" description="Filter by orders in the buy category." /%}
      {% /preview-object-item %}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="orders" type="Order[]" type-link="#order" description="List of orders." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```ts {% preview=true %}
    const orders = await sado.orderbook.orders(
      "bcrt1q2ys7qws8g072dqe3psp92pqz93ac6wmztexkh5", 
      {
        status: "pending",
        order: {
          type: "sell"
        }
      }
    );
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address to retrieve orders for." /%}
      {% preview-object-item name="filter" type="object" description="Filter object to narrow down the search results." /%}
      {% preview-object-item name="filter.status" type="string" required=false description="Filter result based on the status of the order." %}
        {% preview-object-value name="pending" description="Orders which is still awaiting resolution through rejection or completion." /%}
        {% preview-object-value name="rejected" description="Oders which was rejected by the sado protocol." /%}
        {% preview-object-value name="completed" description="Orders which has been successfully completed." /%}
      {% /preview-object-item %}
      {% preview-object-item name="filter.order" type="object" required=false description="Filters specific to the order as listed on IPFS." /%}
      {% preview-object-item name="filter.order.type" type="string" required=false description="Filter by the order type." %}
        {% preview-object-value name="sell" description="Filter by orders in the sell category." /%}
        {% preview-object-value name="buy" description="Filter by orders in the buy category." /%}
      {% /preview-object-item %}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="orders" type="Order[]" type-link="#order" description="List of orders." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```bash {% preview=true %}
    $ sado orderbook orders <address>
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address to retrieve orders for." /%}
      {% preview-object-item name="--status" type="string" required=false description="Filter result based on the status of the order." %}
        {% preview-object-value name="pending" description="Orders which is still awaiting resolution through rejection or completion." /%}
        {% preview-object-value name="rejected" description="Oders which was rejected by the sado protocol." /%}
        {% preview-object-value name="completed" description="Orders which has been successfully completed." /%}
      {% /preview-object-item %}
      {% preview-object-item name="--type" type="string" required=false description="Filter by the order type." %}
        {% preview-object-value name="sell" description="Filter by orders in the sell category." /%}
        {% preview-object-value name="buy" description="Filter by orders in the buy category." /%}
      {% /preview-object-item %}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="orders" type="Order[]" type-link="#order" description="List of orders." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

### Get Orderbook Offers

Retrieve a list of offers for a given address. A filter object can also be provided to narrow down the search results returned by the API.

{% preview tabs=["API","SDK","CLI"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "GetOrderbookOffers",
      "params": {
        "network": "regtest",
        "address": "bcrt1q2ys7qws8g072dqe3psp92pqz93ac6wmztexkh5",
        "filter": {
          "status": "pending",
          "order": {
            "type": "sell"
          }
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address to retrieve offers for." /%}
      {% preview-object-item name="filter" type="object" description="Filter object to narrow down the search results." /%}
      {% preview-object-item name="filter.status" type="string" required=false description="Filter result based on the status of the offer." %}
        {% preview-object-value name="pending" description="Offers which is still awaiting resolution through rejection or completion." /%}
        {% preview-object-value name="rejected" description="Offers which was rejected by the sado protocol." /%}
        {% preview-object-value name="completed" description="Offers which has been successfully completed." /%}
      {% /preview-object-item %}
      {% preview-object-item name="filter.order" type="object" required=false description="Filters specific to the order as listed on IPFS." /%}
      {% preview-object-item name="filter.order.type" type="string" required=false description="Filter by the order type." %}
        {% preview-object-value name="sell" description="Filter by offers in the sell category." /%}
        {% preview-object-value name="buy" description="Filter by offers in the buy category." /%}
      {% /preview-object-item %}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="offers" type="Offer[]" type-link="#offer" description="List of offers." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```ts {% preview=true %}
    const offers = await sado.orderbook.offers(
      "bcrt1q2ys7qws8g072dqe3psp92pqz93ac6wmztexkh5", 
      {
        status: "pending",
        order: {
          type: "sell"
        }
      }
    );
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address to retrieve offers for." /%}
      {% preview-object-item name="filter" type="object" description="Filter object to narrow down the search results." /%}
      {% preview-object-item name="filter.status" type="string" required=false description="Filter result based on the status of the offer." %}
        {% preview-object-value name="pending" description="Offers which is still awaiting resolution through rejection or completion." /%}
        {% preview-object-value name="rejected" description="Offers which was rejected by the sado protocol." /%}
        {% preview-object-value name="completed" description="Offers which has been successfully completed." /%}
      {% /preview-object-item %}
      {% preview-object-item name="filter.order" type="object" required=false description="Filters specific to the order as listed on IPFS." /%}
      {% preview-object-item name="filter.order.type" type="string" required=false description="Filter by the order type." %}
        {% preview-object-value name="sell" description="Filter by offers in the sell category." /%}
        {% preview-object-value name="buy" description="Filter by offers in the buy category." /%}
      {% /preview-object-item %}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="offers" type="Offer[]" type-link="#offer" description="List of offers." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```bash {% preview=true %}
    $ sado orderbook offers <address>
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address to retrieve offers for." /%}
      {% preview-object-item name="--status" type="string" required=false description="Filter result based on the status of the offer." %}
        {% preview-object-value name="pending" description="Offers which is still awaiting resolution through rejection or completion." /%}
        {% preview-object-value name="rejected" description="Offers which was rejected by the sado protocol." /%}
        {% preview-object-value name="completed" description="Offers which has been successfully completed." /%}
      {% /preview-object-item %}
      {% preview-object-item name="--type" type="string" required=false description="Filter by the order type the offer is connected to." %}
        {% preview-object-value name="sell" description="Filter by offers in the sell category." /%}
        {% preview-object-value name="buy" description="Filter by offers in the buy category." /%}
      {% /preview-object-item %}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="offers" type="Offer[]" type-link="#offer" description="List of offers." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

## Models

List of models used by the Orderbook service.

---

### Orderbook

Orderbook model is a collection of analytics, pending, rejected and completed listings of orders and offers.

{% preview-model %}
  {% preview-object-item name="analytics" type="Analytics" type-link="#analytics" description="Complete analytics overview of the current orderbook state." /%}
  {% preview-object-item name="pending" type="object" description="Lists all orders and offers that is currently pending." /%}
  {% preview-object-item name="pending.orders" type="Order[]" type-link="#order" description="List of pending orders." /%}
  {% preview-object-item name="pending.offers" type="Offer[]" type-link="#offer" description="List of pending offers." /%}
  {% preview-object-item name="rejected" type="object" description="Lists all orders and offers that was rejected by the protocol." /%}
  {% preview-object-item name="rejected.orders" type="Order[]" type-link="#order" description="List of rejected orders." /%}
  {% preview-object-item name="rejected.offers" type="Offer[]" type-link="#offer" description="List of rejected offers." /%}
  {% preview-object-item name="completed" type="object" description="Lists all the orders and offers that has been successfully transacted." /%}
  {% preview-object-item name="completed.orders" type="Order[]" type-link="#order" description="List of completed orders." /%}
  {% preview-object-item name="completed.offers" type="Offer[]" type-link="#offer" description="List of completed offers." /%}
{% /preview-model %}

---

### Analytics

Analytics model consists of extracted metric values from collection, order and offer data.

{% preview-model %}
  {% preview-object-item name="orders" type="object" description="Analytics data for orders." /%}
  {% preview-object-item name="orders.count" type="number" description="Total count of orders." /%}

  {% preview-object-item name="orders.collections" type="object" description="Analytics data for orders grouped by collection." /%}
  {% preview-object-item name="orders.collections.[name]" type="string" description="Name of the collection" /%}
  {% preview-object-item name="orders.collections.[name].floor" type="PriceList" type-link="#pricelist" description="Floor price of all ordinals being sold in the collection." /%}
  {% preview-object-item name="orders.collections.[name].total" type="PriceList" type-link="#pricelist" description="Combined value of all ordinals being sold in the collection." /%}

  {% preview-object-item name="orders.pending" type="object" description="Analytics data for pending orders." /%}
  {% preview-object-item name="orders.pending.count" type="number" description="Total number of pending orders." /%}
  {% preview-object-item name="orders.pending.value" type="PriceList" type-link="#price-list" description="Total value of listing fees for all pending orders." /%}
  {% preview-object-item name="orders.pending.total" type="PriceList" type-link="#price-list" description="Total asking price of all pending orders." /%}

  {% preview-object-item name="orders.completed" type="object" description="Analytics data for completed orders." /%}
  {% preview-object-item name="orders.completed.count" type="number" description="Total number of completed orders." /%}
  {% preview-object-item name="orders.completed.value" type="PriceList" type-link="#price-list" description="Total value of listing fees for all completed orders." /%}
  {% preview-object-item name="orders.completed.total" type="PriceList" type-link="#price-list" description="Total asking price of all completed orders." /%}


  {% preview-object-item name="orders.value" type="PriceList" type-link="#pricelist" description="Total value of listing fees for all orders." /%}
  {% preview-object-item name="orders.total" type="PriceList" type-link="#pricelist" description="Total asking price of all orders." /%}

  {% preview-object-item name="offers" type="object" description="Analytics data for offers." /%}
  {% preview-object-item name="offers.count" type="number" description="Total count of offers." /%}

  {% preview-object-item name="offers.pending" type="AnalyticsItem" type-link="#analyticsitem" description="Analytics data for pending offers." /%}
  {% preview-object-item name="offers.pending.count" type="number" description="Total number of pending offers." /%}
  {% preview-object-item name="offers.pending.value" type="PriceList" type-link="#price-list" description="Total value of listing fees for all pending offers." /%}
  {% preview-object-item name="orders.pending.total" type="PriceList" type-link="#price-list" description="Total asking price of all pending orders." /%}

  {% preview-object-item name="offers.completed" type="AnalyticsItem" type-link="#analyticsitem" description="Analytics data for completed offers." /%}
  {% preview-object-item name="offers.completed.count" type="number" description="Total number of completed offers." /%}
  {% preview-object-item name="offers.completed.value" type="PriceList" type-link="#price-list" description="Total value of listing fees for all completed offers." /%}
  {% preview-object-item name="offers.completed.total" type="PriceList" type-link="#price-list" description="Total asking price of all completed offers." /%}

  {% preview-object-item name="offers.value" type="PriceList" type-link="#pricelist" description="Total value of listing fees for all offers." /%}
  {% preview-object-item name="offers.total" type="PriceList" type-link="#pricelist" description="Total offer price of all offers." /%}

  {% preview-object-item name="total" type="object" description="Analytics data for the total value and price of orders and offers." /%}
  {% preview-object-item name="total.value" type="PriceList" type-link="#pricelist" description="Total value of listing fees for all orders and offers." /%}
  {% preview-object-item name="total.price" type="PriceList" type-link="#pricelist" description="Total potential transaction value of all orders and offers." /%}
{% /preview-model %}

---

### Order

Order model consists of merged values between movement on the blockchain and the original Order JSON as it exists on IPFS.

{% preview-model %}
  {% preview-object-item name="cid" type="string" description="" /%}
  {% preview-object-item name="ts" type="number" description="" /%}
  {% preview-object-item name="type" type="string" description="" %}
    {% preview-object-value name="sell" description="Create a sell order in which buyers can make offers for a ordinal" /%}
    {% preview-object-value name="buy" description="Create a buy order in which you wish to purchase a ordinal" /%}
  {% /preview-object-item %}
  {% preview-object-item name="time" type="Time" type-link="#time" description="Timestamp information for when the order was created and added to the blockchain." /%}
  {% preview-object-item name="value" type="PriceList" type-link="#price-list" description="Total orderbook listing value derrived from fees and prioritized listing payments." /%}
  {% preview-object-item name="price" type="PriceList" type-link="#price-list" description="Lowest denomination required to purchase the ordinal represented in this order." /%}
  {% preview-object-item name="offers" type="object" description="Offer information pertaining to the specific order in question." /%}
  {% preview-object-item name="offers.count" type="number" description="Total number of offers that has been placed for the order." /%}
  {% preview-object-item name="offers.list" type="object[]" description="List of each offer that has been placed for the order." /%}
  {% preview-object-item name="offers.list.cid" type="string" description="IPFS content identifier containing the offer details." /%}
  {% preview-object-item name="offers.list.taker" type="string" description="Address which is placing the offer." /%}
  {% preview-object-item name="offers.taker" type="object" required=false description="Information about the offer which was accepted." /%}
  {% preview-object-item name="offers.taker.address" type="string" description="Address which received the order." /%}
  {% preview-object-item name="offers.taker.location" type="string" description="Transaction where the ordinal was transfered to the taker." /%}
  {% preview-object-item name="cardinals" type="number" description="Lowest denomination required to purchase the ordinal represented in this order." /%}
  {% preview-object-item name="location" type="string" description="Location of the output in which the ordinal being sold resides in the format txid:vout." /%}
  {% preview-object-item name="maker" type="string" description="Address of the creator of the order." /%}
  {% preview-object-item name="expiry" type="number" required=false description="At what block height the order should not longer be considered valid." /%}
  {% preview-object-item name="satoshi" type="number" required=false description="Used in trade order where we want to trade one ordinal for another." /%}
  {% preview-object-item name="meta" type="object" required=false description="Additional meta pertaining to ordinal being sold." /%}
  {% preview-object-item name="orderbooks" type="string[]" required=false description="List of orderbook addresses in which this order should be listed." /%}
  {% preview-object-item name="signature" type="string" description="Order signature used to validate the order when processed by the sado protocol." /%}
  {% preview-object-item name="signature_format" type="string" required=false description="Format of the signature used." /%}
  {% preview-object-item name="desc" type="string" required=false description="Required description used when signing with bech32 and bech32m addresses." /%}
{% /preview-model %}

---

### Offer

Offer model consists of merged values between movement on the blockchain and the original Offer JSON as it exists on IPFS.

{% preview-model %}
  {% preview-object-item name="cid" type="string" description="IPFS CID of the Offer." /%}
  {% preview-object-item name="ts" type="string" description="" /%}
  {% preview-object-item name="origin" type="string" description="CID of the Order in which the Offer is being made." /%}
  {% preview-object-item name="taker" type="string" description="Address of the creator of the Offer." /%}
  {% preview-object-item name="offer" type="string" description="PSBT which the Order creator needs to sign and relay to accept the Offer." /%}
  {% preview-object-item name="time" type="Time" type-link="#time" description="Timestamp information for when the offer was created and added to the blockchain." /%}
  {% preview-object-item name="fee" type="string" description="" /%}
  {% preview-object-item name="value" type="string" description="" /%}
  {% preview-object-item name="proof" type="string" required=false description="Transaction ID representing proof of transfer if the offer was accepted." /%}
{% /preview-model %}

---

### Time

Time model represents a entity timestamp in two categories, **nonce** and **block** time. The final time value is always a reference to when the entity reaches the blockchain and is what the **ago** value always refers to.

{% preview-model %}
  {% preview-object-item name="nonce" type="number" description="Timestamp for when the entity was created." /%}
  {% preview-object-item name="block" type="number" description="Timestamp for when the entity was added to a blockchain block." /%}
  {% preview-object-item name="ago" type="string" description="Human readable format of the block time. Eg. 1 day ago" /%}
{% /preview-model %}

---

### Price List

Price list model represents a price value in multiple denominations.

{% preview-model %}
  {% preview-object-item name="sat" type="number" description="Value in satoshis." /%}
  {% preview-object-item name="btc" type="number" description="Value in btc." /%}
  {% preview-object-item name="usd" type="string" description="Value in usd, currently retrieveing the usd value using dusd." /%}
{% /preview-model %}
