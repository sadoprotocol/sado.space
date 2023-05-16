import { DEFAULT_NETWORK, isValidNetwork, Network, SADO } from "@sadoprotocol/sdk";

export const sado = new SADO({
  network: {
    set(value: Network) {
      localStorage.setItem("network", value);
    },
    get(): Network {
      return getCurrentNetwork();
    }
  }
});

/**
 * Get current network selection from localStorage or default to testnet.
 *
 * This is a browser based network selection solution that allows the
 * application to persist the network selection across page reloads.
 *
 * @returns Current network selection.
 */
function getCurrentNetwork(): Network {
  const network = localStorage.getItem("network");
  if (isValidNetwork(network)) {
    return network;
  }
  return DEFAULT_NETWORK;
}
