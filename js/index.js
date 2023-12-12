import { URL, token, options, search, playlist } from "./token.js";

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

const arrArtist = ["Eminem", "Rihanna", "The Beatles", "Taylor Swift"];
const arrayAlbumID = [
  69874, 35475, 98745, 1596, 18475, 19587, 57250, 25874, 58746, 5874, 487659, 58746, 65874, 8452, 9587, 8540, 7677,
  2587,
];

const indexRandom = (array) => {
  const index = Math.floor(Math.random() * array.length);
  console.log(index);
  return index;
};
console.log(indexRandom(arrayAlbumID));
// const indexRandom = Math.floor(Math.random() * 4);
fetch(URL + search + arrArtist[indexRandom(arrArtist)], options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error" + response.status);
    } else {
      return response.json();
    }
  })
  .then((data) => {
    const selection = data.data[0];
    // console.log(selection);

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
div.forEach((element, indexofArray) => {
  //   console.log(playlist.childNodes);
  const divImg = document.querySelectorAll(".playlist img")[indexofArray];
  const divText = document.querySelectorAll(".playlist div p")[indexofArray];
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
