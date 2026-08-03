import { createClient } from "next-sanity";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = "2024-01-01";

export function sanityIsConfigured() {
  return Boolean(sanityProjectId && sanityProjectId !== "your_project_id");
}

export const client = createClient({
  projectId: sanityProjectId || "replace-with-sanity-project-id",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN || undefined
});
