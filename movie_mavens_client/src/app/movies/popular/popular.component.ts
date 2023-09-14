import { Component, SimpleChanges } from '@angular/core';
import { MovieModel } from '../movie/movie-model';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie/movie.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent {
  pageNo = 1;

  popularList !: any;

  subPopularList !: Subscription;


  constructor(private movieSvc: MovieService){}

  ngOnInit():void{
      this.getPopularMoviesWithPagination();
  }

  ngOnChanges(changes: SimpleChanges){
      this.getPopularMoviesWithPagination();
  }

  nextPage(){
    this.pageNo++;
    this.getPopularMoviesWithPagination();
  }

  previousPage(){
    this.pageNo--;
    this.getPopularMoviesWithPagination();
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

  private getPopularMoviesWithPagination(){
    this.movieSvc.getMoviesTwoPaths('movie','popular',this.pageNo).subscribe(
      (v)=>{
        console.log(v);
        this.modifyBackdrop(v);
        this.popularList=v;
      }
    )
  }
}
