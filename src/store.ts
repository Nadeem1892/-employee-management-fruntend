import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./Service/Api/ApiService";
// import paginationReducer from "./Service/slices/Pagination/paginationSlice"; // Import the reducer
import AuthSlice from "./Service/Slices/Auth/AuthSlice";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        // pagination: paginationReducer, // Use the reducer here
        auth:AuthSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware),
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
export default store;
