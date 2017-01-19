$(function () {
  $('.buttonbar').click (function () {
       var video = $(this).prev("video").get(0);
       var button = $(".play-button");
       if (video.paused) {
          video.play();
          $(button).hide();
       } else {
          video.pause();
          button.show();
       }
  })
})



//
//   var video = document.getElementsByClassName("video");
//   window.setInterval(function(t){
//     var video = document.getElementsByClassName("video");
//     if (video.readyState > 0) {
//       var duration = $('.video_time').get(0);
//       var vid_duration = video.duration;
//       var min = Math.floor(video.duration/60);
//       var sec = Math.floor((video.duration - min*60)/60);
//       console.log(min + ':' + sec);
//       duration.firstChild.nodeValue = vid_duration;
//       clearInterval(t);
//     }
//   },500);
