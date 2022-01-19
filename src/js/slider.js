$(document).ready(function(){
	var owl = $('#slider');
	owl.owlCarousel({
		items:1,
		margin:0,
		loop:true,navText: ['', ''],
		dots:true,
		nav:true,
		autoplay:false,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
	});	
});