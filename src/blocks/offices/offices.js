$(function () {

  $('select#cities').change(function() {

    var vals=$(this).val().split(' ');

    myMap.setCenter([vals[0].replace(',',''),vals[1]], 9, "map");

    var citiesCards = $('.city-address_item');

    $(citiesCards).hide();

    $('.city-address_item[data-city="' + $('#cities option:selected').text() + '"]').show();

    if ($('.city-address_inner').height() < $('.baron__clipper--offices').height() ) {
       $('.baron__clipper--offices .scroller__bar-wrapper').hide();
     } else {
       $('.baron__clipper--offices .scroller__bar-wrapper').show();
       $('.scroller').trigger('sizeChange');
     }
   });

   ymaps.ready(init);

   var myMap;
   var myCollection;
   var counter_for_map;

   function init() {

   myMap = new ymaps.Map('map', {
       center: [55.75399400, 37.62209300],
       zoom: 9,
       controls: ['zoomControl']
   }),
   BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
       '<div style="background-color:red;">' +
           '123' +        '</div>'
   );

   /* шаблон для балуна */
   var myBalloonContentLayout = ymaps.templateLayoutFactory.createClass('<p>$[[options.contentBodyLayout]]</p>');
   var myBalloonContentBodyLayout = ymaps.templateLayoutFactory.createClass('<div class="balloon_layout"><div class="balloon_content">$[[options.contentLayout]]</div><div class="balloon_close"></div><div class="balloon_tail"></div></div>', {
        build: function () {
            // необходим вызов родительского метода, чтобы добавить содержимое макета в DOM
            this.constructor.superclass.build.call(this);
            $('#layout-element').bind('mouseover', this.onNameHover);
        },

        clear: function () {
            $('#layout-element').unbind('mouseover', this.onNameHover);
            this.constructor.superclass.clear.call(this);
        },

        onNameHover: function () {
            $('#layout-element').css('color', getRandomColor());
        }
    });
    var myIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="balloon_content-header">$[properties.balloonContentHeader]</div>' +
      '</div><div calss="balloon_content-body">$[properties.balloonContentBody]</div>', {
        build: function () {
            this.constructor.superclass.build.call(this);
            $('#layout-element').bind('mouseover', this.onNameHover);
        },

        clear: function () {
            $('#layout-element').unbind('mouseover', this.onNameHover);
            this.constructor.superclass.clear.call(this);
        },

        onNameHover: function () {
            $('#layout-element').css('color', getRandomColor());
        }
    });
   ymaps.layout.storage.add('my#balloonLayout', myBalloonContentBodyLayout) ;
   ymaps.layout.storage.add('my#balloonContentLayout', myIconContentLayout) ;







   myCollection = new ymaps.GeoObjectCollection();
   myCollection.removeAll();



   var objects = [

     new ymaps.Placemark([55.79046306894659,37.53040900000002], {
               balloonContentHeader: "<h3 class='map_header'>ТРЦ «Авиапарк»</h3>",
               balloonContentBody: "<div class='map_address'>Россия, 109544, г. Москва, ул. Новогорожская, д.3, стр. 1</div><div class='map_phone'>(495) 974-83-50</div><a href='mailto:office@rostatus.ru'>office@rostatus.ru </a>",
               name: 'myPlacemark_39'
           }, {
               myBalloonContentBodyLayout: BalloonContentLayout,
               iconLayout: 'default#image',
               iconImageHref: '/img/mapIcon.png',
               iconImageSize: [18, 18],
               iconImageOffset: [-9, -9],
               hideIconOnBalloonOpen: false,
               balloonLayout           : myBalloonContentBodyLayout,
               balloonContentLayout    : myIconContentLayout
           }),
           //создаем массив с метками

     new ymaps.Placemark([55.744506, 37.566346], {
               balloonContentHeader: "<h3 class='map_header'>ТРЦ «Авиапарк»</h3>",
               balloonContentBody: "<div class='map_address'>Россия, 163000, г. Архангельск, ул. Розы Люксембург, д.5,корп.1</div><div class='map_phone'>(8182) 63-32-60</div><a href='mailto:arkhangelsk@rostatus.ru'>arkhangelsk@rostatus.ru</a>",
               name: 'myPlacemark_8'
           }, {
               myBalloonContentBodyLayout: BalloonContentLayout,
               iconLayout: 'default#image',
               iconImageHref: '/img/mapIcon.png',
               iconImageSize: [18, 18],
               iconImageOffset: [-9, -9],
               hideIconOnBalloonOpen: false,
               balloonLayout           : myBalloonContentBodyLayout,
               balloonContentLayout    : myIconContentLayout
           })
     ];





   var i;
   for(i=0;i<objects.length;i++){
       myCollection.add(objects[i]);
   }

   myMap.geoObjects.add(myCollection);

   $('body').on('click touchend','.city-address_item', function(){

         var this_place_attr=$(this).attr('rel');

         if( !$(this).hasClass('active')){
         	$('.city-address_item').removeClass('active');
   		    $(this).addClass('active');
   		    choose_baloon( this_place_attr );
         }

    });

  }

  function choose_baloon(metkaNameInput){

      var metkaName = metkaNameInput;  //сохраняем подпись у ссылки
      var result = ymaps.geoQuery(myMap.geoObjects);   //собираем все объекты на карте
      var metka = result.search('properties.name == "' + metkaName + '"').get(0);  //выполняем поиск по объектам по подписи ссылки

      var coord = metka.geometry.getCoordinates();  //получаем координаты найденной метки

      myMap.setCenter(coord, 15, {   //смещаем участок с меткой в центр блока, увеличиваем zoom
          duration: 100,
          callback: function(){

            metka.balloon.open();
          }
      });
      return false;

  }
});
