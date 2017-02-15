$(function($){
	$('.js-form-validate-ajax').each(function (){
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
					$(element).closest('.form_field').find('.form_error-label').removeClass("form_error-label--hide");
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

	  });

	});

	$('.phone').mask('+7 (000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});

	if (typeof window.submitHandler !== 'function') {
		return;
	}

	window.submitHandler(form).done(function () {
		$.magnificPopup.open({
			items: {
				type: 'inline',
				src: '#submit-popup'
			}
		});
	})
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
