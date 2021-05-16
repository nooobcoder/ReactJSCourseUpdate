import React, { useReducer, useEffect, useCallback } from "react";
import "./App.css";

import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";

const App = () => {
	const apiManagerReducer = (prevState, { type, payload }) => {
		switch (type) {
			case "FETCH_MOVIES":
				return { movies: payload, loading: true };
			case "SET_LOADING":
				return { ...prevState, loading: payload };
			case "RAISE_ERROR":
				return { ...prevState, loading: false, error: payload };
			default:
				return prevState;
		}
	};

	const initialState = { movies: [], loading: false, error: null };
	const [{ movies, loading, error }, apiReducer] = useReducer(
		apiManagerReducer,
		initialState
	);

	const fetchMoviesHandler = useCallback(async () => {
		try {
			const responseStream = await fetch(
				`${process.env.REACT_APP_API_ENDPOINT}/movies.json`,
				{
					method: "GET",
				}
			);
			if (responseStream.status === 404) {
				throw new Error(
					`Something went wrong! Error code: ${responseStream.status}`
				);
			}
			const data = await responseStream.json();
			const transformedMovies = [];
			for (const [key, value] of Object.entries(data)) {
				transformedMovies.push({ ...value, id: key });
			}

			apiReducer({ type: "FETCH_MOVIES", payload: transformedMovies });
			setTimeout(() => {
				// ! Added 1.5 sec delay to fake loading state appearance
				apiReducer({ type: "SET_LOADING", payload: false }); // STOP loading after movies has been loaded
			}, 1500);
		} catch (error) {
			apiReducer({ type: "RAISE_ERROR", payload: error.message });
		}
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	const addMovieHandler = async (movie) => {
		const config = {
			method: "POST",
			mode: "cors",
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
			},
			referrerPolicy: "no-referrer",
		};
		const response = await fetch(
			`${process.env.REACT_APP_API_ENDPOINT}/movies.json`,
			{
				...config,
				body: JSON.stringify(movie),
			}
		);
		// const data = await response.json();
	};

	return (
		<React.Fragment>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
			<section>
				<button
					onClick={(event) => {
						event.preventDefault();
						fetchMoviesHandler();
					}}
				>
					Fetch Movies
				</button>
			</section>
			<section>
				{!loading && movies.length >= 1 && !error && (
					<MoviesList movies={movies} />
				)}
				{!error && !loading && movies.length === 0 && (
					<p>Found no movies!</p>
				)}
				{loading && <p>Loading movies!</p>}
				{error && !loading && <p>{error}</p>}
			</section>
		</React.Fragment>
	);
};

export default App;
