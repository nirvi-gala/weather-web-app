import * as api from "../api";
import { FETCH_WEATHER_DATA, ERROR_FETCHING_WEATHER_DATA, LOADING_WEATHER_DATA, SET_FILTERED_DATA } from "../constants/weatherConst"

export const fetchData = (cityName) => async(dispatch) => {
    try{
        dispatch({ type: LOADING_WEATHER_DATA, payload: true });
        const { data } = await api.fetchData(cityName)
        dispatch({ type: FETCH_WEATHER_DATA, payload: data });
    }catch(err){
        dispatch({ type: ERROR_FETCHING_WEATHER_DATA, payload: err });
    }
}

export const dayFilteredData = (data) => ({
    type: SET_FILTERED_DATA, 
    payload: data 
})