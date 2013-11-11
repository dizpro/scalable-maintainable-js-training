var APP = APP || {};
 
// module-literal
APP.rez = (function (APP, $, undefined) {
    
    return {
        
        // public vars and methods
        show: function () {
            console.log(arguments);
            var total = arguments[0].total,
            	el = arguments[0].el;

            var result = '<p class="result">Your result is <b>' + total + '</b></p>';

    		el.html(result);
        }
    
    };
 
})(APP, jQuery);


