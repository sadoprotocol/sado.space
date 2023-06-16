---
title: Orderbook
pageTitle: Sado SDK - Orderbooks
description: Service for interacting with Sado protocol compliant API.
---

Orderbook service provide a means of retrieving information about the current state of sado compliant collections, orders and offers residing under a bitcoin address.

If you are running in a `node` or `browser` environment you can use our JavaScript SDK to interact with the Sado API.

---

## Analytics

Analytics provide provides analytics details for a given orderbook.

```ts
const analytics = await sado.orderbook.analytics("address");
```

Response:

```ts
type Analytics = {
  orders: {
    count: number;
    collections: {
      [name: string]: {
        floor: PriceList;
        total: PriceList;
      };
    };
    pending: AnalyticsItem;
    completed: AnalyticsItem;
    value: PriceList;
    total: PriceList;
  };
  offers: {
    count: number;
    pending: AnalyticsItem;
    completed: AnalyticsItem;
    value: PriceList;
    total: PriceList;
  };
  total: {
    value: PriceList;
    price: PriceList;
  };
};

type AnalyticsItem = {
  count: number;
  value: PriceList;
  total: PriceList;
};
```

- See [Price List](#price-list) for more details on PriceList type.

---

## Orderbook

You can retrieve the entierty of a orderbook by using the `.get` method which provides a means of retrieving the current sado compliant collections, orders and offers residing under a bitcoin address as well as an analytics overview.

```ts
const orderbook = await sado.orderbook.get("address");
```

Response:

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
```

- See [Analytics](#analytics) for more details on Analytics type.
- See [Order](#order) for more details on Order type.
- See [Offer](#offer) for more details on Offer type.

---

## Orders

Retrieve a list of orders for a given address. A filter object can also be provided to narrow down the search results returned by the API.

```ts
const orders = await sado.orderbook.orders("address", filter);
```

```ts
type Filter = {
  status?: "pending" | "rejected" | "completed";
  "order.type"?: "sell" | "buy";
};
```

Response:

```ts
type Orders = Order[];
```

- See [Order](#order) type for more details on order type.

---

## Offers

Retrieve a list of offers for a given address. A filter object can also be provided to narrow down the search results returned by the API.

```ts
const offers = await sado.orderbook.offers("address", filter);
```

```ts
type Filter = {
  status?: "pending" | "rejected" | "completed";
  "order.type"?: "sell" | "buy";
};
```

Response:

```ts
type Offers = Offer[];
```

- See [Offer](#offer) type for more details on offer type.

---

## Types

The following is a list of common types returned by orderbook service methods.

### Order

```ts
type Order = {
  cid: string;
  ts: number;
  type: "sell" | "buy";
  time: {
    block: number; // block time when the order was registered
    order: number; // unix timestamp when the order was created
    ago: string; // human readable time since the order was created
  };
  ago: string;
  value: PriceList; // total orderbook listing value
  price: PriceList; // asking price for the location
  offers: {
    count: number; // number of offers made on the order
    list: {
      cid: string; // ipfs cid of the offer
      taker: string; // creator address of the offer
    }[];
    taker?: {
      address: string; // address of the final taker
      location: string; // txid:vout proof of transfer
    };
  };
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

### Offer

```ts
type Offer = {
  cid: string; // ipfs cid of the offer
  ts: number;
  origin: string; // order cid in which the offer is for
  taker: string; // creator address of the offer
  offer: string; // PSBT which will complete the order
  time: {
    block: number; // block time when the order was registered
    order: number; // unix timestamp when the order was created
    ago: string; // human readable time since the order was created
  };
  ago: string;
  value: PriceList; // total orderbook listing value
  fee: PriceList;
  proof?: string; // txid proof of completion
};
```

### Price List

```ts
type PriceList = {
  sat: number;
  btc: number;
  usd: number;
};
```
