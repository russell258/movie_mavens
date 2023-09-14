import { Component, EventEmitter, Output } from '@angular/core';
import { MovieService } from './movie.service';
import { MovieModel, ResultsEntity } from './movie-model';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  currentPage$ = new BehaviorSubject(1);

  latestMovie: any;
  popularMovies !: MovieModel;
  playingNow !: MovieModel;
  topRatedMovies !: MovieModel;
  upcomingMovies !: MovieModel;
  trendingMovies !: MovieModel;
  moviesList: any;

  subLatestMovie! : Subscription;
  subPopularMovies! : Subscription;
  subPlayingNow !: Subscription;
  subTopRatedMovies !: Subscription;
  subUpcomingMovies!: Subscription;
  subTrendingMovies!: Subscription;
  subMoviesList!:Subscription;

  constructor(private movieSvc: MovieService){}

  //split this later

  ngOnInit():void{
    this.getPopularMovies();
    this.getNowPlayingMovie();
    this.getTopRatedMovies();
    this.getUpcomingMovies();
    this.getThisWeekTrendingMovies();
    this.getMoviesList();
  }

  getPopularMovies(){
    this.subLatestMovie=this.movieSvc.getMoviesTwoPaths('movie','popular',1).subscribe({
      next: (v) => {
        this.modifyBackdrop(v)
        this.popularMovies = v
      },
      error: (e) => console.error(e),
      complete:()=> {
        console.log(this.popularMovies);
      }
    });
  }

  getNowPlayingMovie(){
    this.subPlayingNow=this.movieSvc.getMoviesTwoPaths('movie','now_playing',1).subscribe({
      next: (v) => {
        this.modifyBackdrop(v);
        this.playingNow = v
      },
      error: (e) => console.error(e),
      complete:() => console.log(this.playingNow)
    });
  }

  getTopRatedMovies(){
    this.subTopRatedMovies=this.movieSvc.getMoviesTwoPaths('movie','top_rated',1).subscribe({
      next: (v) => {
        this.modifyBackdrop(v);
        this.topRatedMovies = v
      },
      error: (e) => console.error(e),
      complete:() => console.log(this.topRatedMovies)
    });
  }

  getUpcomingMovies(){
    this.subUpcomingMovies=this.movieSvc.getMoviesTwoPaths('movie','upcoming',1).subscribe({
      next: (v) => {
        this.modifyBackdrop(v);
        this.upcomingMovies = v
      },
      error: (e) => console.error(e),
      complete:() => console.log(this.upcomingMovies)
    });
  }

  getThisWeekTrendingMovies(){
    this.subTrendingMovies=this.movieSvc.getMoviesThreePaths('trending','movie','week',1).subscribe({
      next: (v) => {
        this.modifyBackdrop(v);
        this.trendingMovies = v;
      },
      error: (e) => console.error(e),
      complete:() => console.log(this.trendingMovies)
    });
  }

  //use for filtering genres later on
  getMoviesList(){
    this.subMoviesList=this.movieSvc.getMoviesThreePaths('genre','movie','list',1).subscribe({
      next: (v) => this.moviesList = v,
      error: (e) => console.error(e),
      complete:() => console.log(this.moviesList)
    });
  }

  modifyBackdrop(movie : MovieModel): MovieModel{
    if (movie.results){
      movie.results.forEach( m => {
        m.backdrop_path = 'https://image.tmdb.org/t/p/original' + m.backdrop_path + '?api_key=' + environment.api_key;
        if (!m.title && m.name){
          m.title = m.name;
        }
      });
    }
    return movie;
  }

  writeReview(movie: any){
    this.movieSvc.movieData.next(movie);
  }

}


