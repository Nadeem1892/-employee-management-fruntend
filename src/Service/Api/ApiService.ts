import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/v1/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("auth");
            if (token) {
              headers.set("x-access-token", token);
            }
            return headers;
          },
    }),
    tagTypes: ["employee"],
    endpoints: () => ({})
})

