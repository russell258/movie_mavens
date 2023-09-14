import { Component, SimpleChanges } from '@angular/core';
import { MovieModel } from '../movie/movie-model';
import { MovieService } from '../movie/movie.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {

  pageNo = 1;

  topList !: any;

  constructor(private movieSvc: MovieService){}

  ngOnInit():void{
      this.getTopMoviesWithPagination();
  }

  ngOnChanges(changes: SimpleChanges){
      this.getTopMoviesWithPagination();
  }

  nextPage(){
    this.pageNo++;
    this.getTopMoviesWithPagination();
  }

  previousPage(){
    this.pageNo--;
    this.getTopMoviesWithPagination();
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

  private getTopMoviesWithPagination(){
    this.movieSvc.getMoviesTwoPaths('movie','top_rated',this.pageNo).subscribe(
      (v)=>{
        console.log(v);
        this.modifyBackdrop(v);
        this.topList=v;
      }
    )
  }

}
