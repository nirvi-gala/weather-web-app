import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const CityWeatherData = (props) => {
    let [graphData, setGraphData] = useState([]);
    const weatherForecast = useSelector((state) => state.weatherForecast);
    const { filteredData } = weatherForecast;
    const propsDay = parseInt(props.match.params.day);
    const dateTime = new Date(propsDay * 1000);
    const date = dateTime.getDate();
    let dateData = filteredData[date];

    useEffect(() => {
        if(dateData && Array.isArray(dateData)){
            let temp = [];
            dateData.forEach((d) => {
                console.log(d)
                let time = new Date(d.dt * 1000);
                let timeParams = time.getHours();
                if(d && d.main){
                    let obj = {
                        'name': timeParams,
                        'temperature': d.main.temp,
                        'humidity': d.main.humidity,
                        'pressure': d.main.pressure,
                    }
                    temp.push(obj);
                }
            })
            graphData = [...temp]
            setGraphData(graphData)
        }
    }, [filteredData]);


    return (
        <LineChart width={500} height={300} data={graphData}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
            <Line type="monotone" dataKey="pressure" stroke="#fe980f" />
            <Tooltip />
        </LineChart>
    )
}

export default withRouter(CityWeatherData)
