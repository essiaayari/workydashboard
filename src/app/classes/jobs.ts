import { Timestamp } from "firebase/firestore";

 
        export class Jobs {
          constructor(
            public id_job: string,
            public category: string,
            public companyLocation: string,
            public contractDuration: string,
            public createdAt: Timestamp,  // Use Timestamp from firebase
            public educationLevel: string,
            public experienceLevel: string,
            public jobDescription: string,
            public jobHours: string,
            public jobTitle: string,
            public jobType: string,
            public salary: string,
            public skills: string,
            public startDate: string
          ) {}
        }
    

