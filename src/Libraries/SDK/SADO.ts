import { Lookup } from "./Lookup";
import { DEFAULT_NETWORK, Network } from "./Network";
import { Ordit } from "./Services/Ordit";

export class SADO {
  readonly ordit: Ordit;
  readonly lookup: Lookup;

  network: Network;

  constructor(network = DEFAULT_NETWORK) {
    this.network = network;
    this.ordit = new Ordit(this);
    this.lookup = new Lookup(this);
  }
}
