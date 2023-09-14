import { Component, SimpleChanges } from '@angular/core';
import { MovieService } from '../movie/movie.service';
import { Subscription } from 'rxjs';
import { MovieModel } from '../movie/movie-model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.css']
})
export class PlayingComponent {

  pageNo = 1;

  playingList !: any;

  constructor(private movieSvc: MovieService){}

  ngOnInit():void{
      this.getPlayingMoviesWithPagination();
  }

  ngOnChanges(changes: SimpleChanges){
      this.getPlayingMoviesWithPagination();
  }

  nextPage(){
    this.pageNo++;
    this.getPlayingMoviesWithPagination();
  }

  previousPage(){
    this.pageNo--;
    this.getPlayingMoviesWithPagination();
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

  private getPlayingMoviesWithPagination(){
    this.movieSvc.getMoviesTwoPaths('movie','now_playing',this.pageNo).subscribe(
      (v)=>{
        console.log(v);
        this.modifyBackdrop(v);
        this.playingList=v;
      }
    )
  }



}
