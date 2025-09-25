import { Viewer } from "@photo-sphere-viewer/core";
import { CubemapAdapter } from "@photo-sphere-viewer/cubemap-adapter";

for (const container of document.querySelectorAll(".photo-sphere.media-item")) {
  container.textContent = "";
  const viewer = new Viewer({
    container,
    defaultZoomLvl: 0,
    adapter: CubemapAdapter,
    panorama: {
      type: "stripe",
      path: container.dataset.src
    }
  });
}
