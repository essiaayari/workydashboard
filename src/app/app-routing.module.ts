import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { JobsComponent } from './jobs/jobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  {
    path: 'Admin',
    title: 'Admin',
    component: AdmindashboardComponent,
    children: [
      { path: 'jobs', title: 'jobs', component: JobsComponent },
      { path: 'reviews', title: 'reviews', component: ReviewsComponent },

      { path: 'dashboard', title: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'jobs', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
