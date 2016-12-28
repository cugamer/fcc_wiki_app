$(document).ready(function() {
	$(".search-icon").on("click", function() {
		$(this).addClass("hidden");
		var $searchField = $("#wiki-search-field");
		$searchField.removeClass("hidden");
		requestAnimationFrame(function() {
			$searchField.addClass("wide-search-field");
			addClosingXClasses();
		});
		document.getElementById("wiki-search-field").focus();
	});

	var narrowSearchField = function() {
		var $searchField = $("#wiki-search-field");
		$searchField.removeClass("wide-search-field");
		$searchField.addClass("narrow-search-field");
	}

	$(".x-cont").on("click", function() {
		removeClosingXClasses();
		narrowSearchField();
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
});