"use client";
import axios, {
   AxiosError,
   AxiosRequestConfig,
} from "axios";
import { useEffect } from "react";

const BASE_API_ENDPOINT = "http://localhost:5000";

axios.interceptors.response.use(null, (error) => {
   const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
   if (!expectedError) {
      console.error("مشکلی از سمت سرور رخ داده است");
   }
   return Promise.reject(error);
});

export default function useApi() {
   var token;
   useEffect(() => {
      token = localStorage.getItem("token");
   }, []);

   if (token !== "undefined" && token != null && token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }

   axios.defaults.headers.common["Content-Type"] = "application/json";

   async function post(
      path: string,
      body: object,
      config?: AxiosRequestConfig
   ) {
      try {
        return await axios
            .post(BASE_API_ENDPOINT + path, body, config)
            .then((data) => {
               return data.data;
            })
            .catch((e: Error | AxiosError) => {
               if (axios.isAxiosError(e)) {
                  throw new Error(e.response?.data["message"]);
               }
               throw new Error(e.message);
            });
      } catch (error:any) {
         throw error;
      }
   }
   return { post };
}