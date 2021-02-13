import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { dayFilteredData } from '../../actions/weatherActions'
import SearchContainer from "../SearchContainer"; 
import snowImg from '../../weatherImages/snowy.jpg'
import './display.css';

const Display = () => {
    const [dailyWeather, setDailyWeather] = useState({})
    const [cityData, setCityData] = useState({})
    const weatherForecast = useSelector((state) => state.weatherForecast);
    const { weatherData, error, loading } = weatherForecast;
    const dispatch = useDispatch();

    useEffect(() => {
        if(weatherData && weatherData.list && Array.isArray(weatherData.list)){
            let dailyForecast = {};
            let workingData= {}
            weatherData.list.map(item => {
                const dateTime = new Date(item.dt * 1000);
                const day = dateTime.getDate();
                const time = dateTime.getHours();
                if(!dailyForecast[day]){
                    dailyForecast[day]=[];
                    dailyForecast[day].push({...item,day,time});    
                } 
                if(!workingData[day]){
                    workingData[day]=[];
                }
                workingData[day].push({...item,day,time});  
            });
            dispatch(dayFilteredData(workingData));
            setDailyWeather(dailyForecast);
            setCityData(weatherData.city);
        }
    }, [weatherData]);

    return (
        <>
            <SearchContainer />
            {
                error ? <h1>Please Check The City And Try Again...</h1>
                : loading ? <h1>Loading...</h1>
                : Object.keys(dailyWeather).map((key) => {
                    let currentData = dailyWeather[key][0];
                    let currentDataWeather = currentData.weather[0]
                    let imgSrc = currentDataWeather.icon ? `http://openweathermap.org/img/w/${currentDataWeather.icon}.png`: snowImg;
                    let link = `/${cityData.name.toLowerCase()}/${currentData.dt}`
                    return <Link to={link} key={key}><div className="card">
                        <img src={imgSrc} alt="Avatar" style={{ width:'100%', backgroundColor: 'skyblue'}} />
                        {
                            currentData ? 
                                <div className="container">
                                    <label>Temperature:</label>
                                    <p>{currentData.main.temp_max} - {currentData.main.temp_min}</p>
                                    <label>Co-ordinates:</label>
                                    <p>{cityData.coord.lat} - {cityData.coord.lon}</p>
                                    <label>Humidity:</label>
                                    <p>{currentData.main.humidity}</p>
                                    <label>Sunrise:</label>
                                    <p>{cityData.sunrise}</p>
                                    <label>Sunset:</label>
                                    <p>{cityData.sunset}</p>
                                </div> 
                            : null
                        }
                    </div></Link>
                })
            }
        </>
    )
}

export default Display;
