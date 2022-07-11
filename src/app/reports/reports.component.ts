import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from '../Entities/report.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { ReportsService } from '../Services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public thisPage: string = "Reports Page";
  public records: number[] = [6, 9, 18, 27, 36, 45];
  public perPage: number = this.records[0];
  public page = 1;

  public startDate!: Date;
  public endDate!: Date;
  
  public inProgress: boolean = false;
  
  public reports: any[] = [];

  public sortType: string = "";
  public sortBy: string = "price";
  public sortCategory: string = "";
  public sortReverse: boolean = true;
  
  constructor(private _reportsService: ReportsService, private _authService: AuthenticationsService, private router: Router) { }

  ngOnInit(): void {
    if (this._authService.getUserToken() == null) {
      this.router.navigate(['/']);
    } else {
      this._authService.localAuthnticate(this._authService.getUserToken()).then((data: any) => {
        if (data.status != "success") {
          this.router.navigate(['/']);
        } else {
          if (data.user.acctype != "admin") {
            this.router.navigate(['/']);
          }
        }
      }, (err: HttpErrorResponse) => { });
    }
    this.loadReports();
  }

  loadReports() {
    this.inProgress = true;
    this._reportsService.getReports().subscribe((data: any) => {
      if (data.status == "success") {
        this.reports = data.reports;
      }
      this.inProgress = false;
    }, (err: HttpErrorResponse) => { this.inProgress = false; });
  }

  generateReports(start: Date, end: Date) {
    this.inProgress = true;
    this._reportsService.getReportsFromStartAndEnd(start, end).subscribe((data: any) => {
      if (data.status == "success") {
        this.reports = data.reports;
      }
      this.inProgress = false;
    }, (err: HttpErrorResponse) => { this.inProgress = false });
  }

  convertDate(date: any): Date {
    var t: any, result!: Date;
    if (typeof date === 'string') {
      t = date.split("T");
      var dt = t[0];
      var tm = t[1].split(".")[0];
      result = new Date(dt + ' ' + tm);
    }
    return result;
  }

}
