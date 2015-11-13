$(function () {

    //Declare variables
    var pagination_link = '';
    var $imageList = $('<ul class="image-list"></ul>');
    var i = 0;

    $('.loading_gif').toggle(false); //Hide loading gif

    //Populates image section, takes input of a URL
    function imagePopulator(imgInput) {

        $.ajax({
            method: 'GET',
            dataType: 'jsonp',
            url: imgInput //Inputted URL
        }).done(function (data) {

            pagination_link = data.pagination.next_url; //Grab pagination link for load more button

            $.each(data.data, function (key, value) {
                i++; //Iterator for lightbox data

                //Declare image and username variables to make slightly more readable
                var contentImage = value.images.standard_resolution.url;
                var userName = value.user.username;

                var listItems = ''; //Declare empty string
                listItems += "<li><a href='" + contentImage + "' data-lightbox='image-" + i + "'><img src=\'"; // <li><a (lightbox data)><img>
                listItems += contentImage + "\' class='content_image'></a>"; // (ImageURL)</a>
                listItems += "<div class='pic_footer'>"; // <div (picFooter)>
                listItems += "<img src=\'" + value.user.profile_picture + "\' class='profile_picture'>"; // <img (ProfilePicURL)/>
                listItems += "<div class='pic_info'>"; // <div (picInfo)>
                listItems += "<a href='https://instagram.com/" + userName + "' class='user_name'>" + userName + "</a>"; // <a (link to user)> userName </a>
                listItems += "<div class='comment_likes'>"; // <div (commentLikes)>
                listItems += "<span class='comments'><i class='fa fa-comments'></i>" + value.comments.count + "</span>"; // <span><i (comments icon)></i> (# of comments) </span>
                listItems += "<span><i class='fa fa-heart'></i>" + value.likes.count + "</span>"; // <span><i (likes icon)></i> (# of likes) </span>
                listItems += "</div></div></div></li>"; // </div (commentLikes)></div (picInfo)></div (picFooter)></li>

                $imageList.append(listItems); // Append all above HTML to global .image-list variable
            });

            $('.imageListWrapper').append($imageList); // Append .image-list (<ul>) to page
            $('.loading_gif').toggle(false); // Hide loading gif
            $('.load_more_btn').append("<button type=submit class='load_more'>Load more</button>"); // Create load more button
        });
    }

    // Search bar/button
    $('.instagram-searcher').on('submit', function (event) {
        event.preventDefault();
        $('.imageListWrapper').empty(); // Delete all searched content
        $('.load_more_btn').empty(); // Remove load more button
        $('.loading_gif').toggle(true); // Show loading gif
        $imageList.empty(); // Clear <ul> variable

        var formInput = $('input').val(); // Grab search bar input
        var searchInput = "https://api.instagram.com/v1/tags/" + formInput // Construct API url
         + "/media/recent?count=12&client_id=e7c23d1d42974762a329e5dfc09ff86f";

        imagePopulator(searchInput); // Run imagePopulator function passing in searched value
    });

    // Load more button
    $('.load_more_btn').on('click', function (event) {
        event.preventDefault();
        $('.load_more_btn').empty(); // Remove load more button
        $('.loading_gif').toggle(true); // Show loading gif

        imagePopulator(pagination_link); // Run imagePopulator function passing in pagination link
    });
});