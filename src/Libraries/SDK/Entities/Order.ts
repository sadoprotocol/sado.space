/**
 * Order is created by either a seller or buyer.
 *
 * ### SELL
 *
 * A sell order who wants to sell or trade their ordinals/inscriptions. A sell
 * order can contain either `satoshis` or `cardinals` representing the minimum
 * amount they want to sell for. Or it can contain a `satoshi` which represents
 * a specific transaction at a vout location that they want to execute a trade
 * for.
 *
 * In the case of a trade the `location` represents the location which they
 * want to give. And the `satoshi` represents the location they want to receive.
 *
 * ### BUY
 *
 * A buy order who wants to buy or trade ordinals/inscriptions. A buy order can
 * contain either `satoshis` or `cardinals` representing the amount that they
 * wish to buy for. Or it can contain a `satoshi` which represents a specific
 * transaction at a vout location that they want to trade for.
 *
 * In the case of a trade the `location` represents the location which they
 * wish to give, and the `satoshi` represents the location they want to receive.
 *
 * ### VALIDATION
 *
 *  - An order must have one of [satoshis | cardinals | satoshi].
 */
export type IPFSOrder = {
  cid: string;

  /**
   * Timestamp to act as nonce.
   *
   * Note that this timestamp value may not be the actual
   * timestamp for when the order was created. To get the sourced timestamp
   * you need to check timestamp value on the blockchain transaction.
   */
  ts: number;

  /**
   * Order type.
   */
  type: OrderType;

  /**
   * Location of ordinal being sold in the format `txid:vout`.
   */
  location: string;

  /**
   * Address of the maker correlating to key used in signature.
   *
   * A maker address can be one of two types, a `legacy` or `bech32`. This is defined by
   * the maker when they create their wallet.
   *
   * NOTE! When a maker address is a `bech32` address then a `desc` field is required.
   */
  maker: string;

  /**
   * Amount of satoshis required/offered to execute the fulfill the order.
   *
   * SELL - Integer number of lowest denomination required to purchase the ordinal.
   * BUY  - Integer number offered to purchase the ordinal.
   *
   * @deprecated this value is slated to be removed in favor of `cardinals`.
   */
  satoshis?: string;

  /**
   * Amount of satoshis required/offered to execute the fulfill the order.
   *
   * SELL - Integer number of lowest denomination required to purchase the ordinal.
   * BUY  - Integer number offered to purchase the ordinal.
   */
  cardinals?: string;

  /**
   * Satoshi is used when a seller or buyer wants to trade inscriptions.
   * Location of the transaction the seller or buyer wishes to receive.
   */
  satoshi?: string;

  /**
   * List of addresses that are allowed to take this order.
   */
  orderbooks?: string[];

  /**
   * Metadata attached to the order.
   */
  meta?: Record<string, unknown>;

  /**
   * Signature.
   */
  signature: string;

  /**
   * Descriptor for BECH32 addresses.
   * NOTE! This is required if the maker is using a BECH32 address.
   */
  desc?: string;
};

export type OrderType = "sell" | "buy";
