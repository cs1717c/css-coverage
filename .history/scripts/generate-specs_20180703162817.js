const createTemplate = require("lodash.template");
const slugify = require("slugify");
const fs = require("fs-extra");

const urls = [
  // Pages with Opta widgets:
  "https://www.thesun.co.uk/sport/football/wc2018/fixtures-results/",
  "https://www.thesun.co.uk/world-cup-2018/6685209/sweden-vs-switzerland-live-score-latest-updates-world-cup/",
  "https://www.thesun.co.uk/sport/football/premierleague/",
  "https://www.thesun.co.uk/sport/football/premierleague/table/",

  // Special helios rendered section:
  "https://origin-news-www.thesun.co.uk/world-cup-2018/",

  // Football articles:
  "https://origin-news-www.thesun.co.uk/sport/football/6673099/mo-salah-signs-new-liverpool-contract/",
  // "https://origin-news-www.thesun.co.uk/world-cup-2018/6656808/wayne-rooney-england-vs-belgium-us-pub-dc-united-world-cup/",

  // Live blogs:
  "https://origin-news-www.thesun.co.uk/sport/football/6284054/transfer-news-live-updates-latest-ronaldo-real-madrid-liverpool-spurs/",

  // News articles:
  "https://origin-news-www.thesun.co.uk/news/6655915/neighbours-slash-family-swimming-pool-hated-children-playing/",

  // TV & Showbiz articles:
  "https://origin-news-www.thesun.co.uk/tvandshowbiz/6654722/lisa-armstrong-puts-her-wedding-ring-from-ant-mcpartlin-back-on-during-la-holiday/",
  "https://origin-news-www.thesun.co.uk/tvandshowbiz/6465549/matt-healy-the-1975-girlfriend-parents-denise-welch-tim/",

  // Love Island articles:
  "https://origin-news-www.thesun.co.uk/tvandshowbiz/6653003/love-island-viewers-desperately-warn-jack-fincham-not-to-cheat-on-dani-dyer-as-he-appears-to-kiss-kazimir/",

  // Fabulous articles:
  "https://origin-news-www.thesun.co.uk/fabulous/6639299/sexual-abused-by-mum-nikki-dubose-model/",

  // Money articles:
  "https://origin-news-www.thesun.co.uk/money/6646591/easyjet-cancelled-flight-after-check-in-first-family-holiday-abroad/",

  // Motors articles:
  "https://origin-news-www.thesun.co.uk/motors/6656238/britain-to-expect-15-breakdowns-a-minute-this-weekend-as-cars-struggle-in-the-heat-heres-how-to-look-after-your-motor/",

  // Travel articles:
  "https://origin-news-www.thesun.co.uk/travel/6640249/secret-hidden-public-gardens-britains-cities/",

  // Tech articles:
  "https://origin-news-www.thesun.co.uk/tech/6654504/facebook-quiz-app-data-leak-cambridge-analytica-scandal/",

  // Dear Diedre articles:
  "https://origin-news-www.thesun.co.uk/dear-deidre/6650585/ex-using-me-for-sex/"
];

const template = createTemplate(`
const captureHtml = require("../support/capture-html");

const url = "<%= url %>";

captureHtml(url);
`);

urls.forEach(url => {
  const slug = slugify(url);

  fs.writeFileSync(`cypress/integration/${slug}.spec.js`, template({ url }), {
    encoding: "utf8"
  });
});
