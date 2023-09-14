import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/security/login/http.service';

@Injectable({
  providedIn: 'root'
})
export class WriteService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  postReviewToSpringBoot(formData: FormData){
    return this.httpService.request('POST','/api/receivereview',formData);
  }

}
