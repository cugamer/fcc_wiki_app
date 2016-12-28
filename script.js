$(document).ready(function() {
	$(".search-icon").on("click", function() {
		$(this).addClass("hidden");
		var $searchField = $("#wiki-search-field");
		$searchField.removeClass("hidden");
		requestAnimationFrame(function() {
			$searchField.addClass("wide-search-field");
			$(".x-cont").addClass("x-cont-move");
			$(".bar-one").addClass("bar-one-move");
			$(".bar-two").addClass("bar-two-move");
		});
		document.getElementById("wiki-search-field").focus();
	});

	$(".x-cont").on("click", function() {
		alert("hello, world");
	});
});