import { allSongs } from "/allsongs.js";
const previousButton = document.querySelector('.play-zone-right__controls--prev');
const nextButton = document.querySelector('.play-zone-right__controls--next');
const playButton = document.querySelector('.play-zone-right__controls--play');
const pauseButton = document.querySelector('.play-zone-right__controls--pause');
const volumeSlider = document.querySelector('.play-zone-right__controls--volume');  
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search'); 
const shuffleButton = document.querySelector('.play-zone-right__controls--shuffle');
const songTitle = document.querySelector('.play-zone-right__title');
const songArtist = document.querySelector('.play-zone-right__artist');

 const audio = new Audio();
 

 const songsData = {
    songs:[... allSongs],
    currentSongIndex: 0,
    isPlaying: false, 
    songCurrentTime: 0,
    currentSong: null
 }     



// const deletSong = (id) => {
//     console.log(songList);
    
//     const songItem = document.querySelector(`.delete-song_${song.id}`);
//     // Remove the song item from the DOM
//     if (songItem) {
//         songItem.remove();
//     }   

//     const songIndex = allSongs.findIndex(song => song.id === id);
//     if (songIndex !== -1) {
//         allSongs.splice(songIndex, 1);    
//        // localStorage.setItem('songs', JSON.stringify(allSongs));
//     }
//     console.log(allSongs);
//     console.log(id);
// }

const shuffleSongs = () => {
    for (let i = songsData.songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songsData.songs[i], songsData.songs[j]] = [songsData.songs[j], songsData.songs[i]];
    }
   
    displaySongs(songsData.songs);

    songsData.isPlaying = false; 
    songsData.currentSong = null; 
    songsData.songCurrentTime = 0; 
    
    songsData.currentSongIndex = songsData.songs.findIndex(song => song.id === songsData.songs[0].id); // Reset to the first song index
   // getCurrentSongIndex(songsData.songs); // Get the index of the first song after shuffling
    audio.pause(); // Pause the audio after shuffling
    audio.currentTime = 0; // Reset audio current time
    audio.src = songsData.songs[songsData.currentSongIndex].src; 
    audio.load(); // Load the new audio source
    songsData.isPlaying = false; 
    songsData.currentSong = songsData.songs[songsData.currentSongIndex]; // Set the current song to the first song after shuffling
    console.log('Current song after shuffle:', songsData.currentSong);
    songTitle.textContent = songsData.currentSong.title || 'Song Title';
    songArtist.textContent = songsData.currentSong.artist || 'Artist Name';
    songsData.songCurrentTime = 0; // Reset current time after shuffle
    audio.currentTime = 0; // Reset audio current time after shuffle
    audio.play(); // Automatically play the first song after shuffling
    songsData.isPlaying = true; // Set playing state to true after shuffle
    console.log('Playing first song after shuffle:', songsData.currentSong);
    songsData.currentSongIndex = 0; // Reset to the first song after shuffling
    const firstSong = songsData.songs[songsData.currentSongIndex];
    playSong(firstSong.id);
};  
const playPreviousSong = () => {
    if (songsData.currentSongIndex > 0) {
        songsData.currentSongIndex--;
    } else {
        songsData.currentSongIndex = songsData.songs.length - 1; // Loop back to the last song
    }
    const previousSong = songsData.songs[songsData.currentSongIndex];
    playSong(previousSong.id);
    console.log('Previous song:', previousSong);
};  

const pauseSong = () => {
    if (songsData.isPlaying) {
        audio.pause();
        songsData.isPlaying = false;
        console.log('Paused song:', songsData.currentSong);
    } else {
        console.log('No song is currently playing.');
    }
};  
const playNextSong= () => {
    if (songsData.currentSongIndex < songsData.songs.length - 1) {
        songsData.currentSongIndex++;
    } else {
        songsData.currentSongIndex = 0; // Loop back to the first song
    }
    const nextSong = songsData.songs[songsData.currentSongIndex];
    playSong(nextSong.id);
    console.log('Next song:', nextSong);
}; 

const getCurrentSongIndex = (songs) => {
   const songIndex = songsData.songs.findIndex(song => song.id === songsData.currentSong.id);
    if (songIndex !== -1) {
        return songIndex;
    }
    return null; // Return null if the song is not found        


}
const playSong = (id) => {
        const song = songsData.songs.find(song => song.id === id);
        const currentSongTitle= song.title;
        const currentSongArtist = song.artist;
        if (song) {
            audio.src = song.src;
            audio.title = song.title;
            songsData.currentSong = song;
            songsData.currentSongIndex = songsData.songs.findIndex(s => s.id === id);
            audio.load();
            audio.play();
            songsData.isPlaying = true;
            songsData.songCurrentTime = songsData.songCurrentTime || 0;
            songTitle.textContent  = currentSongTitle? currentSongTitle : 'Song Title';
            songArtist.textContent = currentSongArtist ? currentSongArtist : 'Artist Name';
           
        }
    }
   

//}

const gotoNextSong = () => {
    if (songsData.currentSongIndex < songsData.songs.length - 1) {
        songsData.currentSongIndex++;
    } else {
        songsData.currentSongIndex = 0; // Loop back to the first song
    }
    const nextSong = songsData.songs[songsData.currentSongIndex];
    playSong(nextSong.id);

    console.log('Next song:', nextSong);
};


audio.addEventListener('ended', () => {
    console.log('Song ended');
    gotoNextSong();
}); 



const songList = document.querySelector('.music-list__items');

const displaySongs = (songs) => {
    songList.innerHTML = ''; // Clear the existing list
songs.forEach((song) => {
     const songItem = document.createElement('li');
    songItem.classList.add('music-list__item');
     songItem.setAttribute('data-id', song.id);
    songItem.innerHTML += `
        <span class="music-list__item--title">${song.title}</span>
        <span class="music-list__item--author">${song.artist}</span>
        <button class="music-list__item--button delete-song_${song.id}" aria-label="Delete ${song.id}" onclick=deletSong('${song.id}')">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="none" class="delete-song"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651
                C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135
                L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/>
            </svg>
        </button>
    `;
   
   songList.appendChild(songItem);
});
}

displaySongs(songsData.songs);




 shuffleButton.addEventListener('click', () => {
    shuffleSongs();
    const firstSong = songsData.songs[songsData.currentSongIndex];
    playSong(firstSong.id);
});


previousButton.addEventListener('click', () => {
    if (songsData.isPlaying) {
        console.log('Previous song button clicked');
        playPreviousSong();
    } else {
        console.log('No song is currently playing.');
    }
});    


pauseButton.addEventListener('click', () => {
    pauseSong();
    console.log('Pause button clicked');
});


nextButton.addEventListener('click', () => {
    if (songsData.isPlaying) {
        console.log('Next song button clicked');
        playNextSong();
    } else {
        console.log('No song is currently playing.');
    }
}); 

playButton.addEventListener('click', () => {
    if (!songsData.isPlaying) {
        if (songsData.currentSong === null) {
            playSong(songsData.songs[songsData.currentSongIndex].id);
            
        } else {
            const song = songsData.songs[songsData.currentSongIndex];
            playSong(song.id);
        }
        console.log('Playing song:', songsData.isPlaying);
        songsData.isPlaying = true;
    }
});
volumeSlider.addEventListener('input', (event) => {
    const volume = event.target.value;
    audio.volume = volume / 100; // Assuming the slider value is between 0 and 100
    console.log('Volume set to:', audio.volume);
});