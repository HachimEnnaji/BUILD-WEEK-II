import { URL, token, options, search, playlist } from "./token.js";
const params = new URLSearchParams(window.location.search);
const paramsid = params.has("id") ? params.get("id") : params.get("q");
console.log(paramsid);

const randomNumber = () => {
  let n = Math.floor(Math.random() * 1000000 + 2000000);
  return n;
};
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
    background.style.backgroundImage = `URL(${artist.artist.picture_xl})`;

    background.style.objectFit = "contain";
    background.style.backgroundPositionY = "20%";
    background.style.backgroundPositionX = "center";
    rank.innerHTML = randomNumber().toLocaleString();
    console.log(rank);
    artistContainer.innerHTML = artist.artist.name;
    console.log(artistContainer);
  })
  .catch((error) => {
    console.log("errore");
  });
