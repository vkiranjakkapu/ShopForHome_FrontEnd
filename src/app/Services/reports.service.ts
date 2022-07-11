import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../Entities/report.model';
import { AuthenticationsService } from './authentications.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private url: string = environment.masterServiceURL+"/reports";

  constructor(private _authService: AuthenticationsService, private http: HttpClient) { }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.url}/${this._authService.getUserToken().token}`);
  }

  getReportsFromStartAndEnd(start: Date, end: Date): Observable<Report[]> {
    let data = {start: start, end: end, token: this._authService.getUserToken().token};
    return this.http.put<Report[]>(`${this.url}/`, data);
  }
}
