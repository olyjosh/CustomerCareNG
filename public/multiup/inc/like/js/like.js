jQuery(document).ready(function($){
	/*---- Ajax rating ----*/
	$(document).on('click', '.rst-like', function(e){
		t = $(this);
		postID = t.attr('data-id');
		if( t.attr('data-disable') == undefined ) t.attr('data-disable',0);
		t.attr('data-disable',parseFloat(t.attr('data-disable')+1));
		if( parseFloat(t.attr('data-disable')) == 1 ){
			$.ajax({
				type: "POST",
				url: ajax.url,
				data: { 
					'action' : 'rst_ajax_like',
					'postID' : postID
				}
			}).done(function(data){
				t.parents('.wrap-like').html($(data).html());
				setCookie('rst_cookie_rating_'+postID,1,99);
			});
		}
		e.preventDefault();
	});
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}