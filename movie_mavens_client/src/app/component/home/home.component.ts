import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from '../search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private searchSvc: SearchService){}

  searchMovies(form: NgForm){
    const search = form.value.search;
    console.log("search input: "+ search);
    form.reset();
    this.searchSvc.searchString.next(search);
    this.router.navigate(['/search']);
  }

}
