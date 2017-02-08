/*nataly*/
$(function () {
  if ($('.timer').length > 0) {
    timer();

  setInterval(timer, 1000);
  }

})


  function timer () {
    const oneDay = 24*60*60*1000;
    const oneHour = 1000 * 60 * 60;
    const oneMinute = 1000 * 60;
    const now = new Date();
    const dayX = new Date(2017,02,01);

    const timeDiffInMillySeconds = dayX.getTime() - now.getTime();

    if (timeDiffInMillySeconds > 0) {
      const days = Math.floor(timeDiffInMillySeconds / oneDay);
      const hours = Math.floor((timeDiffInMillySeconds - days*oneDay) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiffInMillySeconds - days*oneDay - hours*oneHour) / (1000 * 60));

      const fullSeconds = timeDiffInMillySeconds - days*oneDay - hours*oneHour - minutes*oneMinute;
      const seconds = Math.floor(fullSeconds / 1000);

    //  const template = days + ' ' + hours + ' ' + minutes + ' ' + seconds;

        document.querySelector('.timer_days').textContent = days;
        document.querySelector('.timer_hours').textContent = hours;
        document.querySelector('.timer_minutes').textContent = minutes;
      } else {
        $('.timer-wrap').html('<button type="submit" class="button">Войти</button>');
      }
  }
