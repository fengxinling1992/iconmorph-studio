import { describe, expect, it } from "vitest";
import { defaultIcons, renderVariantSvg, RenderParams } from "./iconRenderer";

const params: RenderParams = {
  primary: "#A696FC",
  secondary: "#67A7FB",
  sideColor: "#718AE9",
  bottomColor: "#4F68C9",
  frontColor: "#A6B6FF",
  extrudePrimary: "#1A81FF",
  extrudeSecondary: "#8A58FE",
  extrudeAngle: 135,
  angle: 135,
  extrusionAngle: 30,
  shadowLength: 34,
  extrusion: 18,
  opacity: 72,
  blur: 8,
  highlight: 54,
  glassPrimary: "#1A81FF",
  glassSecondary: "#8A58FE",
  glassAngle: 135,
  glassOpacity: 82,
  glassBlur: 22,
  glassHighlight: 82,
  safeExtrusion: true,
  duotoneCutoutColor: "#FFFFFF",
  sceneExtrusion: 92,
  sceneExtrusionAngle: 325,
  sceneSkewAngle: 30,
  scenePrimary: "#A696FC",
  sceneSecondary: "#67A7FB",
  sceneAngle: 135,
  sceneSideColor: "#718AE9",
  sceneBottomColor: "#4F68C9",
  sceneBlur: 8,
  sceneHighlight: 54,
  sceneSafeExtrusion: true,
  extrudeCutoutColor: "#FFFFFF",
  sceneCutoutColor: "#FFFFFF",
  sceneObjectHeight: 0,
  sceneMotionHeight: 0,
  sceneScale: 100,
  scenePositionX: 0,
  scenePositionY: 0,
  sceneBaseDecor: "base1",
  sceneObjectDecor: "orb",
  sceneMotionDecor: "ribbon",
};

describe("renderVariantSvg", () => {
  it("uses the independent 2.5D front gradient and unified card background", () => {
    const svg = renderVariantSvg(defaultIcons()[0], "extrude", params);
    expect(svg).toContain("#F1F2F6");
    expect(svg).toContain("#1A81FF");
    expect(svg).toContain("#8A58FE");
    expect(svg).toContain("whole-archive-extrude");
  });

  it("keeps the base 2 asset bundled and addressable", () => {
    const svg = renderVariantSvg(defaultIcons()[0], "scene", { ...params, sceneBaseDecor: "base2" });
    expect(svg).toContain("iconmorph-isometric-base.svg");
  });

  it("scales the 3D subject around the SVG center point", () => {
    const svg = renderVariantSvg(defaultIcons()[0], "scene", { ...params, sceneScale: 125 });
    expect(svg).toContain('translate(160 196) scale(1.250) translate(-160 -196)');
  });

  it("moves the complete 3D subject without moving the scene kit", () => {
    const svg = renderVariantSvg(defaultIcons()[0], "scene", {
      ...params,
      scenePositionX: 24,
      scenePositionY: -18,
      sceneBaseDecor: "base2",
    });
    expect(svg).toContain('transform="translate(24.00 -18.00)"');
    expect(svg).toContain("iconmorph-isometric-base.svg");
    expect(svg).toContain('x="7" y="116" width="306" height="194"');
  });

  it("uses custom object and motion assets in the 3D scene", () => {
    const svg = renderVariantSvg(defaultIcons()[0], "scene", {
      ...params,
      sceneObjectDecor: "custom",
      sceneMotionDecor: "custom",
      sceneObjectCustom: "data:image/svg+xml;base64,object",
      sceneMotionCustom: "data:image/svg+xml;base64,motion",
    });
    expect(svg).toContain("data:image/svg+xml;base64,object");
    expect(svg).toContain("data:image/svg+xml;base64,motion");
  });
});
