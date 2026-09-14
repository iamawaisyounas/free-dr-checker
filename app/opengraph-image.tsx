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
          background: "#f7fbff",
          color: "#07111f",
          padding: "56px 64px",
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #eef6ff 0%, #ffffff 46%, #e9fff8 100%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -160,
            width: 440,
            height: 440,
            borderRadius: 440,
            background: "rgba(0, 103, 247, 0.12)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -110,
            bottom: -150,
            width: 360,
            height: 360,
            borderRadius: 360,
            background: "rgba(32, 199, 168, 0.13)"
          }}
        />

        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src="https://dr-checker.com/icon-512.png"
              width={64}
              height={64}
              alt=""
              style={{ borderRadius: 16 }}
            />
            <span style={{ fontSize: 54, lineHeight: 1, fontWeight: 650, letterSpacing: 0, color: "#07111f" }}>
              Checker
            </span>
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#0067f7",
              background: "#ffffff",
              border: "2px solid #d7e8ff",
              borderRadius: 999,
              padding: "13px 24px"
            }}
          >
            Free SEO Tool
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 30, maxWidth: 940 }}>
          <div style={{ fontSize: 88, lineHeight: 0.98, fontWeight: 950, letterSpacing: 0 }}>
            Free Domain Rating Checker
          </div>
          <div style={{ fontSize: 38, lineHeight: 1.22, color: "#263b52", fontWeight: 700 }}>
            Check Ahrefs Domain Rating, compare website authority, and qualify domains faster.
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "stretch",
            gap: 18
          }}
        >
          {[
            ["Ahrefs DR data", "Backlink strength signal"],
            ["Fast lookup", "No Ahrefs login needed"],
            ["Clean SEO review", "Made for quick decisions"]
          ].map(([label, detail]) => (
            <div
              key={label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                background: "rgba(255, 255, 255, 0.9)",
                border: "2px solid #dbeafe",
                borderRadius: 22,
                padding: "22px 24px",
                boxShadow: "0 18px 44px rgba(7, 17, 31, 0.08)"
              }}
            >
              <span style={{ fontSize: 28, lineHeight: 1.1, fontWeight: 900, color: "#07111f" }}>{label}</span>
              <span style={{ fontSize: 22, lineHeight: 1.25, fontWeight: 700, color: "#456176" }}>{detail}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #d7e8ff",
            paddingTop: 24
          }}
        >
          <div style={{ fontSize: 30, color: "#07111f", fontWeight: 850 }}>dr-checker.com</div>
          <div
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#35506a"
            }}
          >
            Built by SocialBu
            <span style={{ color: "#0067f7" }}>/</span>
            Mobile friendly
          </div>
        </div>
      </div>
    ),
    size
  );
}
