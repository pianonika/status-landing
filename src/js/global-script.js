 $(function () {

 AOS.init();

 $('.anchor').on("click", function(){
        event.preventDefault();
        var name = $(this).attr('href').slice(1);
        var anchor = $('[name="' + name + '"]');
        var offsetTop = $(anchor).offset().top;
        $('body').animate({scrollTop: offsetTop}, 400);
        return false;
    });
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
