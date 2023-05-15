import { config } from "~Modules/Docs/Config";

import { SadoLogo } from "./SadoLogo";

config.logo = [SadoLogo, { size: 36 }];

config.hero.title = "SADO";
config.hero.marqee = ["Self-Authenticating", "Decentralized", "Orderbooks"];
config.hero.description = "Navigate the world of Ordinals with SADO space.";

config.navigation = [
  {
    title: "Introduction",
    links: [
      { title: "Features", href: "/", file: "/docs/0-features.md" },
      { title: "Abstract", href: "/docs/abstract", file: "/docs/1-abstract.md" },
      { title: "Specifications", href: "/docs/specifications", file: "/docs/2-specifications.md" }
    ]
  },
  {
    title: "Sell",
    links: [
      { title: "Making Sell Orders", href: "/docs/making-sell-orders", file: "/docs/3-making-sell-orders.md" },
      { title: "Taking Sell Orders", href: "/docs/taking-sell-orders", file: "/docs/4-taking-sell-orders.md" }
    ]
  },
  {
    title: "Buy",
    links: [
      { title: "Making Buy Orders", href: "/docs/making-buy-orders", file: "/docs/5-making-buy-orders.md" },
      { title: "Taking Buy Orders", href: "/docs/taking-buy-orders", file: "/docs/6-taking-buy-orders.md" }
    ]
  },
  {
    title: "SDK",
    links: [{ title: "Lookup", href: "/docs/sdk-lookup", file: "/docs/7-lookup.md" }]
  }
];
