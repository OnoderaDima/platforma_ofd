/* Плагин для отображения списка фотографов */
(function( $ ) {
    $.fn.photographers = function(url) { 
        // буфер фотографов
        this.photographers = null;
        this.listId = null;
        this.str = 'hello';

        // если у элемента нет класса аккордеона списал фотографов
        if (!$(this).hasClass('photographer-list')) return;

        // 

        this.loadFrom = function(url) {
            let str = '';

            $.getJSON(url, function(data) { 
                let items = data;

            /*$.each( data, function( key, val ) {
              items.push( "<li id='" + key + "'>" + val + "</li>" );
            });
           
            $( "<ul/>", {
              "class": "my-new-list",
              html: items.join( "" )
            }).appendTo( "body" );*/

                for (item of items) {
                    str+='id:'+item["_id"]+'<br>';
                    str+='index:'+item["index"]+'<br>';
                    str+='guid:'+item["guid"]+'<br>';
                    str+='isActive:'+item["isActive"]+'<br>';
                    str+='picture:'+item["picture"]+'<br>';  
                    str+='picture:'+item["picture"]+'<br>'; 
                    str+='picture:'+item["picture"]+'<br>'; 
                    str+='picture:'+item["picture"]+'<br>';   
                    str+='<br><br>';                                                                                                            
                }

            });

           // this.str = str;
            alert(this.str + ' | ' +);
            return this;
        }        

        this.printStr = function(){
            alert(this.str);
        }

        return this;
    }

    $.fn.accordionDiploy = function() {
        if ($(this).hasClass('accordeon')) {

        }
    };
})(jQuery);