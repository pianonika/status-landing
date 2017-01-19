jQuery.validator.setDefaults({
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
  submitHandler: function() {
			alert("Форма отправлена");
		}
});
$("#shareholders").validate({
  rules: {
    'required': {
      required: true
    },
    anotherIssuers: {
      required: "#company_6:checked"
    }
  }
});
$("#issuers").validate({
  rules: {
    'required': {
      required: true
    },
    anotherIssuers: {
      required: "#company_6:checked"
    }
  }
});
