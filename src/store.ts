import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weatherSlice";

const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;