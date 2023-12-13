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
  console.log(currentHour);
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

const UrlArtist = URL + search + arrArtist[indexRandom(arrArtist)];
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
    const selection = data.data[0];

    const img = document.getElementById("albumImg");
    const title = document.getElementById("albumTitle");
    const artist = document.getElementById("albumArtist");
    const textArtist = document.getElementById("textArtist");
    img.setAttribute("src", `${selection.album.cover_big}`);
    title.innerHTML = `${selection.album.title}`;
    artist.innerHTML = `${selection.artist.name}`;
    textArtist.innerHTML = `${selection.artist.name}`;
  })
  .catch((Error) => {
    console.log("error" + Error);
  });

// fetch(URL + playlist + arrayAlbumID[indexRandom(arrayAlbumID)], options)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Error" + response.status);
//     } else {
//       return response.json();
//     }
//   })
//   .then((playlist) => {
//     // console.log(playlist);
//     const div = document.querySelectorAll(".playlist img");
//     div.forEach((element) => {
//       element.setAttribute("src", `${playlist.picture_big}`);
//       //   console.log(element);
//     });
//   })
//   .catch((Error) => {
//     console.log("error" + Error);
//   });
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
