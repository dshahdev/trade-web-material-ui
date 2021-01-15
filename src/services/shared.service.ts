import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  servicePath = "http://192.168.1.103:8080";
  pnlByTicker = this.servicePath + "/trade-crud-rest/api/v1/pnlByTicker";
  pnlByMonth = this.servicePath + "/trade-crud-rest/api/v1/monthlySummary";
  pnlForTicker = this.servicePath + "/trade-crud-rest/api/v1/pnlForTickerByDate";
  monthList = this.servicePath + "/trade-crud-rest/api/v1/monthList";
  pnlForMonthByDate = this.servicePath + "/trade-crud-rest/api/v1/pnlForMonthByDate";
  pnlForMonthByTicker = this.servicePath +"trade-crud-rest/api/v1/pnlForMonthByTicker";
  pnlForAllMonths = this.servicePath + "/trade-crud-rest/api/v1/allMonthList";
  pnlDetailForDate = this.servicePath + "/trade-crud-rest/api/v1/pnlForDate";
  monthlyPnlSummary = this.servicePath + "/trade-crud-rest/api/v1/monthlyPnlList";

  constructor(private http: HttpClient) { }

  getPnlByTicker(): Observable<any> {
    // return this.http.get("/assets/data/pnl.json");
    return this.http.get(this.pnlByTicker);
  }

  getPnlByMonth(): Observable<any> {
    return this.http.get(this.pnlByMonth);
  }

  getPnlForTicker(ticker: string): Observable<any> {
    return this.http.post(this.pnlForTicker, ticker)
  }

  getMonthList(): Observable<any>{
   return this.http.get(this.monthList);
 }

 getPnlForMonthByDate(month: string ): Observable<any>{
   return this.http.post(this.pnlForMonthByDate,month);
 }

 getPnlForMonthByTicker(month: string): Observable<any>
{
  return this.http.post(this.pnlForMonthByTicker, month);

} 

getPnlForAllMonths() : Observable<any> {
   return this.http.get(this.pnlForAllMonths)
 }

 getPnlDetailForDate(date: string): Observable<any> {
   return this.http.post(this.pnlDetailForDate, date)
 }

 getMonthlyPnlSummary(): Observable<any> {
   return this.http.get(this.monthlyPnlSummary);
 }
 
}
