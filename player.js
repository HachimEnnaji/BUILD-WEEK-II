const audio = document.querySelector("audio");

audio.addEventListener("loadedmetadata", () => {
  console.log(audio.duration);
});

const play = document.querySelector(".playSong");
console.log(play);
play.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("timeupdate", () => {
  const percentage = (100 / audio.duration) * audio.currentTime;
  console.log(percentage);
  const progressbar = document.querySelector(".progressPlay");
  progressbar.style.width = percentage + "%";
  console.log(progressbar);
});
// playButton.addEventListener("click", function () {
//   const playerBarImg = document.getElementById("playeBarImg");
//   console.log(selection.album.cover_big);
//   const titleAlbum = document.getElementById("titleAlbum");
//   const nameArtist = document.getElementById("nameArtist");
//   playerBarImg.setAttribute("src", selection.album.cover_big);
//   titleAlbum.innerHTML = selection.album.title;
//   nameArtist.innerHTML = selection.artist.name;
// });
