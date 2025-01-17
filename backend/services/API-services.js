import axios from "axios";
import { ENV_variables } from "../config/envVariables.js";
export const fetchAPI = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer" + ENV_variables.API_KEY,
    },
  };
  const respone = await axios.get(url, options);
  if (respone.status !== 200) {
    throw new Error("Failed to fetch data from API" + respone.statusText);
  }
  return respone.data;
};
