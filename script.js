import { allSongs } from "/allsongs.js";
const previousButton = document.querySelector('.play-zone-right__controls--prev');
const nextButton = document.querySelector('.play-zone-right__controls--next');
const playButton = document.querySelector('.play-zone-right__controls--play');
const pauseButton = document.querySelector('.play-zone-right__controls--pause');
const volumeSlider = document.querySelector('.volume-bar');  
const searchArtist = document.querySelector('.search-input');
const searchButton = document.querySelector('.search'); 
const shuffleButton = document.querySelector('.play-zone-right__controls--shuffle');
const songTitle = document.querySelector('.play-zone-right__title');
const songArtist = document.querySelector('.play-zone-right__artist');
const progressBar = document.querySelector('.progress-bar');
const durationDisplay = document.querySelector('.duration-display');
const progrssTime = document.querySelector('.progress-time');
const playElement = document.querySelector('.play-song')
const marqueeContent = document.querySelector('.marquee-content')

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

 const handleSearch = ()=>{
  let matchingSongs =  songsData.songs.map(song => {
         let artist = searchArtist.value;
         artist = artist.replace(artist[0], artist[0].toUpperCase())
           if(artist=== song.title || artist=== song.artist){
             return song;
           }
    })
     displaySongs(matchingSongs)
 }

 searchButton.addEventListener('click', ()=>{
    handleSearch()
    searchArtist.value = ''
 })

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
    audio.pause(); // Pause the audio after shuffling
    audio.currentTime = 0; // Reset audio current time
    audio.src = songsData.songs[songsData.currentSongIndex].src; 
    audio.load(); // Load the new audio source
    songsData.isPlaying = false; 
    songsData.currentSong = songsData.songs[songsData.currentSongIndex]; 
    // Set the current song to the first song after shuffling
    songTitle.textContent = songsData.currentSong.title || 'Song Title';
    songArtist.textContent = songsData.currentSong.artist || 'Artist Name';
    songsData.songCurrentTime = 0; // Reset current time after shuffle
    audio.currentTime = 0; // Reset audio current time after shuffle
   
};  
//play previous song function
// This function plays the previous song in the playlist
// If the current song is the first one, it loops back to the last song in the playlist
// It updates the current song index and plays the song
const playPreviousSong = () => {
  console.log('curr song',songsData.currentSong)

  if(songsData.currentSong ===null || songsData.currentSong.id === 0){
      songArtist.textContent ="No previous song to play."
    setTimeout(() => {
        songArtist.textContent = 'Name'
    }, 5000);
  }else{
    const currSongId = getCurrentSongIndex(songsData.currentSong.id)
   currSongId === 0? playSong(currSongId): playSong(currSongId -1)
  }

};  
 
const playPauseBtn = ()=> {
    songsData.isPlaying ? playButton.style.display = "none"
    : pauseButton.style.display="block" 
}

//check if the no song playing then grab the first song
// otherwise go to next song 
const playNextSong= () => {

    if(songsData.currentSong === null){
        playSong(songsData.songs[0].id)
    }else{
        let curSongId =  getCurrentSongIndex(songsData.currentSong.id) ||0
          if( curSongId < songsData.songs.length-1 ) {
             playSong(curSongId +1)
           
         }else{
             setTimeout(() => {
                 songArtist.textContent = `${songsData.currentSong.artist}`
            }, 5000)
            songArtist.textContent = `You have reached the end of playlist`
              }
        }
}
    
const getCurrentSongIndex = (songId) => {
   const songIndex = songsData.songs.findIndex(song => song.id === songId);
    if (songIndex !== -1) {
        return songIndex;
    }
    return null; // Return null if the song is not found        
 
}

const pauseSong = () => {
        songsData.songCurrentTime = audio.currentTime;
        audio.pause() 
}; 

const playSong = (id) => {

    
        const song = songsData.songs.find(song => song.id === id);
        const currentSongTitle= song.title;
        const currentSongArtist = song.artist;
        const currentSongSrc = song.src;
        audio.src = currentSongSrc; 
        audio.title =currentSongArtist; 
        audio.load(); // Load the new audio source
        console.log( 'type of id',typeof  song.id)
        songTitle.textContent  = currentSongTitle? currentSongTitle : 'Song Title';
        songArtist.textContent = currentSongArtist ? currentSongArtist : 'Artist Name';
        durationDisplay.textContent = song.duration;

        if ( songsData.currentSong === null 
            ||songsData.currentSong.id !== song.id) {
            audio.currentTime =  0;
        }else {
               audio.currentTime = songsData.songCurrentTime;   
        }
          marqueeContent.innerHTML = `
          <span> ${currentSongTitle} </span>
          <span>. </span>
          <span> ${currentSongTitle}</span>`
        songsData.currentSong = song; 
            audio.play();
    }

audio.addEventListener('ended', () => {
    console.log('Song ended');
     playNextSong()
}); 

const songList = document.querySelector('.music-list__items');
const displaySongs = (songs) => {
    songList.innerHTML = ''; // Clear the existing list
    songs.forEach((song) => {
       if(song !== undefined){
     const songItem = document.createElement('li');
    songItem.classList.add('music-list__item');
     songItem.setAttribute('data-id', song.id);
    songItem.innerHTML += `
        <button class="play-song" data-song-id="${song.id}">
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
       }
});
}
displaySongs(songsData.songs);

 shuffleButton.addEventListener('click', () => {
    shuffleSongs();
    // pauseButton.style.display ='none'
    // playButton.style.display="block"
    // playPauseBtn()
    const firstSong = songsData.songs[songsData.currentSongIndex];
});

previousButton.addEventListener('click',playPreviousSong);
pauseButton.addEventListener('click', ()=>{
//   playPauseBtn()
    pauseSong()
});
nextButton.addEventListener('click',()=>{
    // playButton.style.display ='none'
    // pauseButton.style.display='block'
    playPauseBtn()
    playNextSong()
})

playButton.addEventListener('click', () => {
    // pauseButton.style.display = 'block'; // Show pause button when play button is clicked
    // playButton.style.display = 'none'; // Hide play button when play button is clicked
        playPauseBtn()
        if (songsData.currentSong === null) {
            playSong(songsData.songs[0].id);
        } else {
           audio.currentTime = songsData.songCurrentTime
            const song = songsData.currentSong;
            playSong(song.id);
        }
});

// audio.volume = volumeSlider.value;
volumeSlider.addEventListener('click', (event) => {
    const volume = event.target.value;
    audio.volume = volume / 100; 
});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.value = progressPercentage; 
    songsData.songCurrentTime = currentTime; // Update the current song time
  
     progrssTime.textContent = `${(formatTime((currentTime)))}`;
});

const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

      //click on the element to play start playing
      // create a data attribut to store each specific id 
      // access all the elements then attach an event to each of then
      // get the data attribute for each and convert it back to
      // number then pass it into playsong function as param.
      const playSongElements = document.querySelectorAll('.play-song')
      playSongElements.forEach((el)=>{
          el.addEventListener('click',()=>{
            playSong(Number(el.dataset.songId))
            // playButton.style.display ="none"
            // pauseButton.style.display = 'block'
            playPauseBtn()
        } )
      })

    const  deleteBtn = document.querySelectorAll('.music-list__item--button');
    deleteBtn.forEach((btn) => {
        btn.addEventListener('click', ()=>{
            const songId = btn.getAttribute('data-id');
            btn.parentElement.remove();   
            songsData.songs.splice(songId,1)
        })
    })
    