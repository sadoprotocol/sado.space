import { Config } from "@markdoc/markdoc";

export const nodes: Config["nodes"] = {
  fence: {
    render: "Fence",
    attributes: {
      language: {
        type: String
      },
      preview: {
        type: Boolean
      }
    }
  },
  link: {
    render: "Link",
    attributes: {
      href: {
        type: String
      },
      target: {
        type: String,
        default: "_blank"
      }
    }
  }
};
