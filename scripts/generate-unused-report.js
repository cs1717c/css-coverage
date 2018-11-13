const execa = require("execa");
const fs = require("fs-extra");
const R = require("ramda");

const selectorRegex = /[ \t]+\|[ \t]+([^\n]+)/g;

const result = execa.sync("node", ["scripts/utils/purify"]).stdout;

let match;
const selectors = [];

while ((match = selectorRegex.exec(result))) {
  selectors.push(match[1]);
}

const uniqueSelectors = R.uniq(selectors);

fs.writeFileSync("unused-report", R.uniq(selectors).join("\n"), {
  encoding: "utf8"
});
