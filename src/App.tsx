import {useState} from 'react'
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "./store.ts";
import {fetchWeather} from "./features/weatherSlice.ts";

function App() {
    const [city, setCity] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const {data, loading, error} = useSelector((state: RootState) => state.weather);

    const handleSearch = () => {
        if (city.trim()) {
            dispatch(fetchWeather(city));
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Weather App</h1>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button onClick={handleSearch}>Search</button>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : data ? (
                    <div>
                        <h2>{data.name}</h2>
                        <p>{data.weather[0].description}</p>
                        <p>Temperature: {data.main.temp}°C</p>
                    </div>
                ) : null}
            </header>
        </div>
    )
}

export default App
