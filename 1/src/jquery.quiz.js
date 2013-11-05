/*
 * Plugin
 * 
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

;(function ( $, window, document, undefined ) {
 
    var pluginName = "quiz",
        defaults = {
            currentQuestion: 0,
            totalScore: 0
        };
 
    function Quiz( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }
 
    Quiz.prototype.init = function () {
        var obj = this,
            objOptions = this.options;

        $(document).on('click.quiz', 'li.quiz-answers', function() {
          //console.log(obj);
          objOptions.totalScore += $(this).find('input:radio').val() - 0;

          if (obj.next() === false) {
            $(obj.element).trigger('quiz.done', {total: obj.options.totalScore});
            obj.destroy();
          } 
        });

        this.next();
      };

    Quiz.prototype.next = function () {
        var obj = this,
            objOptions = this.options;

       
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

        $(obj.element).html(htmlItem);

        return true;
    }

     Quiz.prototype.destroy = function () {
        $(this.element).off('click.quiz');
     }
 
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Quiz( this, options ));
            }
        });
    }
 
})( jQuery, window, document );





/*(function ($) {

  // Static method.
  $.quiz = function (options) {
    options = $.extend({}, $.quiz.options, options);
  };

  $.quiz.options = {
    currentQuestion: 0,
    totalScore: 0
  };

  // Static method default options.
  $.quiz.start = function(items) {
     var obj = this.options;
      obj.questions = items || [];

      $(document).on('click.quiz', 'li.quiz-answers', function() {
        //console.log(obj);
        obj.totalScore += $(this).find('input:radio').val() - 0;

        if ($.quiz.next() === false) {
          $(document).trigger('quiz.done');
          $.quiz.destroy();
        } 
      });

      $.quiz.next();
  };

  $.quiz.next = function() {
    var obj = $.quiz.options;

    if (obj.currentQuestion >= obj.questions.length) {
      return false;
    }
    var item = obj.questions[obj.currentQuestion++];
    var answers = [];

    for (var i=0, l=item.answers.length; i < l; i++ ) {
      if (item.points[i] != undefined && item.answers[i] != undefined ) {
        answers.push( $('<li>').attr('class', 'quiz-answers').html('<label><input type="radio" name="answers" value="'+item.points[i]+'">' + item.answers[i] + '</label>') )
      }
    }

    var ul = $('<ul>').append(answers);

    var htmlItem = $('<div>').attr({'class': 'quiz-items'}).html("<h3>"+item.question+"</h3>").append(ul);

    $('body').html(htmlItem);
    return true;
  };

  $.quiz.destroy = function() {
      $(document).off('click.quiz');
  }


  

}(jQuery));
*/