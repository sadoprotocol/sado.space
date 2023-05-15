import { Config } from "@markdoc/markdoc";

export const nodes: Config["nodes"] = {
  fence: {
    render: "Fence",
    attributes: {
      language: {
        type: String
      }
    }
  },
  link: {
    render: "Link",
    attributes: {
      href: {
        type: String
      }
    }
  }
};
