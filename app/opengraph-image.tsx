import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ricardo Fundora — Senior Software Engineer";

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
          background: "#0b0e14",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #1f2733",
            borderRadius: "18px",
            background: "#11151f",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#0d111a",
              borderBottom: "1px solid #1f2733",
              padding: "18px 24px",
            }}
          >
            <div style={{ display: "flex", width: "14px", height: "14px", borderRadius: "9999px", background: "#ff5f56" }} />
            <div style={{ display: "flex", width: "14px", height: "14px", borderRadius: "9999px", background: "#ffbd2e" }} />
            <div style={{ display: "flex", width: "14px", height: "14px", borderRadius: "9999px", background: "#27c93f" }} />
            <div style={{ display: "flex", marginLeft: "16px", color: "#6b7785", fontSize: "22px" }}>
              ricardo@portfolio:~$
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "48px 56px" }}>
            <div style={{ display: "flex", color: "#7ee787", fontSize: "28px" }}>$ whoami</div>
            <div style={{ display: "flex", color: "#7ee787", fontSize: "62px", fontWeight: 700, marginTop: "18px" }}>
              Ricardo Fundora Hernández
            </div>
            <div style={{ display: "flex", color: "#c9d3e0", fontSize: "30px", marginTop: "20px" }}>
              Senior Software Engineer
            </div>
            <div style={{ display: "flex", color: "#79c0ff", fontSize: "26px", marginTop: "10px" }}>
              Backend (Python / .NET) · Full-Stack · Remote
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
