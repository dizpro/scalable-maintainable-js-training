 var APP = APP || {};
 
// module-"class" (constructor)
APP.Quiz = (function (APP, $, undefined) {
    
    return function () {
        // private variables and methods

        var defaults = {
            currentQuestion: 0,
            totalScore: 0
        };
        
        // public variables and methods

        this.start = function(options) {
          var obj = this,
            objOptions;

          objOptions = this.options = $.extend( {}, defaults, options);

           $.getJSON( objOptions.quizUrl, function( data ) {
              objOptions = $.extend(objOptions, { questions: data }) ;
              obj.init();
            });
        }

        this.init = function(){

            var obj = this,
                objOptions = obj.options,
                $el = $('#' + objOptions.quizEl);

            $el.on('click.' + objOptions.quizEl, 'li.quiz-answers', function() {

                objOptions.totalScore += $(this).find('input:radio').val() - 0;

                if (obj.next() === false) {
                  APP.EventBus.trigger('quiz.done', {total: objOptions.totalScore, el: $el});
                  obj.destroy();
                } 
            });

            obj.next();
        };

        this.next = function() {
          var obj = this,
              objOptions = obj.options,
              $el = $('#' + objOptions.quizEl);

       
          if (objOptions.currentQuestion >= objOptions.questions.length) {
            return false;
          }
          var item = objOptions.questions[objOptions.currentQuestion++];
          var answers = [];

          for (var i=0, l=item.answers.length; i < l; i++ ) {
            if (item.points[i] != undefined && item.answers[i] != undefined ) {
              answers.push( $('<li>').attr('class', 'quiz-answers').html('<label><input type="radio" name="answers" value="'+item.points[i]+'">' + item.answers[i] + '</label>') )
            }
          }

          var ul = $('<ul>').append(answers);

          var htmlItem = $('<div>').attr({'class': 'quiz-items'}).html("<h3>"+item.question+"</h3>").append(ul);

          $el.html(htmlItem);

          return true;
        };

        this.destroy = function() {
          var objOptions = this.options;
           $('#' + objOptions.quizEl).off('click.' + objOptions.quizEl);
        };


    };


}(APP, jQuery));

