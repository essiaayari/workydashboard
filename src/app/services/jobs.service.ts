// src/app/services/jobs.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Jobs } from '../classes/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private afs: AngularFirestore) {}

  addjob(job: Jobs): Promise<void> {
    job.id_job = this.afs.createId(); 
    return this.afs.collection('/job_applications').doc(job.id_job).set({ ...job }); 
  }

  getjobs() {
    return this.afs.collection('/job_applications').snapshotChanges();
  }

  deletejobs(job: Jobs) {
    return this.afs.doc('/job_applications/' + job.id_job).delete();
  }
}
