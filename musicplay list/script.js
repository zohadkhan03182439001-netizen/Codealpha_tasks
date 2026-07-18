const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');

// Track Database
const songs = [
    { name: 'SoundHelix-Song-1', displayName: 'Digital Odyssey', artist: 'Helix Engine' },
    { name: 'SoundHelix-Song-2', displayName: 'Neon Horizons', artist: 'Synth Wave' }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
    title.innerText = song.displayName;
    artist.innerText = song.artist;
    audio.src = `https://www.soundhelix.com/examples/mp3/${song.name}.mp3`;
}

function playSong() {
    isPlaying = true;
    playBtn.innerText = '⏸';
    audio.play();
}

function togglePlay() {
    isPlaying ? pauseSong() : playSong();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerText = '▶';
    audio.pause();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // Time Calculations
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
        currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;

        const durationMinutes = Math.floor(duration / 60) || 0;
        let durationSeconds = Math.floor(duration % 60) || 0;
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        
        if (durationSeconds) {
            durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
        }
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
    if(!isPlaying) playSong();
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', nextSong); // Autoplay Feature Included
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value);

