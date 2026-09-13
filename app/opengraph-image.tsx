import { ImageResponse } from "next/og";

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
          background: "#07111f",
          color: "#ffffff",
          padding: "58px 68px",
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(0,103,247,0.42), rgba(0,183,223,0.16) 45%, rgba(7,17,31,0) 72%)"
          }}
        />
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
            <span style={{ fontSize: 48, fontWeight: 900, letterSpacing: 0, color: "#ffffff" }}>DR</span>
            <span style={{ fontSize: 48, fontWeight: 900, letterSpacing: 0, color: "#0067f7" }}>checker</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#b2cae6" }}>by SocialBu</div>
        </div>

        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 42 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, width: 700 }}>
            <div style={{ fontSize: 82, lineHeight: 0.96, fontWeight: 950, letterSpacing: 0 }}>
              Free Domain Rating Checker
            </div>
            <div style={{ fontSize: 34, lineHeight: 1.22, color: "#dcecff", fontWeight: 650 }}>
              Check Ahrefs DR and compare backlink strength in seconds.
            </div>
          </div>
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: 36,
              border: "2px solid rgba(178, 202, 230, 0.3)",
              background: "rgba(255, 255, 255, 0.94)",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.34)",
              color: "#07111f",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10
            }}
          >
            <div style={{ fontSize: 28, color: "#40546a", fontWeight: 800 }}>Domain Rating</div>
            <div style={{ fontSize: 116, lineHeight: 0.9, color: "#0067f7", fontWeight: 950 }}>76</div>
            <div style={{ fontSize: 24, color: "#1a7f64", fontWeight: 850 }}>Strong domain</div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(178, 202, 230, 0.22)",
            paddingTop: 26
          }}
        >
          <div style={{ fontSize: 30, color: "#ffffff", fontWeight: 800 }}>dr-checker.com</div>
          <div
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#dcecff"
            }}
          >
            Fast DR lookup
            <span style={{ color: "#5aa3ff" }}>/</span>
            No Ahrefs login
          </div>
        </div>
      </div>
    ),
    size
  );
}
