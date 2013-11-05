var APP = APP || {};



APP.init = function() {
	$(document).on('quiz.done', function() {
		//$.res.show();
		console.log('triggered', $.quiz.options.totalScore);
		$.resShow($.quiz.options.totalScore)
	});

	$.getJSON( "questions.json", function( data ) {
		console.log(data);
		$.quiz.start(data);
	});
}