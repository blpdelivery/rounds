---
layout: js_minifier
---

const atomURL = "https://rounds.bermaguilocalpost.org/feed.xml";

async function copyAtomURL() {
  try {
    await navigator.clipboard.writeText(atomURL);
    alert("Feed URL copied to clipboard. Paste into your preferred feed reader.");
  } catch (err) {
    open(atomURL, "_blank");
    console.error(`Copy to clipboard error (${err})`);
  }
}

document.getElementById("atom").addEventListener("click", copyAtomURL);


const imgPreview = document.getElementById("img-preview"),
  imgPreviewClose = document.getElementById("img-preview-close"),
  imgPreviewImg = document.getElementById("img-preview-img");

function closeImgPreview() {
  imgPreview.close();
  imgPreviewImg.src = "";
}

imgPreview.addEventListener("click", closeImgPreview);
imgPreviewClose.addEventListener("click", closeImgPreview);

for (const mediaItem of document.querySelectorAll("img.media-item")) {
  mediaItem.addEventListener("click", () => {
    imgPreviewImg.src = mediaItem.src;
    imgPreview.show();
  });
}
