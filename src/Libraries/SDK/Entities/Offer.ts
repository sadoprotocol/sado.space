export type IPFSOffer = {
  cid: string;

  /**
   * Timestamp to act as nonce.
   *
   * Note that this timestamp value may not be the actual timestamp for
   * when the order was created. To get the sourced timestamp you need
   * to check timestamp value on the blockchain transaction.
   */
  ts: number;

  /**
   * IPFS (Inter Planetary File System) CID of original order.
   */
  origin: string;

  /**
   * PSBT (Partially Signed BTC Transaction)
   *
   * An offer is a partially signed transaction that is signed by either
   * a seller or buyer.
   *
   * Once a offer has been signed by both parties it is then considered a
   * completed transaction once its been relayed to the network.
   */
  offer: string;

  /**
   * Address of the taker correlating to key used in signature.
   *
   * For a offer to be valid it needs to be signed by the taker before
   * its relayed to the network.
   */
  taker: string;
};
