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
  mediaItem.addEventListener("click", async () => {
    imgPreviewImg.src = mediaItem.src;
    imgPreview.show();
    await fetch(mediaItem.dataset.original)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.blob();
      })
      .then(response => {
        imgPreviewImg.src = URL.createObjectURL(response);
      });
  });
}
