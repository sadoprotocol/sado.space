import { router } from "~Services/Router";

export const navigation: Navigation = {
  blog: [
    {
      title: "Sado Space",
      links: [{ title: "Introduction", href: "/", file: "/blog/welcome.md" }]
    },
    {
      title: "Blog Articles",
      links: [
        {
          title: "Introducing the Sado Mono Explorers",
          href: "/blog/introducing-sado-mono-explorer",
          file: "/blog/explorers.md"
        },
        {
          title: "Tapping into the magic of taproot!",
          href: "/blog/taproot-recoverable-commits",
          file: "/blog/taproot.md"
        },
        { title: "Be aware of what is ordinal-aware", href: "/blog/ordinal-aware", file: "/blog/aware.md" }
      ]
    }
  ],
  docs: [
    {
      title: "Introduction",
      links: [{ title: "Documentation", href: "/docs", file: "/docs/introduction/welcome.md" }]
    },
    {
      title: "API",
      links: [
        { title: "Address", href: "/docs/api-address", file: "/docs/api/address.md" },
        { title: "Transactions", href: "/docs/api-transactions", file: "/docs/api/transactions.md" },
        { title: "Ordinals", href: "/docs/api-ordinals", file: "/docs/api/ordinals.md" }
      ]
    },
    {
      title: "SDK",
      links: [
        { title: "Introduction", href: "/docs/sdk-introduction", file: "/docs/sdk/introduction.md" },
        { title: "Wallet", href: "/docs/sdk-wallet", file: "/docs/sdk/wallet.md" },
        { title: "Inscription", href: "/docs/sdk-inscription", file: "/docs/sdk/inscription.md" },
        { title: "Instant Buy", href: "/docs/sdk-instantbuy", file: "/docs/sdk/instantbuy.md" }
      ]
    },
    {
      title: "IPFS",
      links: [
        { title: "Introduction", href: "/docs/ipfs-introduction", file: "/docs/ipfs/introduction.md" },
        { title: "Content", href: "/docs/ipfs-content", file: "/docs/ipfs/content.md" },
        { title: "Files", href: "/docs/ipfs-files", file: "/docs/ipfs/files.md" }
      ]
    }
  ],
  whitepaper: [
    {
      title: "Whitepaper",
      links: [
        { title: "Abstract", href: "/whitepaper", file: "/docs/whitepaper/abstract.md" },
        { title: "Introductions", href: "/whitepaper/introductions", file: "/docs/whitepaper/introductions.md" },
        { title: "Specifications", href: "/whitepaper/specifications", file: "/docs/whitepaper/specifications.md" },
        {
          title: "Making Sell Orders",
          href: "/whitepaper/making-sell-orders",
          file: "/docs/whitepaper/making-sell-orders.md"
        },
        {
          title: "Taking Sell Orders",
          href: "/whitepaper/taking-sell-orders",
          file: "/docs/whitepaper/taking-sell-orders.md"
        },
        {
          title: "Making Buy Orders",
          href: "/whitepaper/making-buy-orders",
          file: "/docs/whitepaper/making-buy-orders.md"
        },
        {
          title: "Taking Buy Orders",
          href: "/whitepaper/taking-buy-orders",
          file: "/docs/whitepaper/taking-buy-orders.md"
        },
        { title: "Extensions", href: "/whitepaper/extensions", file: "/docs/whitepaper/extensions.md" },
        { title: "Bidding", href: "/whitepaper/bidding", file: "/docs/whitepaper/bidding.md" },
        { title: "Discovery", href: "/whitepaper/discovery", file: "/docs/whitepaper/discovery.md" },
        { title: "Roadmap", href: "/whitepaper/roadmap", file: "/docs/whitepaper/roadmap.md" }
      ]
    }
  ]
};

export function getNavigationByLocation(): NavigationCategory[] {
  const path = router.history.location.pathname;
  if (path === "/" || path.includes("blog")) {
    return navigation.blog;
  }
  if (path.includes("docs")) {
    return navigation.docs;
  }
  if (path.includes("whitepaper")) {
    return navigation.whitepaper;
  }
  return [];
}

export type Navigation = {
  [key: string]: NavigationCategory[];
};

export type NavigationCategory = {
  /**
   * Title of the documentation section. Used by the docs to populate category
   * title text.
   */
  title: string;

  /**
   * List of links mapped under the navigation category.
   */
  links: NavigationLink[];
};

export type NavigationLink = {
  /**
   * Title of the documentation page, used by the docs to populate titles and
   * can also be used by the router to set the document title.
   */
  title: string;

  /**
   * Router path to the documentation page. Should be a path mapping to the
   * registered router endpoints.
   */
  href: string;

  /**
   * Path to the markdown file. This can be a relative path from the website
   * public root or a full URL.
   */
  file: string;
};
