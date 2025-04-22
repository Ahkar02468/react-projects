import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];
const KEY = "7256e237";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedWatched = localStorage.getItem("watched");
    return storedWatched ? JSON.parse(storedWatched) : [];
  });
  function handleSelectedMovie(id) {
    setSelectedMovie((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovieDetails() {
    setSelectedMovie(null);
  }
  function handleAddWatchMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handelWatchedMovieDelete(id) {
    console.log("You clicked delete btn");
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);
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
    handleCloseMovieDetails();
    fetchData();
  }, [query]);

  return (
    <>
      <Navbar query={query} setQuery={setQuery}>
        <NumResults movies={movies} />
      </Navbar>
      <Main
        errorMessage={errorMessage}
        isLoading={isLoading}
        movies={movies}
        watched={watched}
        selectedMovie={selectedMovie}
        onSelectedMovie={handleSelectedMovie}
        onCloseMovieDetails={handleCloseMovieDetails}
        onAddWatch={handleAddWatchMovie}
        onDeleteWatchedMovie={handelWatchedMovieDelete}
      />
    </>
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
