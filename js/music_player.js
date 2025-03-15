let player;
let progressBar = document.getElementById("progress-bar");
let soundToggleButton = document.getElementById("soundToggle");
let volumeBar = document.getElementById("volume-bar");

function onYouTubeIframeAPIReady() {
    console.log("YouTube API is ready ✅");

    player = new YT.Player('youtube-player', {
        height: '134',
        width: '238',
        playerVars: {
            listType: 'playlist',
            list: 'PLmrxVdmvYRiHsRe9tFalMDCW3-_sZODcW', // Your playlist ID
            autoplay: 0,
            controls: 0,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("Player is ready ✅");
    let volume = volumeBar.value;

    document.getElementById("playButton").addEventListener("click", function() {
        if (player.getPlayerState() === 1) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });

    document.getElementById("stopButton").addEventListener("click", function() {
        player.stopVideo();
    });

    document.getElementById("nextButton").addEventListener("click", function() {
        player.nextVideo();
    });

    document.getElementById("prevButton").addEventListener("click", function() {
        player.previousVideo();
    });
}

function onPlayerStateChange(event) {
    console.log("Player state changed: " + event.data);
}

function updateProgressBar() {
    if (player && player.getDuration) {
        progressBar.max = player.getDuration(); // Set max duration
        progressBar.value = player.getCurrentTime(); // Update position
    }
}

setInterval(updateProgressBar, 1000);

progressBar.addEventListener("input", function () {
    player.seekTo(progressBar.value, true);
});

volumeBar.addEventListener("input", function() {
    let volume = volumeBar.value;
    player.setVolume(volume);
});

soundToggleButton.addEventListener("click", function() {
    let currentVolume = volumeBar.value;
    if (currentVolume > 0) {
        player.setVolume(0);  // Mute the player
        volumeBar.value = 0;  // Set the slider to 0
        soundToggleButton.innerHTML = "<img src='assets/music-player/mute.png' alt='Muted'>";  // Change the icon to muted
    } else {
        player.setVolume(50);  // Unmute the player and set the volume to 50
        volumeBar.value = 50;  // Set the slider back to 50
        soundToggleButton.innerHTML = "<img src='assets/music-player/volume.png' alt='Unmuted'>";  // Change the icon to sound
    }
});