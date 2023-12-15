const audio = document.querySelector("audio");

audio.addEventListener("loadedmetadata", () => {
  console.log(audio.duration);
});

const play = document.querySelector("#bottonazzo");
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
