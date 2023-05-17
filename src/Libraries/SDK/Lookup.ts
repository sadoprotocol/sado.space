import { rpc } from "./Client";
import type { IPFSOffer } from "./Entities/Offer";
import type { IPFSOrder } from "./Entities/Order";
import type { SADO } from "./SADO";

export class Lookup {
  constructor(readonly sado: SADO) {}

  /**
   * Retrieve orderbook for given address.
   *
   * @param address - Address to retrieve orderbook for.
   *
   * @returns Orderbook result
   */
  async orderbook(address: string): Promise<Orderbook> {
    return rpc.call<Orderbook>(
      "GetOrderbook",
      {
        address,
        network: this.sado.network
      },
      rpc.getId()
    );
  }

  /**
   * Retrieve an order by its CID _(Content Identifier)_.
   *
   * @param cid - Content identifier of order.
   *
   * @returns Order result.
   */
  async order(cid: string): Promise<IPFSOrder> {
    return rpc.call<IPFSOrder>("GetOrder", { cid }, rpc.getId());
  }

  /**
   * Retrieve an offer by its CID _(Content Identifier)_.
   *
   * @param cid - Content identifier of offer.
   *
   * @returns Offer result.
   */
  async offer(cid: string): Promise<IPFSOffer> {
    return rpc.call<IPFSOffer>("GetOffer", { cid }, rpc.getId());
  }
}

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

type Orderbook = {
  orders: any[];
  offers: any[];
};
