/*
 * Plugin
 * 
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

(function ($) {

  $.resShow = function() {
    var result = '<p class="result">Your result is <b>' + arguments[0] + '</b></p>';

    $('body').html(result);
  }


}(jQuery));
