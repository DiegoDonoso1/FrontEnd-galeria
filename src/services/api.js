import axios from "axios";
const API_URL = "https://exalted-crane-405616.rj.r.appspot.com/";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

//produccion
//https://exalted-crane-405616.rj.r.appspot.com/

//local
//http://localhost:3000/
