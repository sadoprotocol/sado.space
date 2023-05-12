import { Config } from "@markdoc/markdoc";

export const tags: Config["tags"] = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: "note",
        matches: ["note", "warning"],
        errorLevel: "critical"
      }
    },
    render: "Callout"
  },
  "quick-links": {
    render: "QuickLinks"
  },
  "quick-link": {
    selfClosing: true,
    render: "QuickLink",
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String }
    }
  }
};
