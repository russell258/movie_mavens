import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieModel, ResultsEntity } from "../movies/movie/movie-model";

export const selectMovies=createFeatureSelector<ReadonlyArray<ResultsEntity>>('movies');

export const selectMoviesSelector = createSelector(
  selectMovies,
  (movies) =>{
    //note might need to do movies.resultEntity instead
    return movies;
  }
)
