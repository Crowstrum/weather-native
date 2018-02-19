import config from '../config';
import axios from 'axios';
export const FETCHING_LOCATION = 'weather/FETCHING_LOCATION';
export const LOCATION_FOUND = 'weather/LOCATION_FOUND';
export const ERROR_GETTING_LOCATION = 'weather/ERROR_GETTING_LOCATION';
export const ERROR_GETTING_WEATHER = 'weather/ERROR_GETTING_WEATHER';
export const FETCHING_WEATHER_DATA = 'weather/FETCHING_WEATHER_DATA';
export const WEATHER_DATA_RECEIVED = 'weather/WEATHER_DATA_RECEIVED';

const weatherApi = `https://api.darksky.net/forecast/${config.API_KEY}`;

const initState = {
    isLoading: true,
    currentLat: 0,
    currentLon: 0,
    currentWeather: {},
    error: ''
};
export default function weather(state=initState,action){
    switch(action.type){
        case FETCHING_LOCATION:
            return Object.assign({},state,{
                isLoading: true
            });
        case LOCATION_FOUND:
            return Object.assign({},state,{
                isLoading: false,
                currentLat: action.payload.lat,
                currentLon: action.payload.lon
            });
        case FETCHING_WEATHER_DATA:
            return Object.assign({},state,{
                isLoading: true
            });
        case WEATHER_DATA_RECEIVED:
            return Object.assign({}, state, {
               isLoading: false,
                currentWeather: action.payload.currently
            });
        case ERROR_GETTING_WEATHER:
        case ERROR_GETTING_LOCATION:
            return Object.assign({},state,{
                error: action.payload
            });
        default: return state;
    }
}
// Gets a user's current lat and lon, then makes a request to the weather api using this information
export const fetchRequiredData = () => {
    return dispatch => {
        dispatch({type:FETCHING_LOCATION});
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(setLocation(position.coords.latitude,position.coords.longitude));
                dispatch(fetchWeatherData());
            },
            (error) => dispatch(locationError(error.message)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        )
    }
};

// Sets a users current location
export const setLocation = (lat,lon) => ({
        type: LOCATION_FOUND,
        payload: {lat: lat, lon: lon}
});

// Api call, gets weather data based on current location
export const fetchWeatherData = () => {
    return (dispatch,getState) => {
        dispatch({type: FETCHING_WEATHER_DATA });
        const {currentLat,currentLon} = getState().weather;

        axios.get(`${weatherApi}/${currentLat},${currentLon}`)
            .then((res)=>{
                dispatch({type:WEATHER_DATA_RECEIVED,payload:res.data})
            })
            .catch((err)=>{
                dispatch({type:ERROR_GETTING_WEATHER,payload: err.data})
            })
    }
};

export const locationError = (error) => ({
    type: ERROR_GETTING_LOCATION,
    payload: error
});