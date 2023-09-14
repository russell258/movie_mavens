import { createReducer, on } from "@ngrx/store";

import { MovieModel, ResultsEntity } from "../movies/movie/movie-model";
import { MoviesApiActions } from "./write.actions";


export const initialState: ReadonlyArray<ResultsEntity> = [];

export const moviesReducer =createReducer(
  initialState,
  on(MoviesApiActions.retrievedMovies, (_state, {movies}) => movies)
)
