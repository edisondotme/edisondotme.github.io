// whoosh.js

// this is deprecated code that uses html imports
// var templatesImport = document.getElementById('templates');
// var templates = templatesImport.import;
// var clone = templates.getElementById('menu');
// document.getElementById('nav').appendChild(clone);

$(document).ready(function(){
	$("#loader").load("/pages/info.html");
	$("#nav").load("/pages/nav.html");
	setTimeout(function() {$("#content").load("/pages/info.html")}, 3000);
	;
});

function show_stuff() {
	$("#content").load("info.html");
}