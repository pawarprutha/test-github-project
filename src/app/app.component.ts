import { Component } from '@angular/core';
import { BaseProvider } from './services/food-report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BaseProvider]
})
export class AppComponent {
  reports: any;
  public foodReport: any[] = [];
  fineForBreakfast: number | undefined;
  fineForLunch: number | undefined;
  fineForDinner: number | undefined;
  totalFineForDay: number | undefined;
  response: any;
  totalMonthlyFine: number = 0;
  title = 'Food Consumption Report App';
  
  constructor(
    public baseProvider : BaseProvider) {
      this.getFoodReports();
    }

  getFoodReports() {
    this.baseProvider.makePostCall().subscribe(resp=>{
      this.response = resp.body;
      this.reports = this.response.reports;
      this.reports.forEach((singlePurpose: any) => {
        if(singlePurpose.opt_ins.breakfast == 'Pending') {
          this.fineForBreakfast = 100;
        } else {
          this.fineForBreakfast = 0;
        }
        if(singlePurpose.opt_ins.lunch == 'Pending') {
          this.fineForLunch = 100;
        } else {
          this.fineForLunch = 0;
        }
        if(singlePurpose.opt_ins.dinner == 'Pending') {
          this.fineForDinner = 100;
        } else {
          this.fineForDinner = 0;
        }
        this.totalFineForDay =  this.fineForBreakfast + this.fineForLunch + this.fineForDinner;
        singlePurpose.totalFineForDay = this.totalFineForDay;
        if(this.totalFineForDay != 0) {
          this.totalMonthlyFine = this.totalFineForDay + this.totalMonthlyFine;
        }
        this.foodReport?.push(singlePurpose);
        });
    }, error=>{
      console.log(error);
    });
  }
}
