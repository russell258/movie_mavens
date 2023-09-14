import { HttpService } from './../login/http.service';
import { Component, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Registration } from '../registrationmodels';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private router: Router, private httpService:HttpService){}

  regForm!: FormGroup;

  private fb = inject(FormBuilder);
  private regSvc = inject(RegistrationService);

  user:any;

ngOnInit(): void{
  this.user={
    id:"",
    email:"",
    username:"",
    password:""
  }
  this.regForm = this.fb.group({
    email: this.fb.control<string>('',[Validators.required,Validators.email]),
    username: this.fb.control<string>('',[Validators.required,Validators.minLength(5)]),
    password: this.fb.control<string>('',[Validators.required,Validators.minLength(8)])
    });
  }


  //backend registers and logs in -- need to handle the token and set to local storage
performReg(){
  this.user.id=crypto.randomUUID().substring(0,8);
  this.user.email= this.regForm.value.email,
  this.user.username=this.regForm.value.username,
  this.user.password=this.regForm.value.password,

  //how to display the message that username already exists?
  this.httpService.request('POST', '/api/register', this.user)
  .subscribe({
    next: (data) => {
      console.log(data.username);
      alert("Registered successfully! Please proceed to login");
      this.router.navigate(['/login']);
    },
    error:(e)=>{
      console.error(e);
      alert(e.message);
    }
  });
  // this.router.navigate(['/home']);
}

}
