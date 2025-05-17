document.getElementById("atom-open").addEventListener("click", () => {
  document.getElementById("atom").show();
});

const imgPreview = document.getElementById("img-preview"),
  imgPreviewClose = document.getElementById("img-preview-close"),
  imgPreviewImg = document.getElementById("img-preview-img");

imgPreview.addEventListener("click", () => imgPreview.close());
imgPreviewClose.addEventListener("click", () => imgPreview.close());

for (const mediaItem of document.querySelectorAll("img.media-item")) {
  mediaItem.addEventListener("click", () => {
    imgPreviewImg.src = mediaItem.src;
    imgPreview.show();
  });
}