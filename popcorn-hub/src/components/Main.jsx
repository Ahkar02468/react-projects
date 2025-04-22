import { useEffect, useRef, useState } from "react";
import ShowStar from "./ShowStar";
const KEY = "7256e237";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const Main = ({
  movies,
  watched,
  isLoading,
  errorMessage,
  selectedMovie,
  onSelectedMovie,
  onCloseMovieDetails,
  onAddWatch,
  onDeleteWatchedMovie,
}) => {
  return (
    <main className="main">
      {/* <ListBox movies={movies} /> */}
      <Box>
        {isLoading && <Loading />}
        {!isLoading && !errorMessage && (
          <MovieList
            selectedMovie={selectedMovie}
            onSelectedMovie={onSelectedMovie}
            onCloseMovieDetails={onCloseMovieDetails}
            movies={movies}
          />
        )}
        {errorMessage && <Error errorMessage={errorMessage} />}
      </Box>
      <Box>
        {selectedMovie ? (
          <MovieDetails
            watched={watched}
            onAddWatch={onAddWatch}
            isLoading={isLoading}
            onSelectedMovie={onSelectedMovie}
            selectedMovie={selectedMovie}
            onCloseMovieDetails={onCloseMovieDetails}
          />
        ) : (
          <>
            <WatchSummary watched={watched} />
            <WatchMovieList
              watched={watched}
              onDeleteWatchedMovie={onDeleteWatchedMovie}
            />
          </>
        )}
        {/* <ShowStar maxStar={10} onSetRating={setMovieRating} />
        <div>This movie was rated {movieRating} star.</div> */}
      </Box>
    </main>
  );
};

function MovieDetails({
  selectedMovie,
  onCloseMovieDetails,
  onAddWatch,
  watched,
}) {
  // console.log(selectedMovie);
  // console.log(selectedMovie);
  const [movie, setMovie] = useState({});
  const [detailLoading, setDetailLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef([]);
  useEffect(() => {
    if (userRating) countRef.current.push(userRating);
  }, [userRating]);
  // console.log(userRating);
  const {
    Actors: actors,
    Awards: awards,
    Country: country,
    Director: director,
    Genre: genre,
    Poster: poster,
    Plot: plot,
    Released: release,
    Title: title,
    imdbRating,
    Runtime: runtime,
    Year: year,
  } = movie || {};
  function handleAddWatch() {
    const newWatchedMovie = {
      imdbID: selectedMovie,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
      countHistory: countRef.current,
    };
    onAddWatch(newWatchedMovie);
    onCloseMovieDetails();
  }
  useEffect(() => {
    function handleEscKeyDown(e) {
      if (e.key === "Escape") {
        onCloseMovieDetails();
      }
    }

    document.addEventListener("keydown", handleEscKeyDown);
    //clean up function
    return function () {
      document.removeEventListener("keydown", handleEscKeyDown);
      console.log("Clean up with Esc key");
    };
  }, [onCloseMovieDetails]);
  useEffect(() => {
    async function getMovieDetails() {
      setDetailLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovie}`
      );
      const data = await res.json();
      // console.log(data);
      if (data.Response === "True") {
        setMovie(data);
        setDetailLoading(false);
      } else {
        setMovie(null);
      }
    }
    getMovieDetails();
  }, [selectedMovie]);
  useEffect(() => {
    document.title = `Movie | ${title}`;
    return function () {
      document.title = "Popcorn Hub";
    };
  }, [title]);
  return (
    <div className="details">
      {detailLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovieDetails}>
              <span className="arrow-icon">←</span>
              <span className="back-text">Back</span>
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {release} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {watched.some(
                (watchedMovie) => watchedMovie.imdbID === selectedMovie
              ) ? (
                <p>
                  You have already made it with{" "}
                  {watched.map((watch) =>
                    watch.imdbID === selectedMovie ? watch.userRating : ""
                  )}{" "}
                  ⭐.
                </p>
              ) : (
                <ShowStar maxStar={10} size={40} onSetRating={setUserRating} />
              )}
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAddWatch}>
                  + Add to list
                </button>
              )}
            </div>
            <p>{plot}</p>
            <p>Starring - {actors}</p>
            <p>Directed by - {director}</p>
            <p>Awards - {awards}</p>
            <p>Country - {country}</p>
          </section>
        </>
      )}
    </div>
  );
}
const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

function Error({ errorMessage }) {
  return (
    <p className="error">
      <span>⛔</span> {errorMessage}
    </p>
  );
}

function Loading() {
  return <p className="loader">Loading...</p>;
}
function MovieList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          onSelectedMovie={onSelectedMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function WatchSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
function WatchMovieList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}
function WatchMovie({ movie, onDeleteWatchedMovie }) {
  // console.log(movie.imdbID);
  return (
    <li>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          onClick={() => onDeleteWatchedMovie(movie.imdbID)}
          className="btn-delete">
          x
        </button>
      </div>
    </li>
  );
}
export default Main;
