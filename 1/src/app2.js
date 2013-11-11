var APP = APP || {};



APP.init = function(option) {
	var i = 0, 
		modules = [];
	do {
		modules[i] = new APP.Quiz();
		modules[i].start(option[i]);
		i++;
	}
	while(i < option.length);

	
	APP.EventBus.bind('quiz.done', APP.rez.show);

}