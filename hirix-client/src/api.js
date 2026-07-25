import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.hirix.com.pk";

// Central Axios instance - saare API calls yahan se jayenge
const API = axios.create({
  baseURL: API_BASE_URL,
});

// Export base URL separately for image src construction
export const BASE_URL = API_BASE_URL;

export default API;
