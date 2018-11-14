const createTemplate = require("lodash.template");
const slugify = require("slugify");
const fs = require("fs-extra");

const urls = [
  {
    // ------ All base urls go here ------ //
    "customiserUrl":"https://www-dev.uat-thesun.co.uk/nu-wp-customiser/",
    "dreamTeamBaseUrl": "https://www-dev.uat-dreamteamfc.com/",
    "facebookBaseUrl": "https://www.facebook.com/",
    "facebookDebuggerUrl": "https://developers.facebook.com/tools/debug/sharing/",
    "irishSunBaseUrl": "https://www-dev.uat-thesun.ie/",
    "scottishSunBaseUrl": "https://www-dev.uat-thescottishsun.co.uk/",
    "scottishSunHeliosBaseUrl": "https://origin-news-www-dev.uat-thescottishsun.co.uk/",
    "scottishSunProdUrl": "https://www.thescottishsun.co.uk/",
    "theSunBaseUrl": "https://www-dev.uat-thesun.co.uk/",
    "theSunHeliosBaseUrl": "https://origin-news-www-dev.uat-thesun.co.uk/",
    "theSunProdUrl": "https://www.thesun.co.uk/",	
    "twitterBaseUrl": "https://twitter.com/",
    "talksportBaseUrl": "https://www-dev.uat-talksport.com/",
    "calypsoCmsDev": "http://nu-sun-pod-loaders-dev.s3-website-eu-west-1.amazonaws.com/",
    
    // ------ All test articles go here ------ //
    "aboutTalksportHeaderLink": "about/",
    "akamaiDebug": "info/debug",
    "accrdionTrackingTestArticle": "news/139707/tracking-example/",
    "ampArticle": "living/93014/static-article-for-visual-regression-automation-with-ads-do-not-amend/amp",
    "customiserTestArticle": "fabulous/6550741/pride-of-britain-awards-fashion-hits-misses-susanna-reid/",
    "celebDeathHoaxTestArticle": "fabulous/113565/celeb-death-hoax-timeline/",
    "boxOutTestArticle": "news/6542692/boxout-visual-regression-test-do-not-amend-use-for-visual-regression/",
    "curatedRailArticle" : "sport/57306/article-with-curated-rail/",
    "fabulousTestArticle": "fabulous/108330/article-for-slyce-testing-not-in-fashion/",
    "featuredVideoAds": "news/6532912/article-en-francais-featured-video/?testmode=qavideo",
    "featuredVideoArticle": "tvandshowbiz/53295/brightcove-featured-video/?testmode=qavideo",
    "featuredVideoPreRoll": "tvandshowbiz/bizarre/86950/bizarre-live-blogs-article-with-teaser/?testmode=qavideo",
    "featuredVideoForVisualRegression": "money/6532711/featured-video-for-visual-regression-do-not-amend",
    "featuredVideoForVisualRegressionScottish": "dear-deidre/54060/featured-video-article-for-visual-regression-do-not-amend/",
    "featuredVideoForVisualRegressionIrish": "motors/57622/featured-video-article-for-visual-regression-do-not-amend/",
    "featuredVideoWithSectionLogo": "tvandshowbiz/bizarre/53881/zoninator-1-with-app-vertical-1-section-and-no-landscape/",
    "featuredVideoWithSectionLogoVisualRegression": "fabulous/153309/thomas-the-aye-spy-tool/",
    "featuredVideoWithSectionLogoScottish": "fabulous/45213/apple-news-featured-video-arun/",
    "dearDeidreArticle":"dear-deidre/61393/test-dear-deidre/",
    "dreamTeamTestArticle": "news-gossip/184828/headline-2/",
    "dreamTeamTestArticleNoAds": "champions-league/187213/static-article-for-automation-without-any-ads-do-not-amend/",
    "footballArticle":"sport/football/109289/englands-world-cup-2018-kit-will-reportedly-be-the-most-expensive-in-history-at-staggering-110/",
    "galleryArticle": "money/70650/test-images/",
    "galleryArticleScottish": "money-2/35946/test-images/",
    "heroImageInLiveblogArticle": "sport/6546259/test-hero-image-in-liveblog/",
    "imageArticleVisualRegression": "motors/6532713/image-article-for-visual-regression-do-not-amend",
    "imageArticleVisualRegressionScottish": "motors/54029/image-article-for-visual-regression-do-not-amend-2/",
    "imageArticleVisualRegressionIrish": "motors/57234/image-article-for-visual-regression-do-not-amend-2/",
    "imageRevealerTestArticle": "fabulous/143968/image-revealer-example/",
    "instagramArticle": "sport/119500/instagram-embed-article-do-not-amend-use-for-visual-regression/",
    "instagramArticleScottish": "sport/54084/instagram-embed-article-for-visual-regression-do-not-amend/",
    "instagramArticleIrish": "sport/57629/instagram-embed-article-for-visual-regression-do-not-amend/",
    "irishSunTestArticle": "news/57229/static-article-for-visual-regression-automation-do-not-amend/",
    "irishSunTestArticleNoAds": "dear-deidre/48965/static-article-for-automation-without-any-ads-do-not-amend/",
    "jamalsTest": "tech/science/120860/jamals-amazing-test/?testmode=lite",
    "katesPregnancyTestArticle": "news/133390/kates-pregnacy/",
    "localElectionsTestArticle": "news/135687/local-elections-030518/",
    "listenAgainTalksportHeaderLink": "schedule",
    "liveblogEmbedArticle": "dear-deidre/6532080/visual-regression-liveblog-embeds-do-not-modify/",
    "liveblogEmbedArticleScottish": "fabulous/54087/liveblog-article-for-visual-regression-do-not-amend/",
    "liveblogEmbedArticleIrish": "fabulous/57632/liveblog-article-for-visual-regression-do-not-amend-2/",
    "liveblogVisualRegression": "fabulous/109874/liveblog-for-visual-regression-do-not-amend-2/",
    "liveblogWithSectionLogo": "tvandshowbiz/bizarre/87012/hero-image-liveblog/",
    "liveblogWithMoreButton": "news/100/chelsea-boss-jose-mourinho-is-not-special-one-any-more-says-harry-redknapp/?adunit=/25436805/none",
    "liveblogWithSectionLogoScottish": "tvandshowbiz/bizarre/45588/hero-image-liveblog/",
    "moneyConceptTestArticle": "money/118558/load-more-example/",
    "mapsTestArticle": "news/131419/inside-the-deadly-turf-war-between-travellers-and-locals-behind-hither-green-burglar-death-new/",
    "newsArticle":"news/80745/good-morning-britain-fans-furious-as-part-time-piers-morgan-again-replaced-by-richard-madeley-and-susanna-reid/",
    "noAdsArticle": "living/52955/test-bright-cove-new/",
    "noAdsNextSwipedArticle": "living/52973/test-boxout-article-2/",
    "optaWidgetArticle": "sport/football/68282/devs-opta-match-summary-test-comparison/",
    "optaWidgetArticleScottish": "sport/football/34123/devs-opta-match-summary-test-comparison/",
    "oscars2018TestArticle": "money/130086/oscars-2018-accordion-article-do-not-delete/",
    "playbuzzArticle": "tvandshowbiz/50388/playbuzz-testing-article-2/",
    "premPredictorTestArticle": "sport/126885/score-predictor-test-article/",
    "prodLikeCelebrityArticle": "tvandshowbiz/3612/i-would-have-aborted-him-katie-price-admits-she-wouldnt-have-kept-son-harvey-if-she-had-known-about-his-disabilities/",
    "prodLikeNewsArticle": "news/102334/new-hay-fever-vaccine-promises-to-end-the-misery-of-millions-and-could-be-available-in-3-years/",
    "railArticleForVisualRegression": "fabulous/109886/rail-article-for-visual-regression-do-not-amend/",
    "railArticleForVisualRegressionScottish": "fabulous/54074/rail-article-for-visual-regression-do-not-amend/",
    "railArticleForVisualRegressionIrish": "fabulous/57624/rail-article-for-visual-regression-do-not-amend/",
    "royalWeddingTimelineArticleFab": "news/121392/royal-wedding-timeline-article-fab-do-not-amend-use-for-visual-regression-new/",
    "sectionRailArticle": "news/57275/article-with-rails-4/",
    "scottishSunTestArticle": "news/53965/static-article-for-visual-regression-automation-do-not-amend/",
    "singleColumnArticle": "motors/118220/single-column-article-do-not-amend-use-for-visual-regression/",
    "singleColumnArticleScottish": "news/54079/single-column-article-for-visual-regression-do-not-amend/",
    "singleColumnArticleIrish": "news/57626/single-column-article-for-visual-regression-do-not-amend/",
    "sportHorseRacing": "sport/horseracing/",
    "sunHeliosTestArticle": "living/53129/article-for-automation/",
    "sunHeliosArticleWithAds": "living/93014/static-article-for-visual-regression-automation-with-ads-do-not-amend/?testmode=lite",
    "sunWpTestArticle": "uncategorized/81215/diabetic-theresa-may-reveals-patch-which-monitors-her-blood-sugar-as-she-walks-the-red-carpet-at-awards-ceremony/",
    "swipeRequiredElementsArticle": "motors/149483/new-swipe-required-elements-test-article-1/",
    "tarotscopeTestArticle": "fabulous/horoscopes/113614/tarotscope-timeline-article/",
    "talksportAudioArticle": "uncategorized/374216/calderon-in-dev/",
    "talksportBurlifeedArticle": "football/374278/testing-editors-burli-audio-access/",
    "talksportCristianoRonaldo": "football/373837/cristiano-ronaldo-injury-zinedine-zidane-refuses-put-time-frame-real-madrid-stars-return/",
    "talksportFacebook": "https://www.facebook.com/talkSPORT/",
    "talksportInstagram": "https://www.instagram.com/talksport/",
    "talksportITunesPodcast": "https://itunes.apple.com/us/podcast/id280556947",
    "talkSportNormalArticle": "football/bundesliga/374372/toms-amazing-test/",
    "talksportPodcastRSS": "http://rss.acast.com/hawksbeeandjacobs",
    "talksportTopicsPage": "index/",
    "talksportTwitter": "https://twitter.com/talkSPORT",
    "talksportVideoArticle": "football/374182/talky-mcsportyface-test-article/",
    "talksportYoutube": "https://www.youtube.com/talkSPORT", 
    "testmodeLite": "?testmode=lite",
    "testmode": "?adunit=/25436805/red&testmode=red250y50",
    "testmodeWorks": "?adunit=/25436805/testmode&testmode=testmodeworks",
    "tttChelseaArticle": "sport/football/6532119/ttt-chelsea/",
    "queryStringInvalid": "?testtttt=123",
    "404article": "arhejwre",
    
    // ------ Page Sections  URL ------ //
    "footballSection": "football/",
    "premierLeagueTable": "football/premier-league/table/",
    "radioScheduleSection": "radio/schedule/",
    "sportSection": "sport/",
    "newsSection": "news/",
    "podcasts": "podcasts/",
    "competitionTAndC": "competition-terms-conditions/",

    // ------ Status Code URL ------ //
    "404": "tvandshowbiz/58/testing-404-redirect-url",        
    "404redirect": "tvandshowbiz/58/testing-404-redirect-url",
    "403": "tv-showbiz/16/redirect-url-test-forbidden" ,  
    "403redirect": "tv-showbiz/16/redirect-url-test-forbidden" ,              
    "303": "living/62/redirect-303-test" ,     
    "303redirect": "sport/football/48807/testing-article-dummy" ,         
    "307": "redirect307test", 
    "307redirect": "sport/football", 
    "redirectURL": "living/47/*",
    "sport": "/sport/",

    // ------ Wordpress Stuff go here ------ //
    "wpLogin": "wp-login.php",
    "apiPostEndpoint": "wp-json/wp/v2/posts/",
    "sunSiteV1": "wp-json/thesun/v1/",
    "scottishSunV1": "wp-json/thescottishsun/v1/",
    "irishSunV1": "wp-json/theirishsun/v1/",
    "dreamTeamV1": "/wp-json/dreamteam/v1/",
    "talksportV1": "/wp-json/talksport/v1/",
    "wpEditArticle": "wp-admin/post.php?",

    // --- liveblog --- //
    "liveblogEdit": "wp-admin/edit.php?page=sunliveblogs&post=",
    "liveblogBackEnd": "wp-json/thesun/v1/liveblog/100?from=0000000000",
    "image": " https://www.thesun.co.uk/wp-content/uploads/2017/11/dd-composite-chiefs-ear.jpg?strip=all&w=689%E2%80%B3",
    "twitter": " https://twitter.com/Marie68920368/status/1049649347770634240"
}
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
