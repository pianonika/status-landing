$("#shareholders").validate({
  rules: {
    secondName: {
      required: true,
      minlength: 2
    }
  },
  messages: {
    secondName: {
      required: "We need your second-name",
      minlength: "At least {0} characters required!"
    }
  }
});
