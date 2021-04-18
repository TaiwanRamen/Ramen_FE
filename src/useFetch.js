import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const abortCont = new AbortController(); //when update state, when no state to update, abort

    const fetchBlogs = async(url) => {
        try{
            let res = await fetch(url, {signal: abortCont.signal});
    
            if(!res.ok){
                throw new Error("could not fetch data ")
            }
            let data = await res.json();
            setData(data);
            setIsLoading(false);
            setError(null);
        } catch (error) {
            if(error.name === "AbortError") {
                console.log('fetch abort');
            } else {
                setError(error.message);
                setIsLoading(false);
            }
        
        }
        
    }
    
    useEffect(()=>{
        setTimeout(() => {
            fetchBlogs(url);
        }, 1000)
        return () => {
            abortCont.abort();
        }
    }, [url])  //when url is changed, rerun

    return {data, isLoading, error}

}





export default useFetch