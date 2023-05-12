import { Dynamic } from "solid-js/web";

import { Layout } from "../Components/Layout";
import { DocsController } from "./Docs.Controller";

export const DocsView = DocsController.view(({ state }) => {
  return (
    <Layout>
      <Dynamic component={state.routed} />
    </Layout>
  );
});
