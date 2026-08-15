import { ImageResponse } from "next/og";

export const alt = "DR Checker domain rating score preview";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7fafc",
          color: "#102033",
          padding: 72,
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              background: "#1a7f64",
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 800
            }}
          >
            DR
          </div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>DR Checker</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 900, maxWidth: 900 }}>
            Check Ahrefs DR for Free
          </div>
          <div style={{ fontSize: 32, lineHeight: 1.35, color: "#40546a", maxWidth: 880 }}>
            Enter any domain to get a fast Domain Rating score from Ahrefs.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #d9e3ea",
            paddingTop: 34
          }}
        >
          <div style={{ fontSize: 28, color: "#40546a" }}>dr-checker.com</div>
          <div
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#1a7f64"
            }}
          >
            Domain Rating
            <span style={{ color: "#a0acb8" }}>/</span>
            Ahrefs API
          </div>
        </div>
      </div>
    ),
    size
  );
}
