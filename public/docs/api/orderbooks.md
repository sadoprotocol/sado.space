---
title: Orderbook
pageTitle: Sado SDK - Orderbooks
description: Available methods for interacting with Sado compliant API orderbook endpoints.
---

Orderbook endpoints provide a means of retrieving information about the current state of sado compliant collections, orders and offers residing under a bitcoin address.

---

## Analytics

Analytics provide provides analytics details for a given orderbook. You can interact with the Sado API directly using the **JSON-RPC 2.0** protocol and perform a post request to the `/rpc` endpoint.

```
POST /rpc
{
  "jsonrpc": "2.0",
  "method": "orderbook.getAnalytics",
  "params": {
    "network": "mainnet" | "testnet" | "regtest",
    "address": "address"
  },
  "id": 0
}
```

---

### Response

The following is the shape of the returned data represented in a TypeScript type.

```ts
type Analytics = {
  orders: {
    collections: {
      [name: string]: {
        floor: PriceList;
        total: PriceList;
      };
    };
    pending: AnalyticsItem;
    completed: AnalyticsItem;
    count: number;
    value: PriceList;
    total: PriceList;
  };
  offers: {
    pending: AnalyticsItem;
    completed: AnalyticsItem;
    count: number;
    value: PriceList;
    total: PriceList;
  };
  total: {
    value: PriceList;
    price: PriceList;
  };
};
```

#### AnalyticsItem

The analytics item holds information about orders/offers under one of two states `pending` and `completed`.

| Key   | Type      | Description                               |
| ----- | --------- | ----------------------------------------- |
| count | number    | Number of orders/offers                   |
| value | PriceList | Total orderbook fee value                 |
| total | PriceList | Total combined value of all orders/offers |

#### PriceList

The price list holds value information in Satoshis, BTC and DUSD.

| Key | Type   | Description |
| --- | ------ | ----------- |
| sat | number | Satoshis    |
| btc | number | BTC         |
| usd | number | BTC to DUSD |

---

## Get

Get provides a means of retrieving the current sado compliant collections, orders and offers residing under a bitcoin address. You can interact with the Sado API directly using the **JSON-RPC 2.0** protocol and perform a post request to the `/rpc` endpoint.

```
POST /rpc
{
  "jsonrpc": "2.0",
  "method": "orderbook.getOrderbook",
  "params": {
    "network": "mainnet" | "testnet" | "regtest",
    "address": "address"
  },
  "id": 0
}
```

---

### Response

The following is the shape of the returned data represented in a TypeScript type. See [analytics](#orderbook-analytics) for details on orderbook analytics type.

```ts
type Orderbook = {
  analytics: Analytics;
  pending: Listing;
  rejected: Listing;
  completed: Listing;
};

type Listing = {
  orders: Order[];
  offers: Offer[];
};

type Order = {
  cid: string;
  ts: number;
  type: "sell" | "buy";
  cardinals: number;
  location: string;
  maker: string;
  expiry?: number;
  satoshi?: number;
  meta?: Record;
  orderbooks?: string[];
  signature: string;
  signature_format?: string;
  desc?: string;
};
```
