import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/security/login/http.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  getAllReviews():Observable<any>{
    return this.httpService.request('GET','/api/reviews',"");
  }

  getUserReviews(user_id):Observable<any>{
    return this.httpService.request('GET',`/api/users?uid=${user_id}`,'');
  }

  getAllMovies(): Observable<any>{
    return this.httpService.request('GET','/api/movies',"");
  }

  deleteReview(review_id):Observable<any>{
    console.log("review service entered");
    return this.httpService.request('',`/api/delete/review/${review_id}`,'');
  }

}
