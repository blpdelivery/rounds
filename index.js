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
  mediaItem.addEventListener("error", () => mediaItem.src = "assets/ui/broken-img.svg");
  mediaItem.addEventListener("click", () => {
    imgPreviewImg.src = mediaItem.dataset.original;
    imgPreview.show();
  });
}