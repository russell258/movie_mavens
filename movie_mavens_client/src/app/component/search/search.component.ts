import { Subscription, BehaviorSubject, switchMap, map } from 'rxjs';
import { Component, Input, SimpleChanges } from '@angular/core';
import { SearchService } from './search.service';
import { MovieModel } from 'src/app/movies/movie/movie-model';
import { MovieService } from 'src/app/movies/movie/movie.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  currentIndex: number = 0;
  pageNo = 1;

  searchInput !: string;
  searchList !: any;

  subSearchList !: Subscription;


  constructor(private searchSvc: SearchService, private movieSvc:MovieService){}

  ngOnInit():void{
    this.searchSvc.searchString.subscribe(
      data=>{
        this.searchInput=data;
        console.log(this.searchInput);
      })
    // this.getMoviesFromSearch(this.searchInput);
      this.getSearchMoviesWithPagination();
  }

  ngOnChanges(changes: SimpleChanges){
      this.getSearchMoviesWithPagination();
  }

  nextPage(){
    this.pageNo++;
    this.getSearchMoviesWithPagination();
  }

  previousPage(){
    this.pageNo--;
    this.getSearchMoviesWithPagination();
  }

  // getMoviesFromSearch(searchInput:string){
  //   this.subSearchList= this.searchSvc.searchMovies(searchInput, page).subscribe({
  //     next:(v)=> {
  //       this.modifyBackdrop(v);
  //       this.searchList = v;
  //     },
  //     error: (e)=>console.error(e),
  //     complete:()=>console.log(this.searchList)
  //   });
  // }

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

  private getSearchMoviesWithPagination(){
    this.searchSvc.searchMovies(this.searchInput,this.pageNo).subscribe(
      (v)=>{
        console.log(v);
        this.modifyBackdrop(v);
        this.searchList=v;
      }
    )
  }


}
