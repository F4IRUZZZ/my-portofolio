import { ImageResponse } from "next/og";

export const alt = "Fairuz.dev — Student Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0B1020",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, color: "#AAB4C5" }}>
          Student Developer
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, marginTop: 8 }}>
          Fairuz<span style={{ color: "#3B82F6" }}>.dev</span>
        </div>
        <div style={{ fontSize: 32, color: "#AAB4C5", marginTop: 16 }}>
          Portofolio Alfairuz Atthariq Satria
        </div>
      </div>
    ),
    { ...size },
  );
}
