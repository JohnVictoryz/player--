const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressSpan = document.querySelector('.progress-span');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeLine = document.querySelector('.volume-line');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

//Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', spanUpdate);
video.addEventListener('canplay', spanUpdate);
progressSpan.addEventListener('click', spanTime);
volumeLine.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);


function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        displayPlayIcon();
    }
}

function displayPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

video.addEventListener('ended', displayPlayIcon);


//
function showTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}: ${seconds}`;
}

function spanUpdate() {
    //console.log('currentTime', video.currentTime, 'duration', video.duration);
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${showTime(video.currentTime)} /`;
    duration.textContent = `${showTime(video.duration)}`;

}

function spanTime(e) {
    // console.log(e);
    const newTime = e.offsetX / progressSpan.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}
let endVolume = 1;
//Volume
function changeVolume(e) {
    let volume = e.offsetX / volumeLine.offsetWidth;
    //console.log(volume);
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
    endVolume = volume;



}

//Mute
function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        endVolume = video.volume;
        video.volume = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
        volumeBar.style.width = 0;
    } else {
        video.volume = endVolume;
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
        volumeBar.style.width = `${endVolume * 100}%`;

    }
}

function changeSpeed() {
    // console.log('video playback rate', video.playbackRate);
    //console.log('selected value', speed.value);
    video.playbackRate = speed.value;

}
//fullscreen
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}

let fullscreen = false;

function toggleFullscreen() {
    !fullscreen ? openFullscreen(player) : closeFullscreen();
    fullscreen = !fullscreen;
}
