import React from 'react'
import Display from '../pages/DisplayCards/display';
import CityWeatherData from '../pages/CityWeatherData';
import {
    Switch,
    Route,
} from "react-router-dom";

const Routes = () => {
    return (
        <Switch>
            <Route path="/:cityname/:day" component={CityWeatherData} />
            <Route exact path="/" component={Display} />
        </Switch>
    )
}

export default Routes;
