import { Timestamp } from "firebase/firestore";

export class Review {
    constructor(
        public id_review:string,
        public author:string,
        public comment:string,
        public jobTitle:string,
        public time:Timestamp

    ){}
}
