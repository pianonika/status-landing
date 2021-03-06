$(function () {

   AOS.init();

   $('.anchor').on("click", function() {
     event.preventDefault();
     var name = $(this).attr('href').slice(1);
     var anchor = $('[name="' + name + '"]');
     var offsetTop = $(anchor).offset().top;
     $('body').animate({
       scrollTop: offsetTop
     }, 400);
     return false;
   });

$('.load-docs').magnificPopup({
    items: {
      type: 'inline',
      src: '#popup-docs'
    }
  });

var openCounter = 0;



   $('.show-offices').on('click', function () {
     $('.offices-section').toggle();
     if (openCounter < 1) {
       $('select').styler({
         onFormStyled: function () {
           if ($('.form_field-select').find('.baron__scroller').length == 0 ) {
             var scroll = $('<div class="scroller__bar-wrapper"> <div class="scroller__bar"></div></div>');
             var scrollContainer = $('.jq-selectbox__dropdown');
             $(scrollContainer).append(scroll).find('ul').addClass('scroller').wrap('<div class="baron__clipper baron__clipper--select"></div>');
             var clipper = $('.jq-selectbox__dropdown .baron__clipper');
             $(clipper).append(scroll);
             baron({
               root: '.baron__clipper',
               scroller: '.scroller',
               bar: '.scroller__bar',
             })
           }
         }
       });
       openCounter = 1;
     }

   })

   $('.close-big').on('click', function () {
     $(this).closest('.offices-section').hide();
   })
});


/*
  Поиск ближайшего родителя по селектору
  https://github.com/oneuijs/You-Dont-Need-jQuery/blob/master/README-ru.md#1.6
*/

// function closest(el, selector) {
//   const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
//
//   while (el) {
//     if (matchesSelector.call(el, selector)) {
//       return el;
//     } else {
//       el = el.parentElement;
//     }
//   }
//   return null;
// }



/*
  Запуск по готовности DOM
  http://youmightnotneedjquery.com/#ready
  Применение: ready(function(){ console.log('ddd'); });
*/

// function ready(fn) {
//   if (document.readyState != 'loading'){
//     fn();
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }



// Свой код с jQuery

// $( document ).ready(function() {

// });
