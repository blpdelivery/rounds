// atom parser adapted from: Coyier, C. (2020, February 11). How to Fetch and Parse RSS Feeds in JavaScript | CSS-Tricks. CSS-Tricks. https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/
fetch("feed.atom")
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const entries = data.querySelectorAll("entry");
    let HTML = ``;
    entries.forEach(entry => {
      let mediaHTML = ``;
      entry.querySelectorAll("link[rel=enclosure]").forEach((enclosure) => {
        let type = enclosure.getAttribute("type");
        if (type.startsWith("image/")) {
          mediaHTML += `<img src="${enclosure.getAttribute("href")}" loading="lazy">`;
        } else if (type.startsWith("video/")) {
          mediaHTML += `<video controls disablepictureinpicture loop="true" src="${enclosure.getAttribute("href")}"><a href="${enclosure.getAttribute("href")}" download>Download video</a></video>`;
        }
      });
      HTML += `
        <article>
          ${mediaHTML}
        </article>
      `;
    });
    document.querySelector("#feed").insertAdjacentHTML("afterbegin", HTML);
  });