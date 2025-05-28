---
layout: js-minifier
---

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
  });
});

const atomURL = "https://rounds.bermaguilocalpost.org/feed.atom"

async function copyAtomURL() {
  try {
    await navigator.clipboard.writeText(atomURL);
    alert("Feed URL copied to clipboard. Paste into your preferred feed reader.");
  } catch (err) {
    open(atomURL, "_blank");
    console.error("copy to clipboard error: " + err);
  }
}

document.getElementById("atom-open").addEventListener("click", copyAtomURL);

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
