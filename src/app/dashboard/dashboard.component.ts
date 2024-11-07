import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Chart } from 'angular-highcharts'; // Ensure this is imported correctly
import * as Highcharts from 'highcharts'; // Import Highcharts
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  jobscount$!: Observable<number>;
  CommentCount$!: Observable<number>;

  categoriesCount: { [category: string]: number } = {};
  pchart!: Chart; 
  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.jobscount$ = this.firestore.collection('job_applications').snapshotChanges().pipe(
      map(actions => actions.length)
    );

    this.CommentCount$ = this.firestore.collection('comments').snapshotChanges().pipe(
      map(actions => actions.length)
    );

    this.getjobsCountByCategory();  
    this.initializeLineChartjobs();  
  }

  getjobsCountByCategory() {
    this.firestore.collection('job_applications').snapshotChanges().pipe(
      map(actions => {
        const categoryCountMap: { [jobType: string]: number } = {};
        actions.forEach(action => {
          const data = action.payload.doc.data() as any;
          const jobType = data.jobType;

          if (jobType === 'Part-time' || jobType === 'Summer-Job') {
            categoryCountMap[jobType] = (categoryCountMap[jobType] || 0) + 1;
          }
        });
        return categoryCountMap;
      })
    ).subscribe(categoryCountMap => {
      this.categoriesCount = categoryCountMap;
      this.updatePieChart();
    });
  }

  updatePieChart() {
    const data = Object.entries(this.categoriesCount).map(([name, y]) => ({ name, y }));

    this.pchart = new Chart({
      chart: {
        type: 'pie',
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: '99%',
          borderWidth: 10,
          borderColor: '',
          slicedOffset: 10,

          dataLabels: {
            connectorWidth: 0,
          },
          colors: ['#a81a07', '#000000']
        }
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'Jobs ',
      },
      series: [{
        type: 'pie',
        name: 'Nombre',
        data: data,
      }]
    });
  }

  initializeLineChartjobs() {
  }
}
