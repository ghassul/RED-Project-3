
import ImagePopulator from './utils/utils.js'

$( () => {

    var $loadMore = $('.load_more_btn'),
        $loadingGif = $('.loading_gif');

    $loadingGif.toggle(false); //Hide loading gif

    // Search bar/button
    $('.instagram-searcher').on('submit', event => {
        event.preventDefault();

        var formInput = $('input').val(), // Grab search bar input
            searchInput = "https://api.instagram.com/v1/tags/" + formInput // Construct API url
            + "/media/recent?count=12&client_id=e7c23d1d42974762a329e5dfc09ff86f";

        $('.imageListWrapper').empty(); // Delete all searched content
        $loadMore.empty(); // Remove load more button
        $loadingGif.toggle(true); // Show loading gif
        ImagePopulator.clearImageList(); // Clear <ul> variable

        ImagePopulator.populateImages(searchInput); // Run imagePopulator function passing in searched value
    });

    // Load more button
    $loadMore.on('click', event => {
        event.preventDefault();

        $loadMore.empty(); // Remove load more button
        $loadingGif.toggle(true); // Show loading gif

        ImagePopulator.populateImages(ImagePopulator.paginationLink); // Run imagePopulator function passing in pagination link
    });
});