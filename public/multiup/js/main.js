//
// This is The Scripts used for Simply Theme
//

// Custom map Google
if ( jQuery('#cd-google-map').length != 0 )
{
	var rs_address = jQuery('#cd-google-map').attr('data-address');
	var rs_location_x = rs_address.substring(0, rs_address.indexOf(",")); 
	var rs_location_y = rs_address.substring(rs_address.indexOf(",")+1);
	
	var rs_zoom = jQuery('#cd-google-map').attr('data-zoom');
	
	rs_zoom = '0' + rs_zoom;
	rs_zoom = parseFloat(rs_zoom);
	
	if( rs_zoom == '' ) rs_zoom = 16;
	
	var rs_icon = jQuery('#cd-google-map').attr('data-icon');
	
	var rs_label = jQuery('#cd-google-map').attr('data-label');
	
	// set google maps parameters
	var latitude = rs_location_x,
		longitude = rs_location_y,
		map_zoom = rs_zoom;	
	var marker_url = rs_icon;
	
	//set google map options
	var map_options = {
		center: new google.maps.LatLng(latitude, longitude),
		zoom: map_zoom,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		//styles: style,
	}
	
	//inizialize the map
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
	
	//add a custom marker to the map				
	var marker = new MarkerWithLabel({
		position: new google.maps.LatLng(latitude, longitude),
		map: map,
		visible: true,
		icon: marker_url,
		labelContent: rs_label,
		labelAnchor: new google.maps.Point(-50, 55),
		labelClass: "rst-labels", // the CSS class for the label
	});
	
}
		
function main() {

(function () {
   'use strict'
	//Script
	//-----------------------------------
    jQuery(document).ready(function($){
		$ = jQuery;
		
		new WOW().init();
		
		var s = skrollr.init({
            forceHeight: false
        });
		// disable skrollr if using handheld device
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			skrollr.init().destroy();
		}
		
		var max_height = 0;
		if( $('.rst-blog .rst-blog-excerpt.rst-blog-info').length ) {
			$('.rst-blog .rst-blog-excerpt.rst-blog-info').each(function(){
				if( $(this).height() > max_height ) {
					max_height = $(this).height();
				}
			});
		}
		$('.rst-blog .rst-blog-excerpt.rst-blog-info').height(max_height);
		
		jQuery('.vc_row').addClass('clearfix');
		jQuery('.rst-remove').remove();
		
		//Progress Bar
		$('.progress-bar').each(function(i) {
			$(this).appear(function() {
				var percent = $(this).attr('aria-valuenow');
				$(this).animate({'width' : percent + '%'});
				$(this).find('span').countTo({from: 0, to: percent, speed: 2500, refreshInterval: 30});
			});
		});	
		
		//Scroll To Top
		jQuery('.rst-uptop').click(function(e){
			e.preventDefault();
			jQuery('html, body').animate({scrollTop:0}, 'slow');
		});
		
		// Scroll Down
		jQuery('.rst-scroll-down a').click(function(e){
			e.preventDefault();
			if( $(this).parents('.wpb_row').next().offset().top ) {
				var offsettop = $(this).parents('.wpb_row').next().offset().top - 38;
				jQuery('html, body').animate({
					scrollTop: offsettop,
				}, 'slow');
			}
		});
		
		
		jQuery('.filter').click(function(e){	
			e.preventDefault();
			var data = jQuery(this).attr('data-filter');
			jQuery('.rst-portfolio-list').isotope({
			  itemSelector: '.rst-portfolio',
			  filter: data,
			});
		});
		jQuery('.rst-portfolio-cat li a').click(function(e){
			e.preventDefault();
			jQuery('.rst-portfolio-cat li').removeClass('active');
			jQuery(this).parent().addClass('active');
		});
		
		// Menu moblie click
		jQuery('.rst-menu-mobile').click(function(){
			jQuery('.rst-header-menu nav > ul').stop(true,false).slideToggle(400);
		});
		
		
		// Search Form Click
		jQuery('.rst-header-search').click(function(e){
			e.preventDefault();
			jQuery('.rst-dropsearch').addClass('fadeInDownMenu');
		});
		jQuery('.rst-dropsearch .container > a').click(function(e){
			e.preventDefault();
			jQuery('.rst-dropsearch').removeClass('fadeInDownMenu');
		});
		
		// Owl slider
		jQuery(".owl-blogsingle").owlCarousel({
			items: 1,
			singleItem: true
		});
		jQuery(".owl-sidebar").owlCarousel({
			items: 1,
			singleItem: true,
			pagination: false,
			navigation: true,
			navigationText: ['<i class="pe-7s-angle-left"></i>','<i class="pe-7s-angle-right"></i>'],
		});
		jQuery("#owl-portfoliosingle").owlCarousel({
			items: 1,
			singleItem: true
		});
		jQuery(".rst-partner-carousel").owlCarousel({
			items: 5,
			pagination: false,
			loop:true,
			navigation: true,
			navigationText: ['<i class="pe-7s-angle-left"></i>','<i class="pe-7s-angle-right"></i>'],
		});
		
		jQuery(".owl-testimonialslider").owlCarousel({
			items: 1,
			singleItem: true,
			pagination: false,
			navigation: true,
			navigationText: ['<i class="pe-7s-angle-left"></i>','<i class="pe-7s-angle-right"></i>'],
		});
		
		// Fancybox
		jQuery('.fancybox-media').fancybox({
			type: 'iframe',
		});
		jQuery('.fancybox').fancybox({
		});
		
		// Count Up
		$('.counter').each(function() {
			if( $.isNumeric( $(this).text() ) ) {
				$(this).counterUp();
			}
		});
		
		// Change icon search
		search_icon();
		
		//RevSlider Check
		$('.revslides').parents('.rst-page-banner').addClass('hasSlider');
		
		// Team info
		jQuery('.rst-teamimg').click(function(){
			jQuery('.rst-teaminfo-hidden').css('display','none');
			jQuery(this).find('.rst-teaminfo-hidden').css('display','block');
			jQuery('.rst-teaminfo-close').css('display','none');
			jQuery(this).parent('.rst-team').find('.rst-teaminfo-close').css('display','block');
		});
		jQuery('.rst-teaminfo-close').click(function(){
			jQuery('.rst-teaminfo-hidden').css('display','none');
			jQuery(this).css('display','none');
		});
		
		//Check validate send mail
		if( jQuery("#contactForm").length ) {
			jQuery("#contactForm input,#contactForm textarea").jqBootstrapValidation({
				preventSubmit: true,
				submitError: function(jQueryform, event, errors) {
					// additional error messages or events
				},
				submitSuccess: function(jQueryform, event) {
					event.preventDefault(); // prevent default submit behaviour
					// get values from FORM
					var name = jQuery("input#name").val();
					var email = jQuery("input#email").val();
					var subject = jQuery("input#subject").val();
					var message = jQuery("textarea#message").val();
					var firstName = name; // For Success/Failure Message
					// Check for white space in name for Success/Fail message
					if (firstName.indexOf(' ') >= 0) {
						firstName = name.split(' ').slice(0, -1).join(' ');
					}
					jQuery.ajax({
						url: "././submit.php",
						type: "POST",
						data: {
							name: name,
							email: email,
							subject: subject,
							message: message
						},
						cache: false,
						success: function() {
							// Success message
							jQuery('#success').html("<div class='alert alert-success'>");
							jQuery('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
								.append("</button>");
							jQuery('#success > .alert-success')
								.append("<strong>Your message has been sent. </strong>");
							jQuery('#success > .alert-success')
								.append('</div>');

							//clear all fields
							jQuery('#contactForm').trigger("reset");
						},
						error: function() {
							// Fail message
							jQuery('#success').html("<div class='alert alert-danger'>");
							jQuery('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
								.append("</button>");
							jQuery('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
							jQuery('#success > .alert-danger').append('</div>');
							//clear all fields
							jQuery('#contactForm').trigger("reset");
						},
					})
				},
				filter: function() {
					return jQuery(this).is(":visible");
				}
			});
		}
		
	});
	
	
	jQuery(window).load(function() {
		jQuery('.gm-style > div > div:first-of-type').next().css({'background':'#000','opacity':'0.2'});
		if(jQuery('.rst-infoscroll').length > 0) {
			jQuery('.rst-infoscroll').mCustomScrollbar({});
		}
		
		// Filter
		jQuery('.rst-portfolio-list').isotope();
	});
	
	jQuery(window).resize(function() {
		if( jQuery(window).width() > 768 )
		{
			jQuery('.rst-header-menu nav > ul').css({'display' : 'inline-block','height' : 'auto'});
		}
		else
		{
		    jQuery('.rst-header-menu nav > ul').css('display','none');
		}
		search_icon();
	});
	
	function search_icon() {
		if( jQuery(window).width() < 769 )
		{
			jQuery('.rst-header-search i').attr('class','pe-7s-search');
		} else
		{
			jQuery('.rst-header-search i').attr('class','fa fa-search');
		}
	}
	
}());

}
main();