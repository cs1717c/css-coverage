const purify = require("purify-css");
const fs = require("fs-extra");

var content = ["**/html/**/*.html"];
var css = ["**/stylesheets/*.css"];

var options = {
  // we don't care about this
  output: "./tmp/foo.css",

  // Will minify CSS code in addition to purify.
  minify: true,

  // Logs out removed selectors.
  rejected: true
};

purify(content, css, options);
