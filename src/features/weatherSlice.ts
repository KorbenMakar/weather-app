import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_WEATHERPERSON_API_KEY;


interface WeatherState {
    data: any;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city: string, {rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error fetching weather");
        }
    }
);

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchWeather.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default weatherSlice.reducer;

