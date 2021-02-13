import { combineReducers } from "redux";
import weatherForecast from "./weatherReducer";
// import searchCity from "./searchCity";

export default combineReducers({ 
    weatherForecast,
    // searchCity, 
});