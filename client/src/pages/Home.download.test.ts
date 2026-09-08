import { afterEach, describe, expect, it, vi } from "vitest";
import { downloadBlob, GRADIENT_PRESETS } from "./Home";

describe("gradient presets", () => {
  it("contains all five requested themes and exact color pairs", () => {
    expect(GRADIENT_PRESETS).toEqual([
      { id: "blue-purple", name: "蓝紫", start: "#7D2DFF", end: "#41DDFF" },
      { id: "blue-cyan", name: "蓝青", start: "#64FBD7", end: "#5383FF" },
      { id: "orange-red", name: "橙红", start: "#FF5D5D", end: "#FFB648" },
      { id: "yellow-green", name: "黄绿", start: "#53D750", end: "#F0F33C" },
      { id: "pink-purple", name: "粉紫", start: "#E1ADFA", end: "#FCB4B4" },
    ]);
  });
});

describe("downloadBlob", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("triggers a standard browser download with the requested filename", () => {
    const anchor = {
      href: "",
      download: "",
      rel: "",
      style: { display: "" },
      click: vi.fn(),
      remove: vi.fn(),
    };
    const createObjectURL = vi.fn(() => "blob:iconmorph-test");
    const revokeObjectURL = vi.fn();
    const appendChild = vi.fn();
    vi.stubGlobal("document", {
      createElement: vi.fn(() => anchor),
      body: { appendChild },
    });
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });
    vi.stubGlobal("navigator", {});
    vi.stubGlobal("window", { setTimeout: (callback: () => void) => callback() });

    downloadBlob(new Blob(["zip-content"], { type: "application/zip" }), "iconmorph-batch.zip");

    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(anchor.href).toBe("blob:iconmorph-test");
    expect(anchor.download).toBe("iconmorph-batch.zip");
    expect(anchor.click).toHaveBeenCalledOnce();
    expect(anchor.remove).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:iconmorph-test");
  });
});
