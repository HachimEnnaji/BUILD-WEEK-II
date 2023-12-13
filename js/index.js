import { URL, token, options, search, playlist } from "./token.js";

const arrArtist = [
  "Eminem",
  "Rihanna",
  "The-Beatles",
  "Taylor-Swift",
  "Imagine-Dragons",
  "Linkin-Park",
  "Oasis",
  "Drake",
];
const arrayAlbumID = [
  69874, 35475, 98745, 1596, 18475, 19587, 57250, 25874, 58746, 5874, 487659, 58746, 65874, 8452, 9587, 8540, 7677,
  2587,
];

// funzione per mandare saluto in base all'orario

const greetings = () => {
  const greetings = document.getElementById("greetings");
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 15) {
    greetings.innerHTML = "Buongiorno";
  } else if (currentHour >= 15 && currentHour < 18) {
    greetings.innerHTML = "Buon pomeriggio";
  } else {
    greetings.innerHTML = "Buonasera";
  }
};

greetings(); //inovcazione funzione saluto

// funzione per chiusura bottone a destra
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
// funzione che randomizza indice in base alla lunghezza dell'array che riceve come parametro
const indexRandom = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return index;
};
const params = arrArtist[indexRandom(arrArtist)];
const UrlArtist = URL + search + params;

console.log(UrlArtist);

fetch(UrlArtist, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error" + response.status);
    } else {
      return response.json();
    }
  })
  .then((data) => {
    const selection = data.data[1];
    // console.log(UrlArtist);
    // const img = document.getElementById("albumImg");
    const title = document.getElementById("albumTitle");
    const artist = document.getElementById("albumArtist");
    const textArtist = document.getElementById("textArtist");
    const linkArtistImg = document.getElementById("linkArtistImg");
    linkArtistImg.innerHTML = `<a  class="text-decoration-none" href="./artist.html?q=${params}"><img src="${selection.album.cover_big}" alt="album foto" class="img-fluid" id="albumImg" /></a>`;
    title.innerHTML = `<a  class="text-decoration-none" href="./artist.html?q=${params}">${selection.album.title}</a>`;
    artist.innerHTML = `<a class="text-decoration-none"  href="./artist.html?q=${params}">${selection.artist.name}</a>`;
    textArtist.innerHTML = `<a class="text-decoration-none"  href="./artist.html?q=${params}">${selection.artist.name}</a>`;
    const albums = document.querySelectorAll(".album");
    console.log(albums);
    albums.forEach((album, indexOfArray) => {
      const albumImage = album.querySelector("img");
      const albumText = album.querySelector(".card-text");
      const link = album.querySelector(".link");
      link.setAttribute("href", "./artist.html?id=" + data.data[indexOfArray].album.id);
      albumImage.setAttribute("src", `${data.data[indexOfArray].album.cover_big}`);
      albumText.innerHTML = `${data.data[indexOfArray].title}`;
    });
  })
  .catch((Error) => {
    console.log("error" + Error);
  });

const div = document.querySelectorAll(".playlist");
div.forEach((element) => {
  //   console.log(playlist.childNodes);
  const divImg = element.querySelector(" img");
  const divText = element.querySelector(" p");
  //   console.log(divText);
  fetch(URL + playlist + arrayAlbumID[indexRandom(arrayAlbumID)], options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("error" + response.status);
      } else {
        return response.json();
      }
    })
    .then((object) => {
      divImg.setAttribute("src", `${object.picture_big}`);
      const text = object.title;
      divText.innerHTML = text.replaceAll("_", " ");
    })
    .catch((Error) => {
      console.log("error" + Error);
    });
});
