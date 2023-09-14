import { Component, SimpleChanges } from '@angular/core';
import { MovieService } from '../movie/movie.service';
import { MovieModel } from '../movie/movie-model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent {

  pageNo = 1;

  upcomingList !: any;

  constructor(private movieSvc: MovieService){}

  ngOnInit():void{
      this.getUpcomingMoviesWithPagination();
  }

  ngOnChanges(changes: SimpleChanges){
      this.getUpcomingMoviesWithPagination();
  }

  nextPage(){
    this.pageNo++;
    this.getUpcomingMoviesWithPagination();
  }

  previousPage(){
    this.pageNo--;
    this.getUpcomingMoviesWithPagination();
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

  private getUpcomingMoviesWithPagination(){
    this.movieSvc.getMoviesTwoPaths('movie','upcoming',this.pageNo).subscribe(
      (v)=>{
        console.log(v);
        this.modifyBackdrop(v);
        this.upcomingList=v;
      }
    )
  }

}
