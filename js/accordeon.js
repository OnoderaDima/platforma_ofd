/* Плагин для развёртывания строчки */
(function( $ ) {
    $.fn.accordionLoad = function() { 
        $.getJSON( "../list.json", function( data ) {
            var items = []; alert('here');
            $.each( data, function( key, val ) {
              items.push( "<li id='" + key + "'>" + val + "</li>" );
            });
           
            $( "<ul/>", {
              "class": "my-new-list",
              html: items.join( "" )
            }).appendTo( "body" );
          });        
    }

    $.fn.accordionDiploy = function() {
        if ($(this).hasClass('accordeon')) {

        }
    };
})(jQuery);