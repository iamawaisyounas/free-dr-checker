"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../studio/sanity.config";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="studio-setup">
        <h1>Sanity Studio is not connected yet</h1>
        <p>Add the Sanity project environment variables in Vercel, then redeploy to enable the CMS dashboard.</p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
