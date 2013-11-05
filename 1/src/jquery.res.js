/*
 * Plugin
 * 
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

(function ($) {

  $.resShow = function() {
    //console.log(arguments, arguments[0].total);
    var result = '<p class="result">Your result is <b>' + arguments[0].total + '</b></p>';

    $('body').html(result);
  }


}(jQuery));
