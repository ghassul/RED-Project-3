$(function () {

    var pagination_link = '';
    var $imageList = $('<ul class="image-list"></ul>');
    var i = 0;

    $('.loading_gif').toggle(false);


    function imgagePopulator(imgInput) {


//<a href="images/image-1.jpg" data-lightbox="image-1" data-title="My caption">Image #1</a>

        $.ajax({
                method: 'GET',
                dataType: 'jsonp',
                url: imgInput
            })

            .done(function (data) {
                console.log(data);

                pagination_link = (data.pagination.next_url);

                $.each(data.data, function (key, value) {
                    i++;

                    var listItems = '';
                    listItems += "<li><img src=\'";
                    listItems += value.images.standard_resolution.url + "\' class='content_image'>";
                    listItems += "<div class='pic_footer'>" + "<img src=\'" + value.user.profile_picture + "\' class='profile_picture'>";
                    listItems += "<div class='pic_info'><span class='user_name'>" + value.user.username + "</span>";
                    listItems += "<div class='comment_likes'>";
                    listItems += "<span class='comments'><i class='fa fa-comments'></i>" + value.comments.count + "</span>";
                    listItems += "<span><i class='fa fa-heart'></i>" + value.likes.count + "</span></div></div>";

                    listItems += "</div></li>";


                    $imageList.append(listItems);


                });

                $('.imageListWrapper').append($imageList);
                $('.loading_gif').toggle(false);
                $('.load_more_btn').append("<button type=submit class='load_more'>Load more</button>");


            });


    }





    $('.instagram-searcher').on('submit', function(event) {
        event.preventDefault();
        $('.imageListWrapper').empty();
        $('.load_more_btn').empty();
        $('.loading_gif').toggle(true);
        $imageList.empty();

        var formInput = $('input').val();
        var searchInput = "https://api.instagram.com/v1/tags/" + formInput
            + "/media/recent?count=12&client_id=e7c23d1d42974762a329e5dfc09ff86f";

        imgagePopulator(searchInput);

            });




    $('.load_more_btn').on('click', function(event) {
        event.preventDefault();
        $('.load_more_btn').empty();
        $('.loading_gif').toggle(true);
        console.log(pagination_link);

        imgagePopulator(pagination_link);
    });




9



});