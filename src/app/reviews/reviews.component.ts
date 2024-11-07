import { Component } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { Review } from '../classes/review';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  id_review:string='';
  author:string='';
  comment:string='';
  jobTitle:string='';
  time:Timestamp=new Timestamp(0,0);


 reviewssobj: Review = {

   id_review:this.id_review,
   author:this.author,
   comment:this.comment,
   jobTitle:this.jobTitle,
   time:this.time,
 };


constructor(private reviewservice:ReviewService){}
reviewList:Review[]=[];

ngOnInit(): void {
 this.getreviews();
}

getreviews() {
 this.reviewservice.getreviews().subscribe(
   (res: any) => {
     this.reviewList = res.map((e: any) => {
       const data = e.payload.doc.data();
       return {
         id_review: e.payload.doc.id,
         author: data.author,
         comment: data.comment,
         jobTitle: data.jobTitle,
         time: data.time,
       } as Review;
     });
   },
   (error: any) => {
     console.error("Error fetching reviews: ", error); 
   }
 );
}

deleteReview(review:Review){
 this.reviewservice.deletereviews(review);

}
}
