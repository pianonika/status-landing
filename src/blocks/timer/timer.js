/*nataly*/

const time = () => {
  const oneDay = 24*60*60*1000;
  const oneHour = 1000 * 60 * 60;
  const oneMinute = 1000 * 60;
  const now = new Date();
  const mybirthday = new Date(2017,07,11);

  const timeDiffInMillySeconds = mybirthday.getTime() - now.getTime();

  const days = Math.floor(timeDiffInMillySeconds / oneDay);
  const hours = Math.floor((timeDiffInMillySeconds - days*oneDay) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiffInMillySeconds - days*oneDay - hours*oneHour) / (1000 * 60));

  const fullSeconds = timeDiffInMillySeconds - days*oneDay - hours*oneHour - minutes*oneMinute;
  const seconds = Math.floor(fullSeconds / 1000);

  const template = days + ' ' + hours + ' ' + minutes + ' ' + seconds;
  document.querySelector('.header-nav-link').textContent = template;
}
setInterval(time, 1000);
