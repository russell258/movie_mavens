import {createActionGroup, props} from '@ngrx/store';
import { MovieModel, ResultsEntity } from '../movies/movie/movie-model';

export const WriteActions = createActionGroup({
  source:'movie-model',
  events:{
    'Add Movie Review':props<{id:string}>(),
    'Remove Movie Review': props<{id:string}>(),
  },
});

export const MoviesApiActions = createActionGroup({
  source:'Movies API',
  events:{
    'Retrieved Movies': props<{movies: ReadonlyArray<ResultsEntity>}>(),
  },
})
