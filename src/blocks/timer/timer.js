/*nataly*/
$(function () {
  if ($('div').is('.timer')) {
    timer();

  setInterval(timer, 1000);
  }

})


  function timer () {
    const oneDay = 24*60*60*1000;
    const oneHour = 1000 * 60 * 60;
    const oneMinute = 1000 * 60;
    const now = new Date();
    const dayX = new Date(2017,05,25);

    const timeDiffInMillySeconds = dayX.getTime() - now.getTime();

    const days = Math.floor(timeDiffInMillySeconds / oneDay);
    const hours = Math.floor((timeDiffInMillySeconds - days*oneDay) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiffInMillySeconds - days*oneDay - hours*oneHour) / (1000 * 60));

    const fullSeconds = timeDiffInMillySeconds - days*oneDay - hours*oneHour - minutes*oneMinute;
    const seconds = Math.floor(fullSeconds / 1000);

  //  const template = days + ' ' + hours + ' ' + minutes + ' ' + seconds;

      document.querySelector('.timer_days').textContent = days;
      document.querySelector('.timer_hours').textContent = hours;
      document.querySelector('.timer_minutes').textContent = minutes;
  }
