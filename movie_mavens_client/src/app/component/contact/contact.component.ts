import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/security/login/http.service';
import { ContactModel } from './contact-model';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;

  contactForm !: FormGroup;

  constructor(private fb: FormBuilder, private httpService: HttpService){}

  userid: string;

  ngOnInit():void{
    this.userid = window.sessionStorage.getItem("user_id");
    this.contactForm = this.fb.group({
      user_id: this.fb.control<string>(this.userid),
      fullName: this.fb.control<string>('',[Validators.required]),
      email: this.fb.control<string>('',[Validators.required,Validators.email]),
      message: this.fb.control<string>('',[Validators.required])
    })
  }


  contactSubmit(){
    console.log(this.contactForm.value as ContactModel);
    this.httpService.request('POST','/api/contact',this.contactForm.value as ContactModel).subscribe({
      next: (data)=>{
        let jsonObj = JSON.stringify(data);
        //test what happens if put an invalid email.
        alert(`Hi `+ this.contactForm.value.fullName + `, we have received your message. For any follow up, we will contact you through your email: ${JSON.parse(jsonObj)['email']}`);
      },
    error: (e) => {
      console.error(e);
    }
    })
  }



  ngAfterViewInit(): void {
    const mapOptions = {
      center: new google.maps.LatLng(1.2923210380975625, 103.7765463514608),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(1.2923210380975625, 103.7765463514608),
      map: this.map,
      title: "NUS ISS",
      draggable: true,
      animation: google.maps.Animation.DROP
    });
  }

}

