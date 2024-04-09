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
   var token:string|null;
   useEffect(() => {
      token = localStorage.getItem("token");
      if ( !!token  && token) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
   }, []);


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

   async function put(
      path: string,
      body: object,
      config?: AxiosRequestConfig
   ) {
      try {
         return await axios
            .put(BASE_API_ENDPOINT + path, body, config)
            .then((data) => {
               return data.data;
            })
            .catch((e: Error | AxiosError) => {
               if (axios.isAxiosError(e)) {
                  throw new Error(e.response?.data["message"]);
               }
               throw new Error(e.message);
            });
      } catch (error: any) {
         throw error;
      }
   }


   async function get(
      path: string,
      config?: AxiosRequestConfig
   ) {
      if (!!!token) throw new Error("Token is null")
      try {
         return await axios
            .get(BASE_API_ENDPOINT + path, config)
            .then((data) => {
               return data.data;
            })
            .catch((e: Error | AxiosError) => {
               if (axios.isAxiosError(e)) {
                  throw new Error(e.response?.data["message"]);
               }
               throw new Error(e.message);
            });
      } catch (error: any) {
         throw error;
      }
   }


   async function delete_(
      path: string,
      config?: AxiosRequestConfig
   ) {
      let token = localStorage.getItem("token")
      console.log('token', token)
      if (!!!token) throw new Error("Token is null")
      try {
         return await axios
            .delete(BASE_API_ENDPOINT + path, config)
            .then((data) => {
               return data.data;
            })
            .catch((e: Error | AxiosError) => {
               if (axios.isAxiosError(e)) {
                  throw new Error(e.response?.data["message"]);
               }
               throw new Error(e.message);
            });
      } catch (error: any) {
         throw error;
      }
   }


   return { post, get, delete_ ,put };
}