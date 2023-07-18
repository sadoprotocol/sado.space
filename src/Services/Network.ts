import { createSignal } from "solid-js";

const [current, setNetwork] = createSignal(localStorage.getItem("network") || "mainnet");

export const network = {
  get current() {
    return current;
  },

  set(value: string) {
    localStorage.setItem("network", value);
    setNetwork(value);
  }
};
