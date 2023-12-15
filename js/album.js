import { URL, options, convertMinutes, album } from "./token.js";
convertMinutes(658);
const params = new URLSearchParams(window.location.search).get("id");
const newURL = URL.concat(album).concat(params);

console.log(newURL);
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

fetch(newURL, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Errore response" + response.status);
    } else {
      return response.json();
    }
  })
  .then((albums) => {
    console.log(albums);
    const img = document.getElementById("img");
    const imgArtist = document.getElementById("imgArtist");
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");
    const year = document.getElementById("year");
    const numberOfTrack = document.getElementById("numberOfTrack");
    const duration = document.getElementById("duration");
    const listTracks = albums.tracks.data;
    // const titleTrack = document.getElementById("titleTrack");
    // const numberOfReproduction = document.getElementById("numberOfReproduction");
    // const durationTrack = document.getElementById("durationTrack");

    img.src = albums.cover_medium;
    title.innerHTML = albums.title;
    imgArtist.src = albums.artist.picture_small;
    artist.innerHTML = albums.artist.name;
    year.innerHTML = albums.release_date.slice(0, 4);
    numberOfTrack.innerHTML = albums.nb_tracks;
    duration.innerHTML = convertMinutes(albums.duration);
    console.log(listTracks);

    const div = document.getElementById("selectionTitleAlbumPage");
    let counter = 1;
    div.innerHTML = "";
    listTracks.forEach((track) => {
      div.innerHTML += `<div class="d-flex justify-content-between hovering" >
        <div class="d-flex">
          <div class="h-100 pt-1">
            <h6 class="mt-2 opacity-75">${counter}</h6>
          </div>
          <div>
            <strong class="m-0 ps-3"><button class=" border-0 bg-transparent text-white " onclick=" ${playSong(
              track
            )} " >${track.title}</button></strong>
            <p class="m-0 ps-3 opacity-75"><a class="link-light text-decoration-none" href="./artist.html?q=${
              track.artist.name
            }">${track.artist.name}</a></p>
          </div>
        </div>

        <div class="d-flex justify-content-between col-5 align-items-center">
          <div><p class="my-0 opacity-75">${track.rank}</p></div>
          <div class="opacity-75">${convertMinutes(track.duration)}</div>
        </div>
      </div>`;
      counter++;
    });

    // div.appendChild(divtrack);
  })
  .catch((error) => {
    console.log("errore" + error);
  });

function playSong(track) {
  // console.log(track);
  const playerBarImg = document.getElementById("playeBarImg");
  console.log(playerBarImg);
  // console.log(selection.album.cover_big);
  const titleAlbum = document.getElementById("titleAlbum");
  const nameArtist = document.getElementById("nameArtist");
  playerBarImg.setAttribute("src", track.album.cover_big);
  titleAlbum.innerHTML = track.title;
  nameArtist.innerHTML = track.artist.name;
}
