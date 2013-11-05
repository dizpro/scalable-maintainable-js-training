/*
 * Plugin
 * 
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

(function ($) {

  // Static method.
  $.quiz = function (options) {
    options = $.extend({}, $.quiz.options, options);
  };

  $.quiz.options = {
    currentQuestion: 0,
    totalScore: 0,
  };

  // Static method default options.
  $.quiz.start = function(items) {
      $.quiz.questions = items || [];

      $(document).on('click.quiz', 'li.quiz-answers', function() {
        $.quiz.options.totalScore += $(this).find('input:radio').val() - 0;

        if ($.quiz.next() === false) {
          $(document).trigger('quiz.done');
          $.quiz.destroy();
        } 
      });

      $.quiz.next();
  };

  $.quiz.next = function() {
    var quizOptions = $.quiz.options;

    if (quizOptions.currentQuestion >= $.quiz.questions.length) {
      return false;
    }
    var item = $.quiz.questions[quizOptions.currentQuestion++];
    var answers = [];

    for (var i=0, l=item.answers.length; i < l; i++ ) {
      if (item.points[i] != undefined && item.answers[i] != undefined ) {
        answers.push( $('<li>').attr('class', 'quiz-answers').html('<label><input type="radio" name="answers" value="'+item.points[i]+'">' + item.answers[i] + '</label>') )
      }
    }

    var ul = $('<ul>').append(answers);

    var htmlItem = $('<div>').attr({
      'class': 'quiz-items'
    }).html("<h3>"+item.question+"</h3>").append(ul);



    $('body').html(htmlItem);
    return true;
  };

  $.quiz.destroy = function() {
      $(document).off('click.quiz');
  }


  

}(jQuery));
