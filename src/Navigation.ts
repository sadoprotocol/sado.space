import { router } from "~Services/Router";

export const navigation: Navigation = {
  blog: [
    {
      title: "Sado Space",
      links: [{ title: "Introduction", href: "/", file: "/blog/welcome.md" }]
    },
    {
      title: "Articles",
      links: [{ title: "Tapping-into the magic of taproot!", href: "/blog/taproot-recoverable-commits", file: "/blog/taproot.md" }]
    }
  ],
  docs: [
    {
      title: "Introduction",
      links: [{ title: "Welcome", href: "/docs", file: "/docs/introduction/welcome.md" }]
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
        { title: "Inscription", href: "/docs/ordit-inscription", file: "/docs/ordit/inscription.md" },
        { title: "Instant Buy", href: "/docs/ordit-instantbuy", file: "/docs/ordit/instantbuy.md" }
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
