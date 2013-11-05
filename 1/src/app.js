var APP = APP || {};



APP.init = function(option) {
	$(document).on('quiz.done', function() {
		$.resShow($.quiz.options.totalScore)
	});

	$.getJSON( option.quizUrl, function( data ) {
		$.quiz.start(data);
	});
}