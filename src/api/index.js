import axios from "axios";

// const city_name = 'thane';
const api_key = '0937133dd6ec6c21ec5f1b2ba0ea1429';
const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${api_key}&`;

export const fetchData = (cityName) => axios.get(`${url}q=${cityName}`);