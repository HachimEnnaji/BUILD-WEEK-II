const URL = "https://deezerdevs-deezer.p.rapidapi.com/";
const token = "59d4c99753msh78ad53efec66216p196072jsnf7e088b75eb8";
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
