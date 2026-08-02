import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/domain-age",
        destination: "/domain-age-checker",
        permanent: true
      },
      {
        source: "/authority-score",
        destination: "/domain-authority-checker",
        permanent: true
      },
      {
        source: "/authority-score/how-we-calculate",
        destination: "/domain-authority-checker/how-we-calculate",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
