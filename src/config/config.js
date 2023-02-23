
import axios from "axios";

// const user = JSON.parse(localStorage.getItem("persist:root")).user;
// const currentUser = user && JSON.parse(user)?.user;
// const token = currentUser?.token;

export const axiosInstance = axios.create({
    baseURL: 'https://colloblog.azurewebsites.net/api/',

  });


 

  