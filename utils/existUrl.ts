"use client"
export const existRouteInUrl =(path:string)=>{
    const pathname = window?.location?.href;
    const isExist = !!pathname?.split?.("/").includes(path);
    return isExist
}