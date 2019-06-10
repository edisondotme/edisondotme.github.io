// whoosh.js

$(document).ready(function(){
	// all jquery methods are supposed to go inside this function
	$("#nav").load("/pages/nav.html");
	// setTimeout(function() {$("#content").load("/pages/info.html")}, 3000);

	// wait .5 seconds, then execute function
	setTimeout(show_stuff, 500);

});

function show_stuff() {
	// loader
	$(".content").load("/pages/info.html");

}