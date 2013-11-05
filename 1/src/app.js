var APP = APP || {};



APP.init = function(option) {
	$(option.triggerEl).on('quiz.done', function(e, data) {
		$.resShow({total: data.total});
	});

	$.getJSON( option.quizUrl, function( data ) {
		$(option.triggerEl).quiz({ questions: data });
	});
}