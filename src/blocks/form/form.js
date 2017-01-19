$('.js-form-validate-ajax').each(function(){
	var $this_form = $(this);
  jQuery.validator.addMethod("usPhoneFormat", function (value, element) {
    return this.optional(element) || /^\+7 \(\d{3}\) \d{3}\-\d{2}(-\d{2})?$/.test(value);
}, "Введите корректный номер телефона");

	$this_form.validate({
    rules: {
      anotherIssuers: {
        required: ".checkbox_input--another:checked"
      }
    },
    debug: true,
    success: "valid",
    errorElement: 'span',
    errorPlacement: function(error, element) {
      error.addClass('form_error-label');
      error.appendTo(element.closest('.form_field'));
    },
    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).removeClass(validClass);
      if ($(element).is("input.pic-error") ) {
          $(element).closest('.form_field').addClass('error-pic').removeClass('valid-pic');
          $(element).closest('.form_field').find('.form_error-label').removeClass("form_error-label--hide")
      }
    },
    unhighlight: function(element, errorClass, validClass) {
      var $input = $(element);
      $input.closest('.form_field').find('.form_error-label').addClass("form_error-label--hide");

      if ($input.val() === '') {
        $input.removeClass(validClass).removeClass(errorClass);
        if ($(element).is("input.pic-error") ) {
            $(element).closest('.form_field').removeClass('error-pic').removeClass('valid-pic');
        }
      } else {
        $input.removeClass(errorClass).addClass(validClass);
        if ($input.is("input.pic-error") ) {
            $input.closest('.form_field').removeClass('error-pic').addClass('valid-pic').find('.form_error-label').hide();
        }
      }
    },
    errorClass: 'is-error',
    validClass: 'is-valid',
    ignore: '.ignore',

    submitHandler: function(form) {
      // $(form).ajaxSubmit({
      //   beforeSubmit: function(formData, jqForm, options){
      //     $this_form.find('input[type=submit], button[type=submit]').prop('disabled', true);
      //   },
      //
      //   success: function(responseText, statusText, xhr){
      //
      //     var responseFromServer =  JSON.parse(responseText);
      //     //var messages = makeMsgFromArray(responseFromServer.massages);
      //     var $mfpContent = $('<div/>').addClass('mfp-content-holder').append(messages);
      //
      //     $this_form.find('input[type=submit], button[type=submit]').prop('disabled', false);
      //
      //     $.magnificPopup.open({
      //       items: {
      //         type: 'inline',
      //         src: $mfpContent
      //       }
      //     });
      //
      //     if ( responseFromServer.result) {
      //       ($this_form).resetForm();
      //     }
      //
      //   },
      //
      //   error: function(responseText, statusText, xhr){
      //     $this_form.find('input[type=submit], button[type=submit]').prop('disabled', false);
      //
      //     //var messages = "Ошибка сервера. Попробуйте повторить попытку позднее";
      //     var $mfpContent = $('<div/>').addClass('mfp-content-holder').append(messages);
      //
      //     $.magnificPopup.open({
      //       items: {
      //         type: 'inline',
      //         src: $mfpContent
      //       }
      //     });
      //
      //   }
      // });
      var $mfpContent = $('<div/>').addClass('mfp-content-holder').append('Ваша заявка отправлена');
      $.magnificPopup.open({
        items: {
          type: 'inline',
          src: $mfpContent
        }
      });
      return false;
    }
  });
});

$(function($){
  $(".phone").mask("+7 (999) 999-99-99",{autoclear: false});
});

// function makeMsgFromArray(array){
// 	var msg = '';
//
// 	for ( var i = 0; i <array.length; i++) {
// 		msg += array[i] + '<br/>';
// 	}
//
// 	return msg;
// };
