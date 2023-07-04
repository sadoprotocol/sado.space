import { SadoLogo } from "~Atoms/Icons/SadoLogo";
import { config } from "~Modules/Docs/Config";

config.logo = [SadoLogo, { size: 36 }];

config.hero.title = "Sado";
config.hero.description = "Self-Authenticating Decentralized Ordinalbooks";

config.navigation = [
  {
    title: "Introduction",
    links: [{ title: "Features", href: "/", file: "/docs/introduction/features.md" }]
  },
  {
    title: "Sado API",
    links: [
      { title: "Introduction", href: "/docs/sdk-introduction", file: "/docs/sdk/introduction.md" },
      { title: "Orderbook", href: "/docs/sdk-orderbook", file: "/docs/sdk/orderbook.md" },
      { title: "Order", href: "/docs/sdk-order", file: "/docs/sdk/order.md" },
      { title: "Offer", href: "/docs/sdk-offer", file: "/docs/sdk/offer.md" }
    ]
  },
  {
    title: "IPFS API",
    links: [
      { title: "Introduction", href: "/docs/ipfs-introduction", file: "/docs/ipfs/introduction.md" },
      { title: "Content", href: "/docs/ipfs-content", file: "/docs/ipfs/content.md" },
      { title: "Files", href: "/docs/ipfs-files", file: "/docs/ipfs/files.md" }
    ]
  },
  {
    title: "Ordit SDK",
    links: [
      { title: "Introduction", href: "/docs/ordit-introduction", file: "/docs/ordit/introduction.md" },
      { title: "Wallet", href: "/docs/ordit-wallet", file: "/docs/ordit/wallet.md" },
      { title: "Inscription", href: "/docs/ordit-inscription", file: "/docs/ordit/inscription.md" }
    ]
  },
  {
    title: "Whitepaper",
    links: [
      { title: "Abstract", href: "/docs/abstract", file: "/docs/whitepaper/abstract.md" },
      { title: "Introductions", href: "/docs/introductions", file: "/docs/whitepaper/introductions.md" },
      { title: "Specifications", href: "/docs/specifications", file: "/docs/whitepaper/specifications.md" },
      { title: "Making Sell Orders", href: "/docs/making-sell-orders", file: "/docs/whitepaper/making-sell-orders.md" },
      { title: "Taking Sell Orders", href: "/docs/taking-sell-orders", file: "/docs/whitepaper/taking-sell-orders.md" },
      { title: "Making Buy Orders", href: "/docs/making-buy-orders", file: "/docs/whitepaper/making-buy-orders.md" },
      { title: "Taking Buy Orders", href: "/docs/taking-buy-orders", file: "/docs/whitepaper/taking-buy-orders.md" },
      { title: "Extensions", href: "/docs/extensions", file: "/docs/whitepaper/extensions.md" },
      { title: "Bidding", href: "/docs/bidding", file: "/docs/whitepaper/bidding.md" },
      { title: "Discovery", href: "/docs/discovery", file: "/docs/whitepaper/discovery.md" },
      { title: "Roadmap", href: "/docs/roadmap", file: "/docs/whitepaper/roadmap.md" }
    ]
  }
];
