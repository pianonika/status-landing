$(function () {
  var filterIs = $('.menu-list--filter').length;
  var elWidth = 137.47;
  if (filterIs) {
    var filterItemsCount = $('.menu-list--filter').find('.menu-list_item').length;
    if (filterItemsCount > 5) {
      var additionalYears = filterItemsCount - 5;
      var widthMenu = $('.menu-list--filter').width() + additionalYears*137.47 - 4;
      $('.menu-list--filter').css("width", widthMenu);
      showNextYear();
    } else {
       var widthMenu = $('.menu-list--filter').width() - 4;
       $('.menu-list--filter').css("width", widthMenu);
     }
  }

  function showNextYear() {
      var elWidth = 139.5;
      var yearNumVisibleEnd = 5;
      var yearNumVisibleStart = 1;
      var yearNum = $('.menu-list--filter').find('.menu-list_item').length;

        $('.menu-list_item').on('click', function () {
            var yearNumCurrent = $('.menu-list--filter').find('.menu-list_item').index(this) + 1;
            $('.menu-list_item').removeClass('menu-list_item--active');
            $(this).addClass('menu-list_item--active');
            if ((yearNumCurrent < yearNum) && (yearNumCurrent == yearNumVisibleEnd) ){
              var marginEl = -(elWidth*(yearNumVisibleEnd - 4));
              $('.menu-list--filter').css("margin-left", marginEl);
              yearNumVisibleEnd = yearNumVisibleEnd + 1;
              yearNumVisibleStart = yearNumVisibleStart + 1;
            } else {
              if ((yearNumCurrent == yearNumVisibleStart)&&!(yearNumCurrent == 1)) {
                var marginEl = -(elWidth*(yearNumVisibleStart-2))
                $('.menu-list--filter').css("margin-left", marginEl);
                yearNumVisibleEnd = yearNumVisibleEnd - 1;
                yearNumVisibleStart = yearNumVisibleStart - 1;
              }
            }
        })
  }
})
