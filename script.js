import { allSongs } from "/allsongs.js";
const previousButton = document.querySelector('.play-zone-right__controls--prev');
const nextButton = document.querySelector('.play-zone-right__controls--next');
const playButton = document.querySelector('.play-zone-right__controls--play');
const pauseButton = document.querySelector('.play-zone-right__controls--pause');
const volumeSlider = document.querySelector('.volume-bar');  
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search'); 
const shuffleButton = document.querySelector('.play-zone-right__controls--shuffle');
const songTitle = document.querySelector('.play-zone-right__title');
const songArtist = document.querySelector('.play-zone-right__artist');
const progressBar = document.querySelector('.progress-bar');
const durationDisplay = document.querySelector('.duration-display');
const progrssTime = document.querySelector('.progress-time');

pauseButton.style.display = 'none'; // Hide pause button initially
 const audio = new Audio();
 
 const songsData = {
    songs:[... allSongs],
    currentSongIndex: 0,
    isPlaying: false, 
    songCurrentTime: 0,
    currentSong: null
 }     



 progressBar.value = 0; // Initialize progress bar value


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


//play previous song function
// This function plays the previous song in the playlist
// If the current song is the first one, it loops back to the last song in the playlist
// It updates the current song index and plays the song
const playPreviousSong = () => {
   console.log
};  

 


const playNextSong= () => {
   console
}
   
     
    
const getCurrentSongIndex = (songs) => {
   const songIndex = songsData.songs.findIndex(song => song.id === songsData.currentSong.id);
    if (songIndex !== -1) {
        return songIndex;
    }
    return null; // Return null if the song is not found        
 

}


const pauseSong = () => {
    if (songsData.isPlaying) {
        songsData.songCurrentTime = audio.currentTime;
        console.log('song time' , songsData.currentTime, 'audio time', audio.currentTime );
        console.log('current song:', songsData.currentSong);
        audio.pause();
        songsData.isPlaying = false; // Set playing state to false
       
    } else {
        console.log('No song is currently playing.');
        console.log('Current song 2:', songsData.currentSong);
        if(audio.paused && songsData.currentSong !== null) {
            console.log('Resuming song:', songsData.currentSong);
            audio.paused = false; // Ensure audio is not paused
            audio.currentTime = songsData.songCurrentTime; // Resume from the saved current time
            songsData.isPlaying = true; // Set playing state to true
            audio.play();
        } else {                

            console.log('No song is currently playing.');
        }
       // playSong(songsData.songs[0].id);
        
    }
}; 

const playSong = (id) => {
        const song = songsData.songs.find(song => song.id === id);
        const currentSongTitle= song.title;
        const currentSongArtist = song.artist;
        const currentSongSrc = song.src;
        audio.src = currentSongSrc; 
        audio.title =currentSongArtist; 
        audio.load(); // Load the new audio source
        songsData.isPlaying = true; // Set playing state to true
        songTitle.textContent  = currentSongTitle? currentSongTitle : 'Song Title';
        songArtist.textContent = currentSongArtist ? currentSongArtist : 'Artist Name';
        durationDisplay.textContent = song.duration;

        if ( songsData.currentSong === null 
            ||songsData.currentSong.id !== song.id) {
            audio.currentTime =  0;
        }else {
            console.log('Current song time:', songsData.songCurrentTime);
            if(audio.paused) {

               audio.paused = false; // Ensure audio is not paused
               audio.currentTime = songsData.songCurrentTime; 
            }
    
        }
        songsData.currentSong = song; 
            audio.play();
    }
   

// const gotoNextSong = () => {
//     if (songsData.currentSongIndex < songsData.songs.length - 1) {
//         songsData.currentSongIndex++;
//     } else {
//         songsData.currentSongIndex = 0; // Loop back to the first song
//     }
//     const nextSong = songsData.songs[songsData.currentSongIndex];
//     playSong(nextSong.id);
// };


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
        <button class="play-song" onclick="playSong(${song.id}}">
            <span class="music-list__item--title">${song.title}</span>
            <span class="music-list__item--author">${song.artist}</span>
            <span class="music-list__item--duration">${(song.duration)}</span>
        </button>
        <button class="music-list__item--button delete-${song.id}" aria-label="Delete ${song.id}"  data-id="${song.id}">
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
    console.log('First song after shuffle:', firstSong);
    playSong(firstSong.id);
});


previousButton.addEventListener('click', () => {
    if (songsData.isPlaying || songsData.currentSong !== null) {
        console.log('Previous song button clicked');
        playPreviousSong();
    } else {
        
        const index = getCurrentSongIndex(songsData.songs);

        if (index !== null) {
             const previousSong = songsData.songs[index];
            playSong(previousSong.id);
        } else {
            playSong(songsData.songs[0].id);
        }
        }
    });    


pauseButton.addEventListener('click', ()=>{
    pauseButton.style.display = 'none'; // Hide pause button when paused
    playButton.style.display = 'block'; // Show play button when paused
    pauseSong()
}
);


nextButton.addEventListener('click', playNextSong)
    // () => {
    // if (songsData.isPlaying) {
    //     console.log('Next song button clicked');
    //     playNextSong();

    // } else {
    //     console.log('No song is currently playing.');
         playNextSong()
    // }
// }); 

playButton.addEventListener('click', () => {
    pauseButton.style.display = 'block'; // Show pause button when play button is clicked
    playButton.style.display = 'none'; // Hide play button when play button is clicked
    if (!songsData.isPlaying) {
        if (songsData.currentSong === null) {
            playSong(songsData.songs[0].id);
        } else {
            const song = songsData.currentSong.id;
            playSong(song.id);
            
        }
        
        songsData.isPlaying = true;

    }
});


volumeSlider.addEventListener('click', (event) => {
    const volume = event.target.value;
    audio.volume = volume / 100; 
  
});

audio.addEventListener('timeupdate', () => {
    
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercentage = (currentTime / duration) * 100;
    

    // progressBar.style.width = `${progressPercentage}%`;
    progressBar.value = progressPercentage; 
   // progressBar.value = currentTime;
    songsData.songCurrentTime = currentTime; // Update the current song time
    
   
    
    // Update the displayed time
     progrssTime.textContent = `${(formatTime((currentTime)))}`;
    // // Update the duration display
    
});

progressBar.value='0';

const formatTime = (time) => {
       
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    
    const  deleteBtn = document.querySelectorAll('.music-list__item--button');
    deleteBtn.forEach((btn) => {
        
        btn.addEventListener('click', ()=>{
            const songId = btn.getAttribute('data-id');
            console.log( 'parent', btn.parentElement);
            btn.parentElement.remove(); 
             console.log('songs before deletion:', songsData.songs);   
            songsData.songs.splice(songId,1)
            console.log('songs after deletion:', songsData.songs);
            
        })
    })
    