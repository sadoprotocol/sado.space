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
  data: {
    render: "Data",
    attributes: {
      title: { type: String, required: true },
      show: { type: Boolean, default: true }
    }
  },
  "data-model": {
    render: "DataModel"
  },
  "data-item": {
    render: "DataItem",
    attributes: {
      name: { type: String },
      type: { type: String },
      "type-link": { type: String },
      required: { type: Boolean },
      default: { type: String },
      description: { type: String }
    }
  },
  "data-value": {
    render: "DataValue",
    selfClosing: true,
    attributes: {
      name: { type: String },
      description: { type: String }
    }
  },
  endpoint: {
    render: "Endpoint",
    attributes: {
      type: { type: String, required: true },
      url: { type: String, required: true }
    }
  },
  preview: {
    render: "Preview",
    attributes: {
      tabs: { type: Array }
    }
  },
  "preview-section": {
    render: "PreviewSection"
  },
  "preview-model": {
    render: "PreviewModel"
  },
  "preview-object": {
    render: "PreviewObject",
    attributes: {
      title: { type: String, required: true },
      show: { type: Boolean, default: false }
    }
  },
  "preview-object-item": {
    render: "PreviewObjectItem",
    attributes: {
      name: { type: String },
      type: { type: String },
      "type-link": { type: String },
      required: { type: Boolean },
      description: { type: String }
    }
  },
  "preview-object-value": {
    render: "PreviewObjectValue",
    selfClosing: true,
    attributes: {
      name: { type: String },
      description: { type: String }
    }
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
