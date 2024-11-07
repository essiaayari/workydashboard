import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Review } from '../classes/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private afs: AngularFirestore) {}
  
  addreview(review: Review): Promise<void> {
    review.id_review = this.afs.createId(); 
    return this.afs.collection('/comments').doc(review.id_review).set({ ...review }); 
  }

  getreviews() {
    return this.afs.collection('/comments').snapshotChanges();
  }

  deletereviews(review: Review) {
    return this.afs.doc('/comments/' + review.id_review).delete();
  }
}
