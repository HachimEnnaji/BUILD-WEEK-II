import { URL, token, options, search, playlist } from "./token.js";
const params = new URLSearchParams(window.location.search);

const paramsid = params.has("id") ? params.get("id") : params.get("q");
console.log(paramsid);
