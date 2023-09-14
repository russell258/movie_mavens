import { Component, SimpleChanges } from '@angular/core';
import { MovieService } from '../movie/movie.service';
import { MovieModel } from '../movie/movie-model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent {
  pageNo = 1;

  trendingList !: any;

  constructor(private movieSvc: MovieService){}

  ngOnInit():void{
      this.getTrendingMoviesWithPagination();
  }

  ngOnChanges(changes: SimpleChanges){
      this.getTrendingMoviesWithPagination();
  }

  nextPage(){
    this.pageNo++;
    this.getTrendingMoviesWithPagination();
  }

  previousPage(){
    this.pageNo--;
    this.getTrendingMoviesWithPagination();
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

  private getTrendingMoviesWithPagination(){
    this.movieSvc.getMoviesThreePaths('trending','movie','week',this.pageNo).subscribe(
      (v)=>{
        console.log(v);
        this.modifyBackdrop(v);
        this.trendingList=v;
      }
    )
  }
}
