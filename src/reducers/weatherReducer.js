import { FETCH_WEATHER_DATA, ERROR_FETCHING_WEATHER_DATA, LOADING_WEATHER_DATA, SET_FILTERED_DATA } from "../constants/weatherConst";

const INITIAL_STATE = {
    weatherData: [],
    error: false,
    loading: false,
    filteredData: {},
}

const weatherReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_WEATHER_DATA:{
            let data = []
            let weatherData = action.payload;
            if(weatherData){
                const allowed = ['city', 'list'];
                const filtered = Object.keys(weatherData)
                .filter(key => allowed.includes(key))
                .reduce((obj, key) => {
                    obj[key] = weatherData[key];
                    return obj;
                }, {});  
                data = filtered                
                return {
                    ...state,
                    error: false,
                    loading: false,
                    weatherData: data
                };
            }else{
                return state
            }
        }
        case ERROR_FETCHING_WEATHER_DATA:{
            return {
                ...state,
                error: true,
                loading: false,
            };
        }
        case LOADING_WEATHER_DATA:{
            return {
                ...state,
                error: false,
                loading: true,
            };
        }
        case SET_FILTERED_DATA:{
            return {
                ...state,
                filteredData: action.payload,
            }
        }
        default:
            return state;
    }
}

export default weatherReducer;