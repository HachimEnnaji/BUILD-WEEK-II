import { URL, token, options, search, playlist } from "./token.js";

const arrArtist = [
  "Eminem",
  "Rihanna",
  "The Beatles",
  "Taylor Swift",
  "Imagine Dragons",
  "Linkin Park",
  "Oasis",
  "Drake",
  "Katy Perry",
  "Laura Pausini",
  "Eros Ramazzotti",
  "Zucchero",
  "Ariana Grande",
  "Alicia Keys",
  "Beyonce",
  "Jay Z",
  "50 Cent",
  "Lana Del Rey",
  "The Weeknd",
  "Laday Gaga",
  "Ed Sheeran",
  "Harry Styles",
  "Bruno Mars",
  "Miley Cirus",
  "Charlie Puth",
  "Selena Gomez",
  "Shakira",
  "Pink",
  "John Legend",
  "Adam Levine",
  "Future",
  "Billie Eilish",
  "Adele",
  "Justin Bieber",
  "Dua Lipa",
  "Shawn Mendes",
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
    console.log(data);
    const selection = data.data[1];
    const title = document.getElementById("albumTitle");
    const artist = document.getElementById("albumArtist");
    const textArtist = document.getElementById("textArtist");
    const linkArtistImg = document.getElementById("linkArtistImg");
    const playButton = document.getElementById("playButton");
    console.log(playButton);
    playButton.addEventListener("click", function () {
      const playerBarImg = document.getElementById("playeBarImg");
      console.log(selection.album.cover_big);
      const titleAlbum = document.getElementById("titleAlbum");
      const nameArtist = document.getElementById("nameArtist");
      playerBarImg.setAttribute("src", selection.album.cover_big);
      titleAlbum.innerHTML = selection.album.title;
      nameArtist.innerHTML = selection.artist.name;

      const audio = document.getElementById("audio");
      const playerBar = document.getElementById("playerBar");
      const playStop = document.getElementById("playStop");
      audio.style.display = "none";
      audio.src = selection.preview;
      audio.play();
      playButton.innerHTML = "Pause";
      audio.addEventListener("timeupdate", () => {
        const percentage = (100 / audio.duration) * audio.currentTime;

        const progressbar = document.querySelector(".progressPlay");
        progressbar.style.width = percentage + "%";
      });

      playButton.addEventListener("click", function () {
        if (audio.paused) {
          playButton.innerHTML = "Pause";

          audio.play();
        } else {
          playButton.innerHTML = "Play";
          audio.pause();
        }
      });

      playStop.classList.toggle("bi-play-circle-fill");

      playStop.classList.toggle("bi-pause-circle-fill");

      // audio.load();

      // audio.play();
      // playerBar.appendChild(audio);
    });
    linkArtistImg.innerHTML = `<a  class="text-decoration-none" href="./album.html?id=${selection.album.id}"><img src="${selection.album.cover_big}" alt="album foto" id="albumImg" /></a>`;
    // console.log(selection.album.id);
    title.innerHTML = `<a  class="text-decoration-none text-white display-4 fw-bold" href="./album.html?id=${selection.album.id}">${selection.album.title}</a>`;
    artist.innerHTML = `<a class="text-decoration-none text-white"  href="./artist.html?q=${params}">${selection.artist.name}</a>`;
    textArtist.innerHTML = `<a class="text-decoration-none text-white"  href="./artist.html?q=${params}">${selection.artist.name}</a>`;
    const albums = document.querySelectorAll(".album");
    console.log(albums);
    albums.forEach((album, indexOfArray) => {
      const albumImage = album.querySelector("img");
      const albumText = album.querySelector(".card-text");
      const link = album.querySelector(".link");
      link.setAttribute("href", "./album.html?id=" + data.data[indexOfArray].album.id);
      albumImage.setAttribute("src", `${data.data[indexOfArray].album.cover_big}`);
      albumText.innerHTML = `${data.data[indexOfArray].title}`;
    });
    //                                                   ---------------------- aggiunta -

    //                                                   ---------------------- Fine aggiunta
  })
  .catch((Error) => {
    console.log("error" + Error);
  });

const div = document.querySelectorAll(".playlist");
div.forEach((element) => {
  const divImg = element.querySelector(" img");
  const divText = element.querySelector("p ");
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
