
  //This code loads the IFrame Player API code asynchronously.

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api?enablejsapi=1&version=3";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var timeInitialized;
  //console.log(status);
  var maxTime = 0;

  var hours = 0;
  var mins = 0;
  var secs = 0;
  var currentSeconds = 0;

  var totalDurationSeconds = 0;
  var durationSeconds = '';
  var durationMinutes = '';
  var durationHours = '';

  var totalDuration = "0:00:00";
  

   //    This function creates a YouTube player
   //    after the API code downloads.
  var player;
  
  


   //  The API will call this function when the video player is ready.
  function onPlayerReady(event) {
   event.target.playVideo();
		$('#slider').slider({animate: 'fast'});
		
    /*$('#video').on("click", function() {
      player.videoId = '#person';
      player.reload();
    })  */
   $('#changeVideoButton').on("click", function() {
    player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: $('#changeVideoButton'),
    playerVars: {
     'controls': 0,
     'disablekb': 1,
     'enablejsapi': 1,
     'modestbranding': 1,
     'showinfo': 0
    },
    events: {
     'onReady': onPlayerReady,
     'onStateChange': onPlayerStateChange
    }
   });
   });
   $('#play-button').on("click", function() {
    player.playVideo();
   });
   $('#pause-button').on("click", function() {
    player.pauseVideo();
   });
  $('#fast-forward').on("click", function() {
    if (player.getCurrentTime() + 10 < maxTime) {
     player.seekTo(player.getCurrentTime() + 10, true);
    } else {
     player.seekTo(maxTime, true);
    }
   });
   $("#rewind-button").on("click", function() {
    player.seekTo(player.getCurrentTime() - 10, true);
   });
  }

   //    The API calls this function when the player's state changes.
   //    The function indicates that when playing a video (state=1),
   //    the player should play for six seconds and then stop.
  function onPlayerStateChange(event) {
   if (event.data == YT.PlayerState.PLAYING) {
    timeInitialized = setInterval(onPlayProgress, 1000);
   } else {
    clearInterval(timeInitialized);
   }
  }

  function stopVideo() {
   player.stopVideo();
  }

  function getTime() {
   player.getCurrentTime();
  }

  function onPlayProgress() {
   currentSeconds = player.getCurrentTime();
   $("#slider").slider("option", "value", currentSeconds);
   if (maxTime < currentSeconds) {
    maxTime = currentSeconds;
   }
   currentSeconds = Math.round(currentSeconds);
   seconds = (currentSeconds % 60) + "";
   if (seconds.length == 1) {
    seconds = 0 + seconds
   }
   minutes = ((currentSeconds - seconds) / 60) % 60 + "";
   if (minutes.length == 1) {
    minutes = 0 + minutes
   }
   hours = ((currentSeconds - seconds - (minutes * 60)) / 3600) + "";
   if (hours.length == 1) {
    hours = 0 + hours
   }

   totalDurationSeconds = Math.round(player.getDuration());
   durationSeconds = (totalDurationSeconds % 60) + "";
   if (durationSeconds.length == 1) {
    durationSeconds = 0 + durationSeconds
   }
   durationMinutes = ((totalDurationSeconds - durationSeconds) / 60) % 60 + "";
   if (durationMinutes.length == 1) {
    durationMinutes = 0 + durationMinutes
   }
   durationHours = ((totalDurationSeconds - durationSeconds - (durationMinutes * 60)) / 3600) + "";
   if (durationHours.length == 1) {
    durationHours = 0 + durationHours
   }
   totalDuration = durationHours + ":" + durationMinutes + ":" + durationSeconds;

   $('.status').text(hours + ":" + minutes + ":" + seconds + "/" + totalDuration);
  }

  function onSeek(barLocation) {
   if (barLocation < maxTime) {
    player.seek(barLocation, true);
   }
  }
 