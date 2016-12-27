$(document).ready(function() {
	$(".search-icon").on("click", function() {
		$(this).addClass("hidden");
		var $searchField = $(".wiki-search-field");
		$searchField.removeClass("hidden");
		requestAnimationFrame(function() {
			$searchField.addClass("wide-search-field");
		});
	})
});