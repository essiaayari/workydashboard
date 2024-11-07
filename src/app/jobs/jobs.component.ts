import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore'; // Import Timestamp from firebase/firestore
import { Jobs } from '../classes/jobs';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'] 
})
export class JobsComponent implements OnInit {
  date: Date = new Date(); 
  id_job: string = '';
  category: string = '';
  companyLocation: string = '';
  contractDuration: string = '';
  createdAt: Timestamp = new Timestamp(0, 0); 
  educationLevel: string = '';
  experienceLevel: string = '';
  jobDescription: string = '';
  jobHours: string = '';
  jobTitle: string = '';
  jobType: string = '';
  salary: string = '';
  skills: string = '';
  startDate: string = this.date.toISOString(); 

  jobsobj: Jobs = {
    id_job: this.id_job,
    category: this.category,
    companyLocation: this.companyLocation,
    contractDuration: this.contractDuration,
    createdAt: this.createdAt,
    educationLevel: this.educationLevel,
    experienceLevel: this.experienceLevel,
    jobDescription: this.jobDescription,
    jobHours: this.jobHours,
    jobTitle: this.jobTitle,
    jobType: this.jobType,
    salary: this.salary,
    skills: this.skills,
    startDate: this.startDate, 
  };

  constructor(private jobservice:JobsService) {

  }
  joblist:Jobs[]=[];

  ngOnInit(): void {
    this.getjobs();

  }
  getjobs() {
    this.jobservice.getjobs().subscribe(
      (res: any) => {
        this.joblist = res.map((e: any) => {
          const data = e.payload.doc.data();
          return {
            id_job: e.payload.doc.id,
            category: data.category,
            companyLocation: data.companyLocation,
            contractDuration: data.contractDuration,
            createdAt: data.createdAt, // Ensure this is a Timestamp
            educationLevel: data.educationLevel,
            experienceLevel: data.experienceLevel,
            jobDescription: data.jobDescription,
            jobHours: data.jobHours,
            jobTitle: data.jobTitle,
            jobType: data.jobType,
            salary: data.salary,
            skills: data.skills,
            startDate: data.startDate, // Ensure this is a Date or string as per your definition
          };
        });
      },
      (error: any) => {
        console.error("Error fetching jobs: ", error); // Handle error
      }
    );
  }
  deleteJob(job:Jobs){
    this.jobservice.deletejobs(job);

  }
}
