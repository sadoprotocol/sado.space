import type { IPFSOffer } from "./Entities/Offer";
import type { IPFSOrder } from "./Entities/Order";
import type { SADO } from "./SADO";

export class Lookup {
  constructor(readonly sado: SADO) {}

  get network() {
    return this.sado.network;
  }

  /**
   * Retrieve orderbook for given address.
   *
   * @param address - Address to retrieve orderbook for.
   * @param network - Network in which the orderbook is located.
   *
   * @returns Orderbook for given address, otherwise `undefined`.
   */
  async orderbook(address: string): Promise<OrderbookResponse | undefined> {
    return undefined;
  }

  /**
   * Checks the *unspents* of an address for both ordinals and inscriptions.
   *
   * @param address - Address to check unspents for.
   * @param network - Network in which the address is located.
   */
  async address(address: string): Promise<AddressResponse> {
    const response = makeLookupAddressResponse();

    // TODO: Add logic to check for ordinals and inscriptions.

    return response;
  }

  /**
   * Retrieve an order by its CID _(Content Identifier)_.
   *
   * @param cid - Content identifier of order.
   *
   * @returns Order if found, otherwise `undefined`.
   */
  async order(cid: string): Promise<IPFSOrder | undefined> {
    return undefined;
  }

  /**
   * Retrieve an offer by its CID _(Content Identifier)_.
   *
   * @param cid - Content identifier of offer.
   *
   * @returns Offer if found, otherwise `undefined`.
   */
  async offer(cid: string): Promise<IPFSOffer | undefined> {
    return undefined;
  }
}

/*
 |--------------------------------------------------------------------------------
 | Factories
 |--------------------------------------------------------------------------------
 */

function makeLookupAddressResponse(): AddressResponse {
  return {
    counts: {
      satoshis: 0,
      cardinals: 0,
      ordinals: 0,
      inscriptions: 0
    },
    ordinals: [],
    inscriptions: []
  };
}

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

type OrderbookResponse = {
  orders: any[];
  offers: any[];
};

type AddressResponse = {
  counts: {
    satoshis: number;
    cardinals: number;
    ordinals: number;
    inscriptions: number;
  };
  ordinals: any[];
  inscriptions: any[];
};