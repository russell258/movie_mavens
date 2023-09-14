import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Registration, RegistrationResponse } from '../registrationmodels';
import { Observable, firstValueFrom } from "rxjs";


const URL = '/api/register';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  http = inject(HttpClient);

  register(form: FormData): Observable<any>{
    return this.http.post<string>(URL, form)
  }

}
