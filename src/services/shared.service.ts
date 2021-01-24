import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headerOptions = { 
  headers: new HttpHeaders( {
      'content': 'application/json'
    })
  }

  const headerOptionsEmpty = { 
    headers: new HttpHeaders( {
    })
  }

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  serverAndPort = "http://192.168.1.103:8090";
  servicePath = this.serverAndPort + "/trade-crud-rest/api/v1/";

  urls = { 
    pnlByTicker:"pnlByTicker",
    pnlByMonth:"monthlySummary",
    pnlForTicker:"pnlForTickerByDate",
    monthList:"monthList",
    pnlForMonthByDate:"pnlForMonthByDate", 
    pnlForMonthByTicker:"pnlForMonthByTicker",
    pnlForAllMonths:"allMonthList",
    pnlDetailForDate:"pnlForDate",
    pnlDetailForTicker:"pnlForTicker",
    monthlyPnlSummary:"monthlyPnlList",
    uploadCSVfile: "uploadCSVFile",
    processCSVFile: "processCSVFile",
    savePrices: "savePrices" 
  }

  constructor(private http: HttpClient) { }

  getPnlByTicker(): Observable<any> {
    // return this.http.get("/assets/data/pnl.json");
    return this.http.get(this.servicePath + this.urls.pnlByTicker);
  }

  getPnlByMonth(): Observable<any> {
    return this.http.get(this.servicePath + this.urls.pnlByMonth);
  }

  getPnlForTicker(ticker: string): Observable<any> {
    return this.http.post(this.servicePath + this.urls.pnlForTicker, ticker)
  }

  getMonthList(): Observable<any>{
   return this.http.get(this.servicePath + this.urls.monthList);
 }

 getPnlForMonthByDate(month: string ): Observable<any>{
   return this.http.post(this.servicePath + this.urls.pnlForMonthByDate,month);
 }

 getPnlForMonthByTicker(month: string): Observable<any>
{
  return this.http.post(this.servicePath + this.urls.pnlForMonthByTicker, month);

} 

getPnlForAllMonths() : Observable<any> {
   return this.http.get(this.servicePath + this.urls.pnlForAllMonths)
 }

 getPnlDetailForDate(date: string): Observable<any> {
   return this.http.post(this.servicePath + this.urls.pnlDetailForDate, date)
 }

 getPnlDetailForTicker(ticker:string): Observable<any> {
   return this.http.post(this.servicePath + this.urls.pnlDetailForTicker, ticker);
 }

 getMonthlyPnlSummary(): Observable<any> {
   return this.http.get(this.servicePath + this.urls.monthlyPnlSummary);
 }

 uploadCSVfile(formData: FormData): Observable<any> {
  
  return this.http.post(this.servicePath + this.urls.uploadCSVfile, formData,  headerOptionsEmpty);
 }

 processCSVFile(fileName: String): Observable<any> {
   return this.http.post(this.servicePath + this.urls.processCSVFile, fileName);

  }

  savePrices(): Observable<any> {
    return this.http.get(this.servicePath + this.urls.savePrices);
  }
}
