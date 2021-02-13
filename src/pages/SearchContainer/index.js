import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../actions/weatherActions';

function SearchContainer() {
    const [cityName, setCityName] = useState('Mumbai');
    const dispatch = useDispatch();
    
    const searchCity = (e) => {
        e.preventDefault();
        dispatch(fetchData(cityName))
    }

    useEffect(() => {
        if(cityName){
            dispatch(fetchData(cityName));
        }
    }, [dispatch]);

    return (
        <div className="search-container">
            <form onSubmit={(e) => searchCity(e)}>
                <input type="text" placeholder="Search.." value={cityName} onChange={(e) => setCityName(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchContainer;