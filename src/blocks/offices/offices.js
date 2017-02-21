$(function () {

  $('select#cities').change(function() {

    var vals=$(this).val().split(' ');
  if (vals != 'all') {

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
  }
  else {
    $('.city-address_item').show();
    $('.baron__clipper--offices .scroller__bar-wrapper').show();
    $('.scroller').trigger('sizeChange');
    myMap.setBounds(myMap.geoObjects.getBounds(), {checkZoomRange: true});
    //    myMap.setBounds(myMap.geoObjects.getBounds());
  }

});

if (document.querySelector('#map')) {
  ymaps.ready(init);

  var myMap;
  var myCollection;
  var counter_for_map;



function init() {

    myMap = new ymaps.Map('map', {
        center: [61.26883328,57.33156565],
        zoom: 4,
        controls: ['zoomControl']
      });


      /* шаблон для балуна */
    var myBalloonContentLayout = ymaps.templateLayoutFactory.createClass('<div class="balloon_layout"><div class="balloon_content">$[[options.contentLayout]]</div><div class="balloon_close"></div><div class="balloon_tail"></div></div>', {
      build: function() {
        // необходим вызов родительского метода, чтобы добавить содержимое макета в DOM
        this.constructor.superclass.build.call(this);
        $('#layout-element').bind('mouseover', this.onNameHover);
      },

      clear: function() {
        $('#layout-element').unbind('mouseover', this.onNameHover);
        this.constructor.superclass.clear.call(this);
      },

      onNameHover: function() {
        $('#layout-element').css('color', getRandomColor());
      }
    });
    var myBalloonContentBodyLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="balloon_content-header">$[properties.balloonContentHeader]</div>' +
      '</div><div calss="balloon_content-body">$[properties.balloonContentBody]</div>', {
        build: function() {
          this.constructor.superclass.build.call(this);
          $('#layout-element').bind('mouseover', this.onNameHover);
        },

        clear: function() {
          $('#layout-element').unbind('mouseover', this.onNameHover);
          this.constructor.superclass.clear.call(this);
        },

        onNameHover: function() {
          $('#layout-element').css('color', getRandomColor());
        }
      });

    myCollection = new ymaps.GeoObjectCollection();
    myCollection.removeAll();

    window.offices = {
      1: {
        city: 'Москва',
        coords: '55.744506,37.566346',
        address: 'Россия, 109544, г. Москва, ул. Новогорожская, д.3, стр. 1б',
        time: 'с 10:00 до 15:00 (без обеда)',
        phone: '84959748350',
        email: 'office@rostatus.ru',
        name: 'myPlacemark_39',
      },
      2: {
        city: 'Москва',
        coords: '55.79046306894659,37.53040900000002',
        address: 'Россия, 109544, г. Москва, ул. Новогорожская, д.3, стр. 1б',
        time: 'с 10:00 до 15:00 (без обеда)',
        phone: '84959748350',
        email: 'office@rostatus.ru',
        name: 'myPlacemark_8',
      },
      3: {
        city: 'Москва',
        coords: '53.79046306894659,31.53040900000002',
        address: 'Россия, 109544, г. Москва, ул. Новогорожская, д.3, стр. 1б',
        time: 'с 10:00 до 15:00 (без обеда)',
        phone: '84959748350',
        email: 'office@rostatus.ru',
        name: 'myPlacemark_8',
      },
      4: {
        city: 'Москва',
        coords: '53.79046306894659,31.53040900000002',
        address: 'Россия, 109544, г. Москва, ул. Новогорожская, д.3, стр. 1б',
        time: 'с 10:00 до 15:00 (без обеда)',
        phone: '84959748350',
        email: 'office@rostatus.ru',
        name: 'myPlacemark_8',
      },
    }



      var keysOffices = Object.keys(offices);
      var objects = Object.values(offices).map(function(office) {
      var coordChar = office.coords.split(',');
      var coordinates = [coordChar[0],coordChar[1]];
      var phone = office.phone.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($2) $3-$4-$5');
      myCollection.add(new ymaps.Placemark(coordinates, {
                        balloonContentHeader: '<h3 class=\'map_header\'>' + office.city +'</h3>',
                        balloonContentBody: '<div class=\"map_address\">' + office.address + '</div>'
                        + '<div class=\'map_phone\'>'+ phone + '</div>'
                        + '<a href=\mailto:arkhangelsk@rostatus.ru\'>' + office.email + '</a>',
                        name: office.name
                        }, {
                          iconLayout: "default#image",
                          iconImageHref: "/img/mapIcon.png",
                          iconImageSize: [18, 18],
                          iconImageOffset: [-9, -9],
                          hideIconOnBalloonOpen: false,
                          balloonLayout: myBalloonContentLayout,
                          balloonContentLayout: myBalloonContentBodyLayout,
                        })
                      );
      $('.city-address_inner').append('<div rel="' + office.name + '" class=\"city-address_item\" data-city="' + office.city + '\">'
          + '<div class="city-address_item-ttl\">' + office.city + '</div>'
          + '<div class=\"city-address_item-address\">' + office.address + '</div>'
          + '<div class=\"city-address_item-time\">' + office.time + '</div>'
          + '<div class=\"city-address_item-phone\"><a href="tel:8' + office.phone + '">' + phone + '</a></div>' //  4959748350 => +7 (495) 974-83-50
          + '<div class=\"city-address_item-email\"><a href="mailto:office@rostatus.ru">' + office.email + '</a></div>'
        + '</div>');
      return myCollection;
    });


    myMap.geoObjects.add(myCollection);

    $('body').on('click touchend', '.city-address_item', function() {

      var this_place_attr = $(this).attr('rel');

      if (!$(this).hasClass('active')) {
        $('.city-address_item').removeClass('active');
        $(this).addClass('active');
        choose_baloon(this_place_attr);
      }

    });



    function choose_baloon(metkaNameInput) {

      var metkaName = metkaNameInput; //сохраняем подпись у ссылки
      var result = ymaps.geoQuery(myMap.geoObjects); //собираем все объекты на карте
      var metka = result.search('properties.name == "' + metkaName + '"').get(0); //выполняем поиск по объектам по подписи ссылки

      var coord = metka.geometry.getCoordinates(); //получаем координаты найденной метки

      myMap.setCenter(coord, 15, { //смещаем участок с меткой в центр блока, увеличиваем zoom
        duration: 100,
        callback: function() {

          metka.balloon.open();
        }
      });
      return false;

    }

  }
}
});
