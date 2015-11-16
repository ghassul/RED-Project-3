'use strict';

var _utils = require('./utils/utils.js');

$(function () {

    var $loadMore = $('.load_more_btn'),
        $loadingGif = $('.loading_gif');

    $loadingGif.toggle(false); //Hide loading gif

    // Search bar/button
    $('.instagram-searcher').on('submit', function (event) {
        event.preventDefault();

        var formInput = $('input').val(),
            // Grab search bar input
        searchInput = "https://api.instagram.com/v1/tags/" + formInput // Construct API url
         + "/media/recent?count=12&client_id=e7c23d1d42974762a329e5dfc09ff86f";

        $('.imageListWrapper').empty(); // Delete all searched content
        $loadMore.empty(); // Remove load more button
        $loadingGif.toggle(true); // Show loading gif
        _utils.$imageList.empty(); // Clear <ul> variable

        (0, _utils.imagePopulator)(searchInput); // Run imagePopulator function passing in searched value
    });

    // Load more button
    $loadMore.on('click', function (event) {
        event.preventDefault();

        $loadMore.empty(); // Remove load more button
        $loadingGif.toggle(true); // Show loading gif

        (0, _utils.imagePopulator)(paginationLink); // Run imagePopulator function passing in pagination link
    });
});

//# sourceMappingURL=main-compiled.js.map