import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// design.md §10.9: "marble background, page title in [display type], a
// short [accent] rule, 'Junaidi Group'... No photos, so they never go out
// of date." Archivo/crimson per the token reconciliation (DECISIONS.md
// #1), not design.md's original Marcellus/brass wording.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#eceeea",
        color: "#111726",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ width: 64, height: 4, backgroundColor: "#a00c20", marginBottom: 32 }} />
      <div style={{ fontSize: 64, fontWeight: 650, lineHeight: 1.1 }}>
        Hajj and Umrah from Karachi
      </div>
      <div style={{ fontSize: 28, marginTop: 24, color: "#5e655f" }}>Junaidi Group</div>
    </div>,
    { ...size },
  );
}
