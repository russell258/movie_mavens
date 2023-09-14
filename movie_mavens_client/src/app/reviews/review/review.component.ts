import { Component } from '@angular/core';
import { ReviewService } from './review.service';
import { Subscription } from 'rxjs';
import { MovieModel } from 'src/app/movies/movie/movie-model';
import { reviewedMovie } from './review-model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  constructor(private reviewSvc: ReviewService){}

  reviewsList: reviewedMovie[];

  subReviewsList !: Subscription;
  subDeleteReview !: Subscription;

  userid = window.sessionStorage.getItem("user_id");

  ngOnInit():void{
    this.getReviewsList();
  }

  deleteReview(review_id, movie_title){
    console.log("delete Review clicked");
    this.subDeleteReview = this.reviewSvc.deleteReview(review_id).subscribe({
      next:(data)=>{
        let jsonObj = JSON.stringify(data);
        alert("Your review for "+movie_title + " has been deleted.");
        this.getReviewsList();
      },
      error: (e)=>{
        console.error(e);
      }
    })
  }

  getReviewsList(){
    this.subReviewsList = this.reviewSvc.getAllReviews().subscribe({
      next: (data)=>{
        this.convert(data);
        this.reviewsList=data;
        console.log(this.reviewsList);
      }
    });
  }



  convert(data:any){
    if (data.results){
      data.results.forEach( r => {
        r.rating = parseInt(r.rating)
      });
    }

    return data;
  }

}
