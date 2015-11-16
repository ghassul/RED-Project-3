'use strict';

/******/(function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "js/";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {
	'use strict';

	var _utils = __webpack_require__(1);

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
			debugger;

			(0, _utils.imagePopulator)(paginationLink); // Run imagePopulator function passing in pagination link
		});
	});

	/***/
},
/* 1 */
/***/function (module, exports) {
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

	/***/
}
/******/]);

//# sourceMappingURL=main-compiled.js.map