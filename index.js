// atom parser adapted from: Coyier, C. (2020, February 11). How to Fetch and Parse RSS Feeds in JavaScript | CSS-Tricks. CSS-Tricks. https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/
fetch("feed.atom")
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const entries = data.querySelectorAll("entry");
    let html = ``;
    entries.forEach(entry => {
      html += `
        <article>
          <figure>
            
          </figure>
        </article>
      `;
    });
    document.body.insertAdjacentHTML("beforeend", html);
  });