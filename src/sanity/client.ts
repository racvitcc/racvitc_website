import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

// A read token is only needed if the dataset is set to *private*. With a public
// dataset (the default we set up) reads go through Sanity's fast CDN with no
// token. If a token is present we talk to the live API instead so private
// content resolves.
const token = process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !token,
  perspective: "published",
  token: token || undefined,
});
