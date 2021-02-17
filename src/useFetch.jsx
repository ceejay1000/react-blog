import { useState, useEffect } from "react";

const useFetch = (url) => {
   const [data, setBlogs] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);

    useEffect(() => {
        const abortCtrl = new AbortController();

        setTimeout(() => {
            fetch(url, {
                signal: abortCtrl.signal
            })
            .then(res => {
                console.log(res)
                if (!res.ok){
                    throw Error("Could not fetch data")
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                setBlogs(data)
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                if (err.name === "AbortError"){
                    abortCtrl.abort();
                    console.log(err)
                } else {
                    setError(err.message)
                    setIsPending(false);
                }
            })
        }, 1000)

        return () => { abortCtrl.abort(); console.log("Clean up ")}
    }, [url]);

    return {
        data,
        isPending,
        error
    }
}

export default useFetch;