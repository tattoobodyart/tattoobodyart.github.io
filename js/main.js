var initialPoint = undefined;
var finalPoint = undefined;
var App = {};
App.info = undefined;
App.content = undefined;
App.elementHeader = undefined;
App.elementFooter = undefined;
App.elementMain = undefined;
App.elementArticle = undefined;
App.elementMainNavigation = undefined;
App.elementMainLeft = undefined;
App.elementMainRight = undefined;
App.elementMainHide = undefined;
App.elementLogoImage = undefined;
App.elementTitlePage = undefined;
App.elementInfoPage = undefined;
App.elementFooterInfo = undefined;
App.elementFooterRSS = undefined;
App.elementPrevPage = undefined;
App.elementHomePage = undefined;
App.elementNextPage = undefined;
App.elementSearch = undefined;
App.elementsPerPage = 4;
App.currentCountColumn = 4;
App.currentCountRow = 1;
App.dataStart = 0;
App.dataLimit = App.elementsPerPage;
App.dataAll = [];
App.maxSize = 0;
App.countScript = 0;
App.arrayScript = [];
App.preLoad = 0;
App.currentHash = "";
App.isPreLoadPageToCurrentHash = false;
App.isMainNavigationShow = false;
App.arraySearch = [];
App.phraseSearch = "";
App.dataPath = "";

function compareSearchReverse(itemA, itemB) {
	if (itemA.search > itemB.search) return -1;
	if (itemA.search < itemB.search) return 1;
}

function sortDataAll() {
	App.dataAll.sort(compareSearchReverse);
}

function getMaxSize() {
	App.maxSize = App.dataAll.length;
	sortDataAll();
	App.info.html('<p>' + App.maxSize + ' items</p>');
}

function addArrayToDataAll(array) {
	for (var i = 0; i < array.length; i++) {
		App.dataAll.push(array[i]);
	}
	App.countScript++;
}

function addDataToArrayScript(data) {
	var array = data.files;
	for (var i = 0; i < array.length; i++) {
		App.arrayScript.push('' + App.dataPath + array[i].file);
	}
	//App.arrayScript.reverse();
	for (var i = 0; i < App.arrayScript.length; i++) {
		//if (i == 1) {
		$.getScript(App.arrayScript[i], function () {
			getMaxSize();
			preLoadPageToCurrentHash();
			if (!App.isPreLoadPageToCurrentHash) {
				getHomePage();
			}
		}).fail(function(){
			App.countScript++;
		});
		break;
		//}
		//else {
		//	$.getScript(App.arrayScript[i]);
		//}
	}
}

function parseUrlQuery() {
	var currentSearch = {};
	if(window.location.search) {
		var pair = (window.location.search.substr(1)).split("&");
		for(var i = 0; i < pair.length; i ++) {
			var param = pair[i].split("=");
			currentSearch[param[0]] = param[1];
		}
	}
	return currentSearch;
}

function preLoadPageToCurrentHash() {

	currentSearch = parseUrlQuery();
	if (typeof currentSearch.item !== "undefined") {
		App.currentHash = currentSearch.item;

		var searchResult = App.dataAll.find(findCurrentHash);
		if (typeof searchResult !== "undefined") {

			var currentImage = searchResult.image;
			if (currentImage.toLowerCase().indexOf("alicdn.com".toLowerCase()) >= 0) {
				//currentImage = currentImage.replace(".jpg", ".jpg_80x80.jpg")
			}

			var currentUrl = new URL(location);
			currentUrl.hash = searchResult.search;
			currentUrl.search = "";

			var textContent = '';
			textContent += '<a href="' + searchResult.url + '" target="_blank"><h1>' + searchResult.title + '</h1></a>';
			textContent += '<ol class="item">';
			textContent += '<li><a id="' + searchResult.search + '" href="' + searchResult.link + '" target="_blank"><div class="img_wrapper"><img src="' + currentImage + '" title="' + searchResult.title + '" alt="' + searchResult.title + '"></div></a></li>';
			textContent += '</ol>';

			var textMain = '';
			textMain += '<header style="display:none;">';
			textMain += '</header>';
			textMain += '<div id="mainNavigation">';
			textMain += '<a href="' + currentUrl + '"><span id="mainLeft"></span></a>';
			textMain += '</div>';
			textMain += '<main style="top:42px;bottom:34px;">';
			textMain += '<article>';
			textMain += '<div id="content">' + textContent + '</div>';
			textMain += '</article>';
			textMain += '</main>';
			textMain += '<footer>';
			textMain += '<div id="footerPage">';			
			textMain += '<a href="http://tattoobodyart.github.io" target="_blank"><span id="footerInfo">Tattoo &amp; Body Art &copy; 2017</span></a>';
			textMain += '<a href="https://www.inoreader.com/feed/http://feeds.feedburner.com/feeds/tattoobodyart" target="_blank"><span id="footerRSS"></span></a>';
			textMain += '</div>';
			textMain += '</footer>';

			var textHTML = '';
			textHTML += '<!DOCTYPE html>\n';
			textHTML += '<html lang="en" dir="ltr" prefix="og: http://ogp.me/ns#">\n';
			textHTML += '	<head>\n';
			textHTML += '		<meta charset="utf-8" />\n';
			textHTML += '		<meta name="google-site-verification" content="RXBhFALKZsqfG8PU4PYoi0oXAVt8h9Zj9RqxuCajaSA" />\n';
			textHTML += '		<meta name="robots" content="all,index,follow,noodp" />\n';	
			textHTML += '		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />\n';
			textHTML += '		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />\n';			
			textHTML += '		<title>Tattoo &amp; Body Art - Buy ' + searchResult.title + '</title>\n';
			textHTML += '		<meta name="description" content="' + searchResult.title + '" />\n';
			textHTML += '		<meta name="keywords" content="Tattoo &amp; Body Art, ' + searchResult.title.split("  ").join(" ").split(" ").join(", ") + '" />\n';
			textHTML += '		<meta property="og:type" content="product" />\n';
			textHTML += '		<meta property="og:title" content="Tattoo &amp; Body Art" />\n';
			textHTML += '		<meta property="og:description" content="' + searchResult.title + '" />\n';
			textHTML += '		<meta property="og:image" content="' + searchResult.image + '" />\n';
			textHTML += '		<meta property="og:url" content="https://tattoobodyart.github.io/#' + searchResult.search + '" />\n';
			textHTML += '		<meta name="twitter:card" content="summary_large_image" />\n';
			textHTML += '		<meta name="twitter:site" content="@tattoobodyart01" />\n';
			textHTML += '		<link rel="canonical" href="https://tattoobodyart.github.io/#' + searchResult.search + '" />\n';
			textHTML += '		<link rel="shortcut icon" type="image/x-icon" href="ico/favicon.ico" />\n';			
			textHTML += '		<link rel="apple-touch-icon" sizes="180x180" href="ico/apple-touch-icon.png" />\n';
			textHTML += '		<link rel="icon" type="image/png" href="ico/favicon-32x32.png" sizes="32x32" />\n';
			textHTML += '		<link rel="icon" type="image/png" href="ico/android-chrome-192x192.png" sizes="192x192" />\n';
			textHTML += '		<link rel="icon" type="image/png" href="ico/favicon-16x16.png" sizes="16x16" />\n';
			textHTML += '		<link rel="manifest" href="ico/manifest.json" />\n';
			textHTML += '		<link rel="mask-icon" href="ico/safari-pinned-tab.svg" color="#ff1111" />\n';
			textHTML += '		<meta name="apple-mobile-web-app-capable" content="yes" />\n';
			textHTML += '		<meta name="apple-mobile-web-app-title" content="Tattoo &amp; Body Art" />\n';
			textHTML += '		<meta name="application-name" content="Tattoo &amp; Body Art" />\n';
			textHTML += '		<meta name="msapplication-TileColor" content="#ffffff" />\n';
			textHTML += '		<meta name="msapplication-TileImage" content="ico/mstile-144x144.png" />\n';
			textHTML += '		<meta name="msapplication-config" content="ico/browserconfig.xml" />\n';
			textHTML += '		<meta name="theme-color" content="#ffffff" />\n';
			textHTML += '		<link rel="alternate" type="application/rss+xml" title="RSS Feed for Tattoo &amp; Body Art" href="http://feeds.feedburner.com/feeds/tattoobodyart" />\n';
			textHTML += '		<link rel="stylesheet" href="css/main.css" />\n';
			textHTML += '		<script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");ga("create", "UA-93818330-1", "auto");ga("send", "pageview");</script>\n';
			textHTML += '	</head>\n';
			textHTML += '	<body>\n';
			textHTML += '		<div id="main">' + textMain + '</div>\n';
			textHTML += '		<script src="js/jquery-1.12.0.min.js"></script>\n';
			textHTML += '		<script src="js/load.js"></script>\n';
			textHTML += '	</body>\n';
			textHTML += '</html>\n';

			document.open();
			document.write(textHTML);
			document.close();
			App.isPreLoadPageToCurrentHash = true;
			return;

		} else {
			App.currentHash = (window.location.hash).replace("#", "").slice(0, 16);
		}

	} else {
		App.currentHash = (window.location.hash).replace("#", "").slice(0, 16);
	}

	if (App.currentHash !== "") {
		var searchResult = App.dataAll.find(findCurrentHash);
		if (typeof searchResult !== "undefined") {
			getElementsPerPage();
			App.dataStart = App.dataAll.indexOf(searchResult);
			App.dataLimit = App.dataStart + App.elementsPerPage;

			$("meta[name='description']").attr("content", searchResult.title);
			$("meta[name='keywords']").attr("content", "Tattoo &amp; Body Art, " + searchResult.title.split("  ").join(" ").split(" ").join(", "));
			$("meta[property='og\\:type']").attr("content", "product");
			$("meta[property='og\\:title']").attr("content", searchResult.title);
			$("meta[property='og\\:description']").attr("content", searchResult.title);
			$("meta[property='og\\:image']").attr("content", searchResult.image);
			$("meta[property='og\\:url']").attr("content", "https://tattoobodyart.github.io/#" + searchResult.search);
			$("meta[name='twitter\\:card']").attr("content", "summary_large_image");

			createPage(App.dataStart, App.dataLimit);
			App.isPreLoadPageToCurrentHash = true;
		}
	}
}

function preLoadPage() {
	/*
	if (App.countScript < App.arrayScript.length) {
		App.info.html('<p>Load data ' + (App.countScript / App.arrayScript.length * 100).toFixed(2) + '%</p>');
	}
	else {
		clearInterval(App.preLoad);
		getMaxSize();
		if (!App.isPreLoadPageToCurrentHash) {
			preLoadPageToCurrentHash();
		}
	}
	*/
}

function findCurrentHash(item) {
	return item.search == App.currentHash;
}

function createPage(dataStart, dataLimit) {
	App.content.html('');
	var textContent = '';
	textContent += '<ol class="items">';
	for (var i = dataStart; i < dataLimit; i++) {
		try {
			if (App.arraySearch.length > 0) {
				var item = App.arraySearch[i];
				App.maxSize = App.arraySearch.length;
			}
			else {
				var item = App.dataAll[i];
				App.maxSize = App.dataAll.length;
			}
			var currentImage = item.image;
			if (currentImage.toLowerCase().indexOf("alicdn.com".toLowerCase()) >= 0) {
				currentImage = currentImage.replace(".jpg", ".jpg_80x80.jpg")
			}
			textContent += '<li><a id="' + item.search + '" href="' + item.link + '" target="_blank"><div class="img_wrapper"><img class="lazy_load" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="' + currentImage + '" title="' + item.title + '" alt="' + item.title + '"></div></a></li>';
		}
		catch(err) {
			//console.log(err.toString());
			break;
		}
	}
	textContent += '</ol>';
	App.content.append(textContent);
	lazyLoad();
	if (App.arraySearch.length > 0) {
		App.info.html('<p>"<b>' + App.phraseSearch + '</b>" - ' + App.maxSize + ' items</p>');
	}
	else {
		App.info.html('<p>' + App.maxSize + ' items</p>');
	}
}

function imgLoaded(img){
	$(img).parent().addClass('loaded');
};

function lazyLoad(){
	var $images = $('.lazy_load');
	$images.each(function(){
		var $img = $(this);
		$img.on('load', imgLoaded($img[0])).attr('src', $img.attr('data-src')).attr('data-src', '');
	});
};

function openURL(href) {
	var a = document.createElement("a");
	a.href = href;
	a.target = "_blank";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function gettattoobodyartTwitterPage() {
	openURL("https://twitter.com/tattoobodyart01");
}

function gettattoobodyartPage() {
	openURL("https://goo.gl/vFftYE");
}

function getInfoPage() {
	openURL("http://tattoobodyart.github.io");
}

function getRSSPage() {
	openURL("https://www.inoreader.com/feed/http://feeds.feedburner.com/feeds/tattoobodyart");
}

function gettattoobodyartTelegramPage() {
	openURL("http://telegram.me/tattoobodyart01");
}

function getElementsPerPage() {
	var currentSize = 82;
	App.currentCountColumn = Math.floor(($(window).width() / currentSize)) || 4;
	App.currentCountRow = Math.floor($(window).height() / currentSize) || 1;
	var currentElementsPerPage = App.currentCountColumn * App.currentCountRow;
	if (App.isMainNavigationShow){
		currentElementsPerPage = currentElementsPerPage - (App.currentCountColumn * 1) || App.currentCountColumn;
	} else {
		currentElementsPerPage = currentElementsPerPage - (App.currentCountColumn * 3) || App.currentCountColumn;
	}
	App.elementsPerPage = currentElementsPerPage;
}

function reloadCurrentPage() {
	getElementsPerPage();
	App.dataLimit = App.dataStart + App.elementsPerPage;
	createPage(App.dataStart, App.dataLimit);	
}

function getPrevPage() {
	getElementsPerPage();
	App.dataStart = App.dataLimit - (2 * App.elementsPerPage);
	if (App.dataStart >= 0) {
		App.dataLimit = App.dataLimit - App.elementsPerPage;
	}
	else {
		App.dataStart = App.maxSize - App.elementsPerPage;
		App.dataLimit = App.maxSize;
	}
	createPage(App.dataStart, App.dataLimit);
}

function getHomePage() {
	getElementsPerPage();
	App.dataStart = 0;
	App.dataLimit = App.elementsPerPage;
	createPage(App.dataStart, App.dataLimit);
}

function getNextPage() {
	getElementsPerPage();
	App.dataStart = App.dataLimit;
	if (App.maxSize > App.dataStart) {
		App.dataLimit = App.dataLimit + App.elementsPerPage;
	}
	else {
		App.dataStart = 0;
		App.dataLimit = App.elementsPerPage;
	}
	createPage(App.dataStart, App.dataLimit);
}

function findToSearch(array, value) {
	App.arraySearch = [];
	if (value.length > 1) {
		var arrayValue = value.split(" ");
		for (var i = 0; i < array.length; i++) {
			var isSearch = true;
			for (var y = 0; y < arrayValue.length; y++) {
				if (array[i].title.toLowerCase().indexOf(arrayValue[y].toLowerCase()) < 0) {
					isSearch = false;
					break;
				}
			}
			if (isSearch){
				App.arraySearch.push(array[i]);			
			}
		}
	}
}

function clearFindToSearch() {
	getElementsPerPage();
	App.arraySearch = [];
	App.phraseSearch = "";
	App.maxSize = App.dataAll.length;
	App.dataStart = 0;
	App.dataLimit = App.elementsPerPage;
	createPage(App.dataStart, App.dataLimit);
}

function hideHeaderAndFooter() {
	App.isMainNavigationShow = true;
	App.elementMain.css({"top": "42px", "bottom": "0px"});
	App.elementMainNavigation.show();
	App.elementHeader.hide();
	App.elementFooter.hide();
	reloadCurrentPage();
}

function showHeaderAndFooter() {
	App.isMainNavigationShow = false;
	App.elementMain.css({"top": "160px", "bottom": "34px"});
	App.elementMainNavigation.hide();
	App.elementHeader.show();
	App.elementFooter.show();
	reloadCurrentPage();
}

function my_ga(a, b, c, d, e){
	ga(a, b, c, d, e);
}

$(document).ready(function () {

	//alert(window.location);

	var textMain = '';
	textMain += '<header>';
	textMain += '<div id="headerPage">';
	textMain += '<span id="logoImage"></span>';
	textMain += '<span id="titlePage">Tattoo &amp; Body Art</span>';
	textMain += '<span id="infoPage"></span>';
	textMain += '</div>';
	textMain += '<div id="navigation">';
	textMain += '<input id="search" name="search" type="text" placeholder="Search...">';
	textMain += '<div id="info"></div>';
	textMain += '<span id="prevPage"></span>&nbsp;&nbsp;&nbsp;<span id="homePage"></span>&nbsp;&nbsp;&nbsp;<span id="nextPage"></span>';
	textMain += '</div>';
	textMain += '</header>';
	textMain += '<div id="mainNavigation">';
	textMain += '<span id="mainLeft"></span>';
	textMain += '<span id="mainRight"></span>';
	textMain += '<span id="mainHide"></span>';
	textMain += '</div>';
	textMain += '<main>';
	textMain += '<article>';
	textMain += '<div id="content"></div>';
	textMain += '</article>';
	textMain += '</main>';
	textMain += '<footer>';
	textMain += '<div id="footerPage">';
	textMain += '<span id="footerInfo">Tattoo &amp; Body Art &copy; 2017</span>';
	textMain += '<span id="footerRSS"></span>';		
	textMain += '</div>';
	textMain += '</footer>';
	$("#main").html(textMain);

	App.info = $("#info");
	App.content = $("#content");
	App.elementHeader = $("header");
	App.elementFooter = $("footer");
	App.elementMain = $("main");
	App.elementArticle = $("article");
	App.elementMainNavigation = $("#mainNavigation");
	App.elementMainLeft = $("#mainLeft");
	App.elementMainRight = $("#mainRight");
	App.elementMainHide = $("#mainHide");
	App.elementLogoImage = $("#logoImage");
	App.elementTitlePage = $("#titlePage");
	App.elementInfoPage = $("#infoPage");
	App.elementFooterInfo = $("#footerInfo");
	App.elementFooterRSS = $("#footerRSS");
	App.elementPrevPage = $("#prevPage");
	App.elementHomePage = $("#homePage");
	App.elementNextPage = $("#nextPage");
	App.elementSearch = $("#search");

	App.elementMainNavigation.hide();

	$.getScript('' + App.dataPath + 'js/data/data.js', function () {
		//App.preLoad = setInterval(preLoadPage, 500);
		preLoadPage();
	});

	App.elementLogoImage.click(function () {
		gettattoobodyartTwitterPage();
		my_ga('send', 'event', 'gettattoobodyartTwitterPage', 'click', 'elementLogoImage');
	});

	App.elementTitlePage.click(function () {
		gettattoobodyartPage();
		my_ga('send', 'event', 'gettattoobodyartPage', 'click', 'elementTitlePage');
	});

	App.elementInfoPage.click(function () {
		hideHeaderAndFooter();
		my_ga('send', 'event', 'hideHeaderAndFooter', 'click', 'elementInfoPage');
	});

	App.elementFooterInfo.click(function () {
		getInfoPage();
		my_ga('send', 'event', 'getInfoPage', 'click', 'elementFooterInfo');
	});

	App.elementFooterRSS.click(function () {
		getRSSPage();
		my_ga('send', 'event', 'getRSSPage', 'click', 'elementFooterRSS');
	});

	App.info.click(function () {
		clearFindToSearch();
		//location.hash = '';
		//location.search = '';
		my_ga('send', 'event', 'clearFindToSearch', 'click', 'info: (' + App.maxSize + ' items)');
	});

	App.elementPrevPage.click(function () {
		getPrevPage();
		my_ga('send', 'event', 'getPrevPage', 'click', 'elementPrevPage');
	});

	App.elementHomePage.click(function () {
		getHomePage();
		my_ga('send', 'event', 'getHomePage', 'click', 'elementHomePage');
	});

	App.elementNextPage.click(function () {
		getNextPage();
		my_ga('send', 'event', 'getNextPage', 'click', 'elementNextPage');
	});

	App.elementSearch.change(function () {
		getElementsPerPage();
		App.phraseSearch = App.elementSearch.val();
		findToSearch(App.dataAll, App.phraseSearch);
		App.elementSearch.val("");
		App.elementSearch.blur();
		App.dataStart = 0;
		App.dataLimit = App.elementsPerPage;
		createPage(App.dataStart, App.dataLimit);
		//location.hash = '';
		//location.search = 'search=' + App.phraseSearch;
		my_ga('send', 'event', 'findToSearch', 'change', 'elementSearch: ("' + App.phraseSearch + '" - ' + App.maxSize + ' items)');
	});

	App.elementMainLeft.click(function () {
		getPrevPage();
		my_ga('send', 'event', 'getPrevPage', 'click', 'elementMainLeft');
	});

	App.elementMainRight.click(function () {
		getNextPage();
		my_ga('send', 'event', 'getNextPage', 'click', 'elementMainRight');
	});

	App.elementMainHide.click(function () {
		showHeaderAndFooter();
		my_ga('send', 'event', 'showHeaderAndFooter', 'click', 'elementMainHide');
	});

	document.addEventListener('click', function(e) {
		var target = e && e.target || event.srcElement;
		var currentAnchor = target.parentNode.parentNode;
		if (currentAnchor.tagName == "A") {
			//location.hash = currentAnchor.id;
			my_ga('send', 'event', 'item', 'click', currentAnchor.href);
		}
	});


	document.addEventListener('touchstart', function(event) {
		//event.preventDefault();
		//event.stopPropagation();
		initialPoint = event.changedTouches[0];
	});
	document.addEventListener('touchend', function(event) {
		//event.preventDefault();
		//event.stopPropagation();
		finalPoint = event.changedTouches[0];
		var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
		var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
		if (xAbs > 20 || yAbs > 20) {
			if (xAbs > yAbs) {
				if (finalPoint.pageX < initialPoint.pageX){
					getNextPage();
					my_ga('send', 'event', 'getNextPage', 'touchend', 'document');
					/*swipe left*/}
				else{
					getPrevPage();
					my_ga('send', 'event', 'getPrevPage', 'touchend', 'document');
					/*swipe right*/}
			}
			else {
				if (finalPoint.pageY < initialPoint.pageY){
					/*swipe up*/}
				else{
					/*swipe down*/}
			}
		}
	});


});

$(document).keydown(function (eventObject) {
	if (eventObject.which == 37) {
		getPrevPage();
		my_ga('send', 'event', 'getPrevPage', 'keydown', 'document');
	}
	if (eventObject.which == 38 || eventObject.which == 36) {
		getHomePage();
		my_ga('send', 'event', 'getHomePage', 'keydown', 'document');
	}
	if (eventObject.which == 39) {
		getNextPage();
		my_ga('send', 'event', 'getNextPage', 'keydown', 'document');
	}
	if (eventObject.which == 112) {
		getInfoPage();
		my_ga('send', 'event', 'getInfoPage', 'keydown', 'document');
	}
});

$(window).resize(function() {
	reloadCurrentPage();
	my_ga('send', 'event', 'reloadCurrentPage', 'resize', 'window: (' + $(window).width() + 'x' + $(window).height() + ')');
});
