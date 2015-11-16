'use strict';

var paginationLink = '';
var $imageList = $('<ul class="image-list"></ul>');
var i = 0;

//Populates image section, takes input of a URL
function imagePopulator(imgInput) {

    $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        url: imgInput //Inputted URL
    }).done(function (data) {

        paginationLink = data.pagination.next_url; //Grab pagination link for load more button

        $.each(data.data, function (key, value) {
            i++; //Iterator for lightbox data

            //Declare image and username variables to make slightly more readable
            var contentImage = value.images.standard_resolution.url,
                userName = value.user.username,
                profilePicture = value.user.profile_picture,
                commentCount = value.comments.count,
                likesCount = value.likes.count,
                listItems = '\n                        <li>\n                            <a href=\'' + contentImage + '\' data-lightbox=\'image-' + i + '\'>\n                                <img src=\'' + contentImage + '\' class=\'content_image\'>\n                            </a>\n                            <div class=\'pic_footer\'>\n                                <img src=\'' + profilePicture + '\' class=\'profile_picture\'>\n                                <div class=\'pic_info\'>\n                                    <a href=\'https://instagram.com/' + userName + '\' class=\'user_name\'>' + userName + '</a>\n                                    <div class=\'comment_likes\'>\n                                        <span class=\'comments\'><i class=\'fa fa-comments\'></i>' + commentCount + '</span>\n                                        <span><i class=\'fa fa-heart\'></i>' + likesCount + '</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </li>';

            $imageList.append(listItems); // Append all above HTML to global .image-list variable
        });

        $('.imageListWrapper').append($imageList); // Append .image-list (<ul>) to page
        $('.loading_gif').toggle(false); // Hide loading gif
        $('.load_more_btn').append("<button type=submit class='load_more'>Load more</button>"); // Create load more button
    });
}

module.exports = {
    imagePopulator: imagePopulator,
    paginationLink: paginationLink,
    $imageList: $imageList
};

//# sourceMappingURL=utils-compiled.js.map