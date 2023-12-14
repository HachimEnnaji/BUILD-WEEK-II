import { URL, token, options, search, playlist } from "./token.js";
const params = new URLSearchParams(window.location.search);
const paramsid = params.has("id") ? params.get("id") : params.get("q");
console.log(paramsid);

const randomNumber = (n) => {
  let n1 = Math.floor(Math.random() * n + n * 2);
  return n1;
};
function convertMinutes(seconds) {
  let minuti = Math.floor(seconds / 60);
  let restingSeconds = seconds % 60;

  restingSeconds = restingSeconds < 10 ? "0" + restingSeconds : restingSeconds;

  return minuti + ":" + restingSeconds;
}

fetch(URL + search + paramsid, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Errore di tipo:" + response.status);
    } else {
      return response.json();
    }
  })
  .then((object) => {
    const artist = object.data[0];
    const artistContainer = document.getElementById("artist");
    let rank = document.getElementById("rank");
    const background = document.getElementById("background");
    const artista = document.getElementById("artista");
    const numberOfTrack = document.getElementById("numberOfTrack");
    const imgRounded = document.getElementById("imgRounded");
    // background.style.backgroundImage = `URL(${artist.artist.picture_xl})`;
    background.style.background = `linear-gradient(to bottom, #00000000 30%, #000000ff), url(${artist.artist.picture_xl})`;

    background.style.objectFit = "contain";
    background.style.backgroundPositionY = "20%";
    background.style.backgroundPositionX = "center";
    rank.innerHTML = randomNumber(1000000).toLocaleString();
    artistContainer.innerHTML = artist.artist.name;
    artista.innerHTML = artist.artist.name;
    numberOfTrack.innerHTML = randomNumber(10);
    imgRounded.src = artist.artist.picture_small;
    let ogetto = object.data;
    let arrTracklist = [0];
    let immagine = [0];
    let duration = [0];
    let titoli = [0];
    ogetto.forEach((tracklist) => {
      for (let i = 0; i < 1; i++) {
        if (tracklist.rank > arrTracklist[i]) {
          arrTracklist.push(tracklist.rank);
          immagine.push(tracklist.album.cover);
          duration.push(convertMinutes(tracklist.duration));
          titoli.push(tracklist.title);
          console.log(tracklist.title);
        }
      }
    });

    // console.log(titoli, arrTracklist);

    const tracklistImg = document.querySelectorAll(".tracklistImg");
    const tracklistTitle = document.querySelectorAll(".tracklistTitle");
    const tracklistRank = document.querySelectorAll(".tracklistRank");
    const tracklistDuration = document.querySelectorAll(".tracklistDuration");
    for (let i = 0; i < 5; i++) {
      tracklistImg[i].src = immagine[i + 1];
      tracklistTitle[i].innerHTML = titoli[i + 1];
      tracklistRank[i].innerHTML = arrTracklist[i + 1];
      tracklistDuration[i].innerHTML = duration[i + 1];
    }
  })
  .catch((error) => {
    console.log("errore" + error);
  });
