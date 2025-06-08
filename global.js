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