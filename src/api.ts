import axios from "axios";

export const api = axios.create({
  baseURL: `/api`, // see vite config proxy
});
