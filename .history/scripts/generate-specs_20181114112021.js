const createTemplate = require("lodash.template");
const slugify = require("slugify");
const fs = require("fs-extra");

const baseUrl = "https://www-dev.uat-thesun.co.uk/";

const urls = [
    // ------ All test articles go here ------ //
     "news/139707/tracking-example/",
     "living/93014/static-article-for-visual-regression-automation-with-ads-do-not-amend/amp",
     "fabulous/6550741/pride-of-britain-awards-fashion-hits-misses-susanna-reid/",
     "fabulous/113565/celeb-death-hoax-timeline/",
     "news/6542692/boxout-visual-regression-test-do-not-amend-use-for-visual-regression/",
    "sport/57306/article-with-curated-rail/",
     "fabulous/108330/article-for-slyce-testing-not-in-fashion/",
     "news/6532912/article-en-francais-featured-video/?testmode=qavideo",
     "tvandshowbiz/53295/brightcove-featured-video/?testmode=qavideo",
     "tvandshowbiz/bizarre/86950/bizarre-live-blogs-article-with-teaser/?testmode=qavideo",
     "money/6532711/featured-video-for-visual-regression-do-not-amend",
     "dear-deidre/54060/featured-video-article-for-visual-regression-do-not-amend/",
     "motors/57622/featured-video-article-for-visual-regression-do-not-amend/",
     "tvandshowbiz/bizarre/53881/zoninator-1-with-app-vertical-1-section-and-no-landscape/",
     "fabulous/153309/thomas-the-aye-spy-tool/",
     "fabulous/45213/apple-news-featured-video-arun/",
    "dear-deidre/61393/test-dear-deidre/",
     "news-gossip/184828/headline-2/",
     "champions-league/187213/static-article-for-automation-without-any-ads-do-not-amend/",
    "sport/football/109289/englands-world-cup-2018-kit-will-reportedly-be-the-most-expensive-in-history-at-staggering-110/",
     "money/70650/test-images/",
     "money-2/35946/test-images/",
     "sport/6546259/test-hero-image-in-liveblog/",
     "motors/6532713/image-article-for-visual-regression-do-not-amend",
     "motors/54029/image-article-for-visual-regression-do-not-amend-2/",
     "motors/57234/image-article-for-visual-regression-do-not-amend-2/",
     "fabulous/143968/image-revealer-example/",
     "sport/119500/instagram-embed-article-do-not-amend-use-for-visual-regression/",
     "sport/54084/instagram-embed-article-for-visual-regression-do-not-amend/",
     "sport/57629/instagram-embed-article-for-visual-regression-do-not-amend/",
     "news/57229/static-article-for-visual-regression-automation-do-not-amend/",
     "dear-deidre/48965/static-article-for-automation-without-any-ads-do-not-amend/",
     "tech/science/120860/jamals-amazing-test/?testmode=lite",
     "news/133390/kates-pregnacy/",
     "news/135687/local-elections-030518/",
     "schedule",
     "dear-deidre/6532080/visual-regression-liveblog-embeds-do-not-modify/",
     "fabulous/54087/liveblog-article-for-visual-regression-do-not-amend/",
     "fabulous/57632/liveblog-article-for-visual-regression-do-not-amend-2/",
     "fabulous/109874/liveblog-for-visual-regression-do-not-amend-2/",
     "tvandshowbiz/bizarre/87012/hero-image-liveblog/",
     "news/100/chelsea-boss-jose-mourinho-is-not-special-one-any-more-says-harry-redknapp/?adunit=/25436805/none",
     "tvandshowbiz/bizarre/45588/hero-image-liveblog/",
     "money/118558/load-more-example/",
     "news/131419/inside-the-deadly-turf-war-between-travellers-and-locals-behind-hither-green-burglar-death-new/",
    "news/80745/good-morning-britain-fans-furious-as-part-time-piers-morgan-again-replaced-by-richard-madeley-and-susanna-reid/",
     "living/52955/test-bright-cove-new/",
     "living/52973/test-boxout-article-2/",
     "sport/football/68282/devs-opta-match-summary-test-comparison/",
     "sport/football/34123/devs-opta-match-summary-test-comparison/",
     "money/130086/oscars-2018-accordion-article-do-not-delete/",
     "tvandshowbiz/50388/playbuzz-testing-article-2/",
     "sport/126885/score-predictor-test-article/",
     "tvandshowbiz/3612/i-would-have-aborted-him-katie-price-admits-she-wouldnt-have-kept-son-harvey-if-she-had-known-about-his-disabilities/",
     "news/102334/new-hay-fever-vaccine-promises-to-end-the-misery-of-millions-and-could-be-available-in-3-years/",
     "fabulous/109886/rail-article-for-visual-regression-do-not-amend/",
     "fabulous/54074/rail-article-for-visual-regression-do-not-amend/",
     "fabulous/57624/rail-article-for-visual-regression-do-not-amend/",
     "news/121392/royal-wedding-timeline-article-fab-do-not-amend-use-for-visual-regression-new/",
     "news/57275/article-with-rails-4/",
     "news/53965/static-article-for-visual-regression-automation-do-not-amend/",
     "motors/118220/single-column-article-do-not-amend-use-for-visual-regression/",
     "news/54079/single-column-article-for-visual-regression-do-not-amend/",
     "news/57626/single-column-article-for-visual-regression-do-not-amend/",
     "sport/horseracing/",
     "living/53129/article-for-automation/",
     "living/93014/static-article-for-visual-regression-automation-with-ads-do-not-amend/?testmode=lite",
     "uncategorized/81215/diabetic-theresa-may-reveals-patch-which-monitors-her-blood-sugar-as-she-walks-the-red-carpet-at-awards-ceremony/",
     "motors/149483/new-swipe-required-elements-test-article-1/",
     "fabulous/horoscopes/113614/tarotscope-timeline-article/",
     "uncategorized/374216/calderon-in-dev/",
     "football/374278/testing-editors-burli-audio-access/",
     "football/373837/cristiano-ronaldo-injury-zinedine-zidane-refuses-put-time-frame-real-madrid-stars-return/",
     "football/bundesliga/374372/toms-amazing-test/",
     "index/",
     "football/374182/talky-mcsportyface-test-article/",
     "arhejwre",
    
    // ------ Page Sections  URL ------ //
     "football/",
     "football/premier-league/table/",
     "radio/schedule/",
     "sport/",
     "news/",
     "podcasts/",
     "competition-terms-conditions/",

    // ------ Status Code URL ------ //
     "tvandshowbiz/58/testing-404-redirect-url",        
     "tvandshowbiz/58/testing-404-redirect-url",
     "tv-showbiz/16/redirect-url-test-forbidden" ,  
     "tv-showbiz/16/redirect-url-test-forbidden" ,              
     "living/62/redirect-303-test" ,     
     "sport/football/48807/testing-article-dummy" ,         
     "redirect307test", 
     "sport/football", 
     "living/47/*",
     "/sport/",
];

const template = createTemplate(`
const captureHtml = require("../support/capture-html");

const url = "<%= url %>";

captureHtml(url);
`);

urls.forEach(shortUrl => {
  const url = baseUrl + shortUrl;


  const slug = slugify(shortUrl);
  console.log("Generating url "+url);


  fs.writeFileSync(`cypress/integration/${slug}.spec.js`, template({ url }), {
    encoding: "utf8"
  });
});
