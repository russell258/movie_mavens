import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { reviewedMovie } from 'src/app/reviews/review/review-model';
import { ReviewService } from 'src/app/reviews/review/review.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private reviewSvc: ReviewService){}

  userReviews : reviewedMovie[];
  subDeleteReview !: Subscription;
  subUserReviewsList !: Subscription;

  user_id:string;

  ngOnInit(): void{
    this.user_id = window.sessionStorage.getItem("user_id");
    this.getUserReviewsList();
  }

  getUserReviewsList(){
    this.subUserReviewsList = this.reviewSvc.getUserReviews(this.user_id).subscribe({
      next: (data)=>{
        this.userReviews = data;
        console.log(this.userReviews);
      }
    })
  }

  deleteReview(review_id,movie_title){
    console.log("deleted this review: ", review_id);
    if (confirm("Are you sure you want to delete your review for "+movie_title+"?")){
      this.subDeleteReview=this.reviewSvc.deleteReview(review_id).subscribe({
        next:(data)=>{
          let jsonObj = JSON.stringify(data);
          alert("Your review for "+movie_title + " has been deleted.");
          this.getUserReviewsList();
        },
        error: (e)=>{
          console.error(e);
      }
      })
    }

  }


}
