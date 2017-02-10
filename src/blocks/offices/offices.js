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
   });

   myCollection = new ymaps.GeoObjectCollection();
   myCollection.removeAll();

   var objects = [

     new ymaps.Placemark([55.79046306894659,37.53040900000002], {
               balloonContentHeader: "<h3 class='map_header'>ТРЦ «Авиапарк»</h3>",
               balloonContentBody: "<div class='map_address'>г. Москва, ул. Ходынский б-р, д. 4</div><div class='map_phone'><div class='icon'></div>+7 (495) 937-27-03 <br> Часы работы: <br>пн-чт: 10:00–23:00 <br> пт-сб:	10:00–24:00  <br> вс: 10:00-23:00</div></div>",
               name: 'myPlacemark_39'
           }, {
               iconImageHref: '/img/morizo-logo.png',
               iconImageSize: [39, 37],
               iconImageOffset: [-12, -36],
               hideIconOnBalloonOpen: true,
           }),
           //создаем массив с метками

     new ymaps.Placemark([55.744506, 37.566346], {
               balloonContentHeader: "<h3 class='map_header'>ТРЦ «Европейский»</h3>",
               balloonContentBody: "<div class='map_address'>г. Москва, пл. Киевского Вокзала,  д. 2</div><div class='map_phone'><div class='icon'></div>Тел.: +7 (495) 229-19-91<br />Часы работы: <br />вс-чт 10:00 - 22:00<br />пт-сб 10:00 - 23:00</div></div>",
               name: 'myPlacemark_8'
           }, {
               iconImageHref: '/img/morizo-logo.png',
               iconImageSize: [39, 37],
               iconImageOffset: [-12, -36],
               hideIconOnBalloonOpen: true,
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
