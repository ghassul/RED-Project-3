//Populates image section, takes input of a URL
class ImagePopulator  {

    constructor(){
        this.paginationLink = '';
        this.$imageList = $('<ul class="image-list"></ul>');
    }

    clearImageList(){
        this.$imageList.empty();
    }

    populateImages(imgInput){
        var i = 0;

        $.ajax({
                method: 'GET',
                dataType: 'jsonp',
                url: imgInput //Inputted URL
            })

            .done(data => {

                this.paginationLink = (data.pagination.next_url); //Grab pagination link for load more button

                $.each(data.data, (key, value) => {
                    i++; //Iterator for lightbox data

                    //Declare image and username variables to make slightly more readable
                    var contentImage = value.images.standard_resolution.url,
                        userName = value.user.username,
                        profilePicture = value.user.profile_picture,
                        commentCount = value.comments.count,
                        likesCount = value.likes.count,

                        listItems = `
                        <li>
                            <a href='${contentImage}' data-lightbox='image-${i}'>
                                <img src='${contentImage}' class='content_image'>
                            </a>
                            <div class='pic_footer'>
                                <img src='${profilePicture}' class='profile_picture'>
                                <div class='pic_info'>
                                    <a href='https://instagram.com/${userName}' class='user_name'>${userName}</a>
                                    <div class='comment_likes'>
                                        <span class='comments'><i class='fa fa-comments'></i>${commentCount}</span>
                                        <span><i class='fa fa-heart'></i>${likesCount}</span>
                                    </div>
                                </div>
                            </div>
                        </li>`;

                    this.$imageList.append(listItems); // Append all above HTML to global .image-list variable
                });

                $('.imageListWrapper').append(this.$imageList); // Append .image-list (<ul>) to page
                $('.loading_gif').toggle(false); // Hide loading gif
                $('.load_more_btn').append("<button type=submit class='load_more'>Load more</button>"); // Create load more button
            });
    }
}

module.exports = new ImagePopulator();