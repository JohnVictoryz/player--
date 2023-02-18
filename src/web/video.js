toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-bottom-left",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "slideDown",
  "hideMethod": "slideUp"
}

function logMessage(m, t, ty) {
  console.log("[LVP]", m)
  document.querySelector("#log").innerText = `${document.querySelector("#log").innerText}\n[${Math.floor(performance.now()) / 1000}] ${m}`
  if (t) {
    toastr[ty](m, t)
  }
}

try {
  function rch(qs, f) {
    $(qs)[0].addEventListener('click', f);
  }

  var vid = $("#mainvideo")[0]
  var play = $("#playbutton")[0]
  var mute = $("#muteButton")[0]
  var fullVol = $("#fullblastbutton")[0]
  var statsb = $("#statsbutton")[0]
  var stats = $("#stats")[0]
  var config = $("#config")[0]
  var fs = $("#fullscreen")[0]
  var speed = $("#speed")[0]
  $("#controls")[0].style.display = "block";

  function playpause() {
    if (play.className.includes("fa-pause")) {
      vid.pause()
    } else {
      vid.play()
    }
  }
  rch(play, playpause)
  rch(vid, playpause)
  rch(statsb, function() {
    $(config).toggle(400)
  })
  rch(mute, function() {
    vid.volume = 0;
  })
  rch(fullVol, function() {
    vid.volume = 1;
  })
  rch(fs, function() {
    if (!document.querySelector(":fullscreen")) {
      document.body.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    
  })
  var droppedFrames = 0
  var shownWarning = false
  setInterval(function() {
    if (vid.paused) {
      play.className = "icon fa fa-play"
    } else {
      play.className = "icon fa fa-pause"
    }
    if (document.querySelector(":fullscreen")) {
      fs.className = "icon fa fa-compress"
    } else {
      fs.className = "icon fa fa-expand"
    }
    
    $("#src")[0].innerText = vid.currentSrc
    $("#res")[0].innerText = `${vid.videoWidth}x${vid.videoHeight}`
    var qual = vid.getVideoPlaybackQuality()
    $("#framesDropped")[0].innerText = `${qual.droppedVideoFrames} ${droppedFramesRate}/s`
    $("#framesCorrupt")[0].innerText = `${qual.corruptedVideoFrames} ${corruptedFramesRate}/s`
    var newDroppedFrames = (qual.corruptedVideoFrames + qual.droppedVideoFrames)
    if (newDroppedFrames > 100 && !shownWarning && newDroppedFrames > droppedFrames) {
      logMessage("We're having some playback troubles. Consider lowing the video resolution.", "Playback isn't running smooth.", "warning")
      shownWarning = true
    }
    droppedFrames = qual.corruptedVideoFrames + qual.droppedVideoFrames
    $("#frames")[0].innerText = `${qual.totalVideoFrames - droppedFrames} ${frameRate} fps`

    $("#volume")[0].value = vid.volume
    $("#progress")[0].value = vid.currentTime
    $("#progress")[0].max = vid.duration
    
    vid.playbackRate = parseInt(speed.value) / 10
  }, 15)

  var isScrubbing = false
  $("#progress")[0].onmousedown = function(mE) {
    var width = mE.target.clientWidth
    var click = mE.offsetX
    var pcnt = click / width
    vid.currentTime = vid.duration * pcnt
    isScrubbing = true
  }
  $("#progress")[0].onmouseup = function(mE) {
    isScrubbing = false
  }
  $("#progress")[0].onmousemove = function(mE) {
    if (isScrubbing) {
      var width = mE.target.clientWidth
      var click = mE.offsetX
      var pcnt = click / width
      vid.currentTime = vid.duration * pcnt
    }
  }
  
  var volumeChanging = false
  $("#volume")[0].onmousedown = function(mE) {
    var width = mE.target.clientWidth
    var click = mE.offsetX
    var pcnt = click / width
    vid.volume = pcnt
    volumeChanging = true
  }
  $("#volume")[0].onmousemove = function(mE) {
    if (volumeChanging) {
      var width = mE.target.clientWidth
      var click = mE.offsetX
      var pcnt = click / width
      vid.volume = pcnt
    }
  }
  $("#volume")[0].onmouseup = function() {
    volumeChanging = false
  }

  var oldDroppedFrames = 0
  var oldCorruptedFrames = 0
  var oldFrames = 0
  var droppedFramesRate = 0
  var corruptedFramesRate = 0
  var frameRate = 0
  setInterval(function() {
    var qual = vid.getVideoPlaybackQuality()
    droppedFramesRate = (qual.droppedVideoFrames - oldDroppedFrames) * 4
    corruptedFramesRate = (qual.corruptedVideoFrames - oldCorruptedFrames) * 4
    var renderedFrames = qual.totalVideoFrames - (qual.corruptedVideoFrames + qual.droppedVideoFrames)
    frameRate = (renderedFrames - oldFrames) * 4
    oldDroppedFrames = qual.droppedVideoFrames
    oldCorruptedFrames = qual.corruptedVideoFrames
    oldFrames = renderedFrames
    
    
    
  }, 250)
  
  updateQual = function() {
    var oldTime = vid.currentTime
    vid.src = document.querySelector("#qualitySelect").value
    vid.currentTime = oldTime
    vid.play()
  }
  vid.src = document.querySelector("#qualitySelect").value

  function hideControls() {
    $("#controls")[0].style.bottom = "-2em";
  }

  function showControls() {
    $("#controls")[0].style.bottom = "0em";
  }
  document.querySelector("#lvpContainer").onmouseenter = showControls;
  document.querySelector("#lvpContainer").onmouseleave = hideControls
  vid.controls = false;
  logMessage("Loaded successfully")
} catch (e) {
  try {
    $("#stats").show(400)
    logMessage(e.toString(),"Fatal error!","error")
  } catch (x) {
    alert(e)
  }
}