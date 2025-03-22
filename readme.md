# BLP Rounds

## feed.rss `item` format

```rss
<item>
  <title>BLP Rounds #n</title>
  <link>https://rounds.bermaguilocalpost.org/#n</link>
  <description>d</description>
  <enclosure url="http://rounds.bermaguilocalpost.org/assets/media/n.ext" length="l" type="t" />
  <pubDate>Sun, 19 Dec 2001 hh:mm:ss GMT+1000</pubDate>
</item>
```

To get pubDate, go to data:text/html,<script>// add a leading 0 to a number if it is only one digit
function addLeadingZero(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

function buildRFC822Date(dateString) {
  const dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthStrings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const timeStamp = Date.parse(dateString);
  const date = new Date(timeStamp);

  const day = dayStrings[date.getDay()];
  const dayNumber = addLeadingZero(date.getDate());
  const month = monthStrings[date.getMonth()];
  const year = date.getFullYear();
  const time = `${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}:00`;
  const timezone = date.getTimezoneOffset() === 0 ? "GMT" : "BST";

  //Wed, 02 Oct 2002 13:00:00 GMT
  return `${day}, ${dayNumber} ${month} ${year} ${time} ${timezone}`;
}

// date in GMT timezone
const exampleOne = buildRFC822Date(new Date().toISOString());

console.log(exampleOne);
</script>