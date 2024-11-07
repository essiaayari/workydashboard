import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { JobsComponent } from './jobs/jobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Import AngularFireModule and the environment
import { AngularFireModule } from '@angular/fire/compat';  // For AngularFireModule (Compat version)
import { environment } from '../environments/environment';  // Make sure the path to the environment file is correct
import { ChartModule } from 'angular-highcharts';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    AdmindashboardComponent,
    JobsComponent,
    DashboardComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    ChartModule ,

    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),  // Initialize Firebase here with config from the environment
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
