import axios from "axios";
axios.defaults.baseURL = `${import.meta.env.VITE_MAIN_URL}`;
axios.defaults.withCredentials = true;
