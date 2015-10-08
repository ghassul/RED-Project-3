$(function () {

    $('.instagram-searcher').on('submit', function(event) {

        event.preventDefault();
        var formInput = $('input').val();
        var searchInput = "https://api.instagram.com/v1/tags/" + formInput
            + "/media/recent?client_id=e7c23d1d42974762a329e5dfc09ff86f";
        var i = 0;

            $('.image-list').empty();



        $.ajax({
            method: 'GET',
            dataType: 'jsonp',
            url: searchInput
        })

            .done(function(data) {
                console.log(data);

                $.each(data.data, function(key, value) {
                    //console.log(value);
                    i++;
                    if(data.data !== 0 && i < 13) {
                        console.log(value.images.thumbnail.url);
                        $('.image-list').append("<li><img src=\'" + value.images.thumbnail.url + "\'></li>")


                    }
                })
            })





    })







});