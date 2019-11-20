/* Плагин для отображения списка фотографов */
(function( $ ) {
    $.fn.photographers = function(url) { 
        // если у элемента нет класса аккордеона списал фотографов
        if (!$(this).hasClass('photographer-list')) return null;

        // буфер фотографов
        this.photographers = null;
        this.listElem = $(this);

        // программируем поведение кнопки сворачивания-разворачивания информации о фотографе
        (function(listElem){$(document).on('click','div.photographer-item div.photographer-arrow a.accordeon-arrow',function(){
            let photographerItem = $(this).parent('.photographer-arrow')
                                          .parent('.photographer-item');

            if ($(photographerItem).hasClass('maximized')) {

                $.when($(photographerItem).find('div[class*="-maximized-"]').fadeOut('fast')).then(function(){
                        $.when($(photographerItem).animate({height:'86px'},'fast')).then(function(){
                            $.when($(photographerItem).find('div[class*="-minimized-"]').fadeIn('fast')).then(function(){                         
                                 $(photographerItem).removeClass('maximized').addClass('minimized');                        
                             });
                        });
                });

                $(this).removeClass('dropdowned');
            }
            else {              
                $.when($(photographerItem).find('div[class*="-minimized-"]').fadeOut('fast')).then(function(){
                    $.when($(photographerItem).animate({height:'258px'},'fast')).then(function(){                    
                         $.when($(photographerItem).find('div[class*="-maximized-"]').fadeIn('fast')).then(function(){  
                                $(listElem).find('div.photographer-item.maximized div.photographer-arrow a.accordeon-arrow').click();
                                $(photographerItem).removeClass('minimized').addClass('maximized');               
                         });
                    });
                });                

                $(this).addClass('dropdowned'); 
            }          
        })})(this.listElem);

        // программируем поведение миниатюры фотографии при наведении мыши
        $(document).on('mouseenter','div.photographer-item div.photogalery div.photo',function(){
            $.when($(this).append('<div class="photo-zoom">')).then(function(){
                $(this).children('div.photo-zoom').stop().fadeIn('fast');
            });
        });

        // программируем поведение миниатюры фотографии при отведении мыши
        $(document).on('mouseleave','div.photographer-item div.photogalery div.photo',function(){
            $.when($(this).children('div.photo-zoom').stop().fadeOut('fast')).then(function(){
                $(this).remove('div.photo-zoom');
            });
        });        

        // метод загрузки данных из JSON-файлов
        this.loadFrom = function (url_list, url_detail) {
            let that = this;

            (function(){$.getJSON(url_list, function(data) { 
                let items = data;

                (function(){$.getJSON(url_detail, function(data) { 
                    for (item of items) {
                        item["specialization"] = data["specialization"];
                        item["pictures"] = data["pictures"];
                    }

                    that.photographers = items;
                  
                    that.draw();
                });})();

            });})();
    
        }
        
        this.draw = function() {
            if (this.photographers != null) {
                // если есть метка цикла (начала списка) и только одна
                if ((listMark=$(this.listElem).find('.list-mark')).length==1) {
                    // если есть метка шаблона и только одна
                    if ((templateMark=$(listMark).find('.template-mark')).length==1) {
                        let templateHTML = '';
                        for (let photographer of this.photographers) {

                            templateHTML += '<div class="photographer-item minimized">';
                            templateHTML += '<div class="photographer-content">';
                            templateHTML += '<div class="photographer-content-grid">';
                            // шаблон аватара для свёрнутого состояния
                            templateHTML += '<div class="photographer-minimized-avatar '
                                         + (photographer["isActive"]?'user-status-online':'user-status-offline')
                                         + '">';
                            templateHTML += '<img src="'+photographer["picture"]+'">';
                            templateHTML += '</div>';
                            // шаблон аватара для развёрнутого состояния
                            templateHTML += '<div class="photographer-maximized-avatar">';
                            templateHTML += '<div class="photographer-maximized-avatar-container">';
                            templateHTML += '<div class="photographer-maximized-avatar-caption">';
                            templateHTML += '<span class="caption-bold">'+photographer["name"]["first"]
                                         + ' '+photographer["name"]["last"]
                                         + '</span>';
                            templateHTML += '<span class="caption-default">'+photographer["city"]
                                         + '</span>';   
                            templateHTML += '</div>';   
                            templateHTML += '<div class="photographer-maximized-avatar-rate">';
                            templateHTML += '<div class="rate rate-' +photographer["range"]+' shadowed">';

                            for (let i=0;i<5;i++) {templateHTML += '<a class="rate-star">&#9733;</a>';}
                            
                            templateHTML += '</div>';

                            templateHTML += '<div class="user-status-block">';
                            templateHTML += '<span class="user-status ' 
                                         + ((photographer["isActive"]==true)?'user-status-online':'user-status-offline') 
                                         + '">' 
                                         + ((photographer["isActive"]==true)?'online':'offline')
                                         + '</span>';
                            templateHTML += '</div>';
                            templateHTML += '</div>';                                         
                            templateHTML += '</div></div>';
                            // Блок описания для свёрнутого состояния
                            templateHTML += '<div class="photographer-minimized-caption">';
                            templateHTML += '<span class="caption-bold color-grey">';
                            templateHTML += photographer["name"]["first"] + ' ' + photographer["name"]["last"];
                            templateHTML += '</span>';
                            templateHTML += '<span class="caption-default color-grey">';
                            templateHTML += photographer["city"];
                            templateHTML += '</span>';                        
                            templateHTML += '</div>';    
                            // Блок специализации фотографа
                            templateHTML += '<div class="photographer-maximized-specialization">';
                            templateHTML += '<span class="caption-bold color-grey">Specialization</span>';

                            for (let specialization of photographer["specialization"]) {
                                templateHTML += '<span class="caption-default color-grey">' 
                                         + specialization;
                                templateHTML += '</span>';
                            }

                            templateHTML += '</div>';
                            // Блок рейтинга в свёрнутом состоянии
                            templateHTML += '<div class="photographer-minimized-rate">';
                            templateHTML += '<div class="rate rate-'+photographer["range"]+'">';
                            
                            for (let i=0;i<5;i++) {templateHTML += '<a class="rate-star">&#9733;</a>';}

                            templateHTML += '</div>';
                            templateHTML += '</div>';
                            // Блок галереи
                            templateHTML += '<div class="photographer-maximized-galery">';
                            templateHTML += '<div class="photogalery">';

                            for (let photo of photographer["pictures"]) {
                                templateHTML += '<div class="photo" style="background-image:url('+photo["url"]+')">';
                                templateHTML += '<div class="photo-footer">';
                                templateHTML += '<a href="#" class="photo-heart"><img src="img/favorite-heart-button-copy-2.png"></a>'
                                             +  '<span class="photo-like-count">'+photo["likes"]+'</span>';
                                templateHTML += '</div></div>';
                            }

                            templateHTML += '</div>';
                            templateHTML += '</div></div></div>';
                            // Блок кнопки развертывания-свертывания
                            templateHTML += '<div class="photographer-arrow">';
                            templateHTML += '<a class="accordeon-arrow">';
                            templateHTML += '<img src="img/arrow.svg">';
                            templateHTML += '</a>';
                            templateHTML += '</div>';

                            templateHTML += '</div>';

                        }

                            //$('body').html(templateHTML);
                            
                            // добавляем на страницу 
                            $(templateMark).append(templateHTML);
                    }
                }
            }
        }

        return this;
    }
})(jQuery);