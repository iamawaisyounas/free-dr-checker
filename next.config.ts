import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/cdn-cgi/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive"
          }
        ]
      }
    ];
  },
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
      },
      {
        source: "/blog/10-best-free-domain-rating-checkers-reviewed-2026",
        destination: "/blog/best-free-domain-rating-checkers",
        permanent: true
      },
      {
        source: "/blog/10-best-free-domain-rating-checkers-reviewed",
        destination: "/blog/best-free-domain-rating-checkers",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
