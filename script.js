$(document).ready( function () {
	load_image();
	get_bing_photo();
	$(window).resize( function () {
		resize();
	});
});

function get_bing_photo() {
	$.ajax({
		url: "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"
	}).done( function(data) {
		var image_url = 'http://www.bing.com/' + data.images[0].url;
		
		if (image_url !== localStorage.imageUrl) {
			$('#image').attr('src', image_url);
			localStorage.imageUrl = image_url;
			
			$('#image').load( function () {
				save_image();
				resize();
			});
		}
	});
}

function resize() {
	var image = $('#image');
	image.css({"height": "auto", "width": "auto"});
	
	var width = image[0].offsetWidth;
	var height = image[0].offsetHeight;
	
	var window_ratio = $(window).width() / $(window).height();
    var image_ratio = width / height;
    if (image_ratio <= window_ratio) {
    	image.css({width: $(window).width() + 'px'});
    } else {
    	image.css({height: $(window).height() + 'px'});
    }
    
    $('#image').css({'opacity': 1});
}

function save_image() {
	var image = document.getElementById('image');
	$(image).css({"height": "auto", "width": "auto"});
	
	var width = image.offsetWidth;
	var height = image.offsetHeight;
	
	var window_ratio = $(window).width() / $(window).height();
    var image_ratio = width / height;
    
	// Create an empty canvas element
	var canvas = document.createElement('canvas');
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	// Copy the image contents to the canvas
	var ctx = canvas.getContext('2d');
	
    if (image_ratio <= window_ratio) {
    	ctx.drawImage(image, 0, 0, $(window).width(), $(window).width() / image_ratio);
    } else {
    	ctx.drawImage(image, 0, 0, $(window).height() * image_ratio, $(window).height());
    }
    
	var dataURL = canvas.toDataURL('image/png');
	localStorage.clear();
	localStorage.currentImage = dataURL;
}

function load_image() {
	if (localStorage.currentImage) {
		$('#image').attr('src', localStorage.currentImage);
	}
}