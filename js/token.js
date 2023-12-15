const URL = "https://deezerdevs-deezer.p.rapidapi.com/";
const token = "8f76b272f2msh3aee6aa14119e3bp1a1f1bjsnf563f456d57b";

const search = "search?q=";
const playlist = "playlist/";
const album = "album/";
const options = {
  method: "GET",
  url: URL,
  headers: {
    "X-RapidAPI-Key": token,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};
function convertMinutes(seconds) {
  let minuti = Math.floor(seconds / 60);
  let restingSeconds = seconds % 60;

  restingSeconds = restingSeconds < 10 ? "0" + restingSeconds : restingSeconds;

  return minuti + ":" + restingSeconds;
}
export { URL, token, options, search, playlist, album, convertMinutes };
