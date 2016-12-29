$(document).ready(function() {
	var storedFieldVal = "";
	var currentResults = {};

	$(".search-icon").on("click", function() {
		$(this).addClass("hidden");
		var $searchField = $("#wiki-search-field");
		buildResultsDisplay(currentResults);
		$searchField.removeClass("hidden");
		requestAnimationFrame(function() {
			$searchField.addClass("wide-search-field");
			$searchField.val(storedFieldVal);
			addClosingXClasses();
		});
		document.getElementById("wiki-search-field").focus();
	});

	var narrowSearchField = function() {
		var $searchField = $("#wiki-search-field");
		storedFieldVal = $searchField.val();
		$searchField.val("");
		$searchField.removeClass("wide-search-field");
		$searchField.addClass("narrow-search-field");
	}

	$(".x-cont").on("click", function() {
		removeClosingXClasses();
		narrowSearchField();
		clearResultDisp();
		lowerConstent();
		setTimeout(function() {
			var $searchField = $("#wiki-search-field");
			var $searchIcon = $(".search-icon");
			$searchField.addClass("hidden");
			$searchIcon.removeClass("hidden");
		}, 2000);
	});

	addClosingXClasses = function() {
		var $xCont = $(".x-cont");
		var $barOne = $(".bar-one");
		var $barTwo = $(".bar-two");
		$xCont.addClass("x-cont-add");
		$xCont.removeClass("x-cont-remove");
		$barOne.addClass("bar-one-add");
		$barOne.removeClass("bar-one-remove");
		$barTwo.addClass("bar-two-add");
		$barTwo.removeClass("bar-two-remove");
	}

	removeClosingXClasses = function() {
		var $xCont = $(".x-cont");
		var $barOne = $(".bar-one");
		var $barTwo = $(".bar-two");
		$xCont.removeClass("x-cont-add");
		$xCont.addClass("x-cont-remove");
		$barOne.removeClass("bar-one-add");
		$barOne.addClass("bar-one-remove");
		$barTwo.removeClass("bar-two-add");
		$barTwo.addClass("bar-two-remove");
	}

	raiseConstent = function() {
		$('.constent-content').addClass("raised-constent");
		$('.constent-content').removeClass("lowered-constent");
	}

	lowerConstent = function() {
		$('.constent-content').addClass("lowered-constent");
		$('.constent-content').removeClass("raised-constent");
	}

	$(".wiki-search").on("submit", function(e) {
		e.preventDefault();
		var searchString = $("#wiki-search-field").val();
		getQueryTermMetadata(searchString);
	});

	createQueryTermPromise = function(term) {
		var queryURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=0&gsrsearch=" + term + "&gsrlimit=10&prop=extracts|info&callback=?";
		var jQuerySTPromise = $.getJSON(queryURL);
		return Promise.resolve(jQuerySTPromise);
	}

	createQueryIdPromise = function(ids) {
		var termstring;
		Array.isArray(ids) ? termString = ids.join("|") : teamString = ids
		var queryURL = "https://en.wikipedia.org/w/api.php?action=query&exintro=false&explaintext=&format=json&exlimit=10&pageids=" + termString + "&prop=extracts|info&inprop=url&callback=?"
		var jQueryIDPromise = $.getJSON(queryURL);
		return Promise.resolve(jQueryIDPromise);
	}

	getQueryTermMetadata = function(term) {
		createQueryTermPromise(term).then(function(res) {
			if(res.query) {
				var queryPages = res.query.pages;
				var pageIDs = Object.keys(queryPages);
				return pageIDs;
			}
		}).then(function(res) {
			if(res) {
				createQueryIdPromise(res).then(function(res2) {
					var filteredData = filterDataResults(res2);
					buildResultsDisplay(filteredData)
					// for (var item in filteredData) {
						// createResultDispBox(filteredData[item]);
					// }
				})
			} else {
				console.log("No results");
			}			
		});
	}

	filterDataResults = function(data) {
		var output = {};
		for (var item in data.query.pages) {
			output[item] = {
				pageURL: data.query.pages[item].canonicalurl,
				title:   data.query.pages[item].title,
				extract: shortenExtract(data.query.pages[item].extract)
			};
		}
		currentResults = output;
		return output;
	}

	shortenExtract = function(str) {
		var maxLength = 85
		var shortened = str.slice(0, maxLength)
		return str.length > maxLength ?  shortened + "..." : shortened;
	}

	buildResultsDisplay = function(filteredData) {
		if(Object.size(filteredData) > 0) {
			raiseConstent();
		}
		for (var item in filteredData) {
			createResultDispBox(filteredData[item]);
		}
	}

	createResultDispBox = function(data) {
		var $searchResults = $(".search-results");
		var title = '<h3 class="result-title">' + data.title + '</h3>';
		var extract = '<p>' + data.extract + '</p>';
		var htmlString = '<a href="' + data.pageURL + '" target=_"blank" class="result-box">' +
							title +
							extract +
							'</a>';
		$searchResults.append(htmlString)
	}

	Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

	clearResultDisp = function() {
		var $searchResults = $(".search-results");
		$searchResults.empty();
	}
});