const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volume = document.querySelector('input[name="volume"]');
const playbackRate = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');

// Play/Pause Toggle
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateToggleButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Volume and Playback Speed
function handleVolume() {
  video.volume = this.value;
}

function handlePlaybackRate() {
  video.playbackRate = this.value;
}

// Skip Functionality
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
volume.addEventListener('input', handleVolume);
playbackRate.addEventListener('input', handlePlaybackRate);
skipButtons.forEach(button => button.addEventListener('click', skip));

progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
