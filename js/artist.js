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

document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.getElementById("close-right-sidebar");
  const contentContainer = document.getElementById("right-sidebar");
  const colRightSidebar = document.getElementById("col-right-sidebar");

  closeButton.addEventListener("click", function () {
    contentContainer.classList.add("d-none");
    colRightSidebar.classList.add("col-1");
    colRightSidebar.classList.remove("col-2");
    showButton.classList.remove("d-none");
  });

  const showButton = document.getElementById("btn-right-sidebar");
  showButton.addEventListener("click", function () {
    contentContainer.classList.remove("d-none");

    colRightSidebar.classList.remove("col-1");
    colRightSidebar.classList.add("col-2");

    showButton.classList.add("d-none");
  });
});

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
    // let product = {
    //   rank: 0,
    //   album:{cover: null,},
    //   duration: 0,
    // };
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
    arrTracklist.shift();
    immagine.shift();
    duration.shift();
    titoli.shift();

    const songs = document.getElementById("songs");
    for (let i = 0; i < 10; i++) {
      songs.innerHTML += `
      <div class="col-1 text-end p-0 pe-2">
      <span class="badge fw-normal" >${i + 1}</span>
      </div>
      <div class="col-1 p-0 my-1">
      <img class="tracklistImg" height="40px" src="${immagine[i]}" alt="song cover" />
      </div>
      <div class="col-5 p-0">
      <span class="badge tracklistTitle">
      <button class="ms-4 ms-md-2 ms-lg-0 border-0 bg-transparent text-white playSong" >${titoli[i]}</button>
      </span>
      </div>
      <div class="col-2 text-end p-0">
      <span class=" d-none d-md-block badge fw-normal tracklistRank">${arrTracklist[i]}</span>
      </div>
      <div class="col-3 text-end p-0">
      <span class=" d-none d-md-block badge fw-normal tracklistDuration">${duration[i]}</span>
      </div>
      `;
    }
  })
  .catch((error) => {
    console.log("errore" + error);
  });
