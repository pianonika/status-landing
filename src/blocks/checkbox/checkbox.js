$(function () {
  $('.checkbox_input--another').on('change', function () {
    $('.form_inp-text--additional').toggle().closest('.form_field').toggleClass('hide-error');
    $('#anotherIssuers-error').toggle();
  })
})
