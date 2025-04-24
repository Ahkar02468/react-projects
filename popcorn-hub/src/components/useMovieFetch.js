import { useEffect, useState } from "react";

export function useMovieFetch(query) {
  const KEY = "7256e237";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok)
          throw new Error("Somethig went wrong while fetching movies...");
        const data = await res.json();
        if (data.Response == "False") {
          throw new Error(data.Error || "No movies found");
        }
        setMovies(data.Search);
        // console.log(data);
        setErrorMessage("");
      } catch (error) {
        // console.error(error.message);
        if (error !== "AbortError") setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (!query.length) {
      setMovies([]);
      setErrorMessage("");
      return;
    }
    //     handleCloseMovieDetails();
    fetchData();
  }, [query]);

  return { movies, isLoading, errorMessage };
}
