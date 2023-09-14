import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/security/login/http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient, private httpService:HttpService) { }

  searchString = new BehaviorSubject<string>('');

  searchMovies(searchInput: string, page:number): Observable<any>{
    return this.httpService.request('GET',`/api/search?query=${searchInput}&page=${page}`,'');
  }

}
