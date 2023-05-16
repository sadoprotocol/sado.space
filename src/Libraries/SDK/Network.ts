export const DEFAULT_NETWORK: Network = "testnet";
export const VALID_NETWORK = ["mainnet", "testnet", "regtest"] as const;

/**
 * Check if provided unknown value is a valid network.
 *
 * @param value - Unknown value to check.
 *
 * @returns True if valid network, false otherwise.
 */
export function isValidNetwork(value: unknown): value is Network {
  return VALID_NETWORK.find((n) => n === value) !== undefined;
}

export type Network = "mainnet" | "testnet" | "regtest";
