import { ImageResponse } from "next/og";
import { absoluteUrl } from "../lib/schema";

export const alt = "Free Domain Rating Checker preview";
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
          background: "#f8fafc",
          color: "#102033",
          padding: 72,
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img
            src={absoluteUrl("/icon-512.png")}
            alt="DR Checker"
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              boxShadow: "0 14px 34px rgba(15, 23, 42, 0.14)"
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 36, fontWeight: 900 }}>DR Checker</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#2563eb" }}>by SocialBu</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 70, lineHeight: 1.04, fontWeight: 900, maxWidth: 980 }}>
            Free Domain Rating Checker
          </div>
          <div style={{ fontSize: 32, lineHeight: 1.32, color: "#40546a", maxWidth: 930 }}>
            Check Ahrefs DR, compare backlink strength, and qualify domains faster.
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
            Fast DR lookup
            <span style={{ color: "#a0acb8" }}>/</span>
            No Ahrefs login
          </div>
        </div>
      </div>
    ),
    size
  );
}
