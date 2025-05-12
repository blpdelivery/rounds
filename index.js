const dateFormat = new Intl.DateTimeFormat("en-AU", {dateStyle: "full"});

// atom parser adapted from: Coyier, C. (2020, February 11). How to Fetch and Parse RSS Feeds in JavaScript | CSS-Tricks. CSS-Tricks. https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/
fetch("feed.atom")
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const entries = data.querySelectorAll("entry");
    let HTML = ``;
    for (const entry of entries) {
      let title = entry.querySelector("title").innerHTML;
      let published = entry.querySelector("published").innerHTML;
      HTML = `
        <article id="${title}">
          <h2>#${title}</h2>
          <p><time datetime="${published}">${dateFormat.format(new Date(published))}</time></p>
          ${entry.querySelector("content div").innerHTML}
        </article>
      ` + HTML;
    };
    document.getElementById("feed").innerHTML = HTML;
  });

alert("updated");

document.getElementById("atom").addEventListener("click", () => {
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      navigator.clipboard.writeText("https://rounds.bermaguilocalpost.org/feed.atom").then(
        () => {
          alert("Feed URL successfully copied to clipboard");
        },
        () => {
          alert("Failed to copy feed URL to clipboard");
        },
      );
    }
  });
});
