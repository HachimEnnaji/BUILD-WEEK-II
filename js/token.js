const URL = "https://deezerdevs-deezer.p.rapidapi.com/";
const token = "8f76b272f2msh3aee6aa14119e3bp1a1f1bjsnf563f456d57b";
const search = "search?q=";
const playlist = "playlist/";
const options = {
  method: "GET",
  url: URL,
  headers: {
    "X-RapidAPI-Key": "8f76b272f2msh3aee6aa14119e3bp1a1f1bjsnf563f456d57b",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};
export { URL, token, options, search, playlist };
