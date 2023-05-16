import { Lookup } from "./Lookup";
import { DEFAULT_NETWORK, Network } from "./Network";

/*
 |--------------------------------------------------------------------------------
 | SADO SDK
 |--------------------------------------------------------------------------------
 |
 | This provides a mutable instance of the SDK for use in your application. It
 | is designed to be used as a singleton with context switching mechanisms on
 | the top layer. This allows for a single instance of the SDK to be used
 | enabling easier consumption of ecosystem services without having to add in
 | additional logic to pass into each service method.
 |
 | Current Features:
 |
 |  - Network Switching
 |
 |    To switch the network context you can now simply assign a new network
 |    to the SDK instance. Example: `sado.network = "mainnet"` which will
 |    reflect into any subsequent service calls.
 |
 */

export class SADO {
  readonly lookup: Lookup;

  readonly #network: NetworkProvider;

  constructor(options?: Options) {
    this.#network = options?.network ?? getNetworkSwitcher();
    this.lookup = getLookupService(this, options?.services?.Lookup);
  }

  set network(value: Network) {
    this.#network.set(value);
  }

  get network() {
    return this.#network.get();
  }
}

/*
 |--------------------------------------------------------------------------------
 | Service Composers
 |--------------------------------------------------------------------------------
 |
 | To allow for easier composition of service implementations the developer can
 | instantiate their own SADO SDK instance and pass in their own service handlers.
 | This is especially useful for testing and mocking the services.
 |
 */

function getNetworkSwitcher(value: Network = DEFAULT_NETWORK) {
  return {
    value,
    set(value: Network) {
      this.value = value;
    },
    get(): Network {
      return this.value;
    }
  };
}

function getLookupService(sado: SADO, Service = Lookup) {
  return new Service(sado);
}

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

type Options = {
  network?: NetworkProvider;
  services?: Services;
};

type NetworkProvider = {
  set(value: Network): void;
  get(): Network;
};

type Services = {
  Lookup: typeof Lookup;
};
