import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _MatOptionBase } from '@angular/material/core';

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

  serverAndPort = "http://192.168.1.103:8091";
  servicePath = this.serverAndPort + "/trade-crud-rest/api/v1/";

  urls = { 
    pnlByTicker:"pnlByTicker",
    pnlByMonth:"monthlySummary",
    pnlForTicker:"pnlForTickerByDate",
    monthList:"monthList",
    tickerList: "getTickers",
    yearList: "allYears",
    pnlForMonthByDate:"pnlForMonthByDate", 
    pnlForMonthByTicker:"pnlForMonthByTicker",
    pnlForAllMonths:"allMonthList",
    pnlDetailForDate:"pnlForDate",
    pnlDetailForTicker:"pnlForTicker",
    monthlyPnlSummary:"monthlyPnlList",
    uploadCSVfile: "uploadCSVFile",
    processCSVFile: "processCSVFile",
    savePrices: "savePrices",
    portfolioSummary: "dailyPositionSummary",
    currentPosition: "positionsForDate",
    tradesByDatePnl:"tradesByDatePnl",
    tradesByTikerPnl:"tradesByTickerPnl",
    pnl: "pnl",
    portfoliodailyreturn: "portfoliodailyreturn",
    portfoliodailyreturnformonth: "portfoliodailyreturnformonth",
    pnlForDateByTicker: "pnlForDateByTicker",
    positionForDateByTicker: "positionForDateByTicker",
    systemparams: "systemparams",

    
    
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

  getPortfolioSummary(): Observable<any> {
    return this.http.get(this.servicePath + this.urls.portfolioSummary);
  }

  getCurrentPositionForDate(positionDate: String): Observable<any>{
    return this.http.post(this.servicePath + this.urls.currentPosition, positionDate);
  } 

  getTradesByDatePnl():  Observable<any> {
    return this.http.get(this.servicePath + this.urls.tradesByDatePnl);
  }

  getTradesByTickerPnl(): Observable<any> {
    return this.http.get(this.servicePath + this.urls.tradesByTikerPnl);
  }

  getPnlAll(): Observable<any> {
    return this.http.get(this.servicePath + this.urls.pnl);
  }

  getPortfolioDailyReturn(): Observable<any> {
    return this.http.get(this.servicePath + this.urls.portfoliodailyreturn);
  }

  getPortfolioDailyReturnForMonth(month): Observable<any> {
    return this.http.post(this.servicePath + this.urls.portfoliodailyreturnformonth,month)
  }
  getPnlForDateByTicker(date): Observable<any> {
    return this.http.post(this.servicePath + this.urls.pnlForDateByTicker, date);
  }

  getPositionForDateByTicker(date): Observable<any> {
    return this.http.post(this.servicePath + this.urls.positionForDateByTicker, date);
  }

  getSystemParams(): Observable<any>{
    return this.http.get(this.servicePath + this.urls.systemparams);
  }
  getTickersList(): Observable<any> {
    return this.http.get(this.servicePath + this.urls.tickerList)
  }

  getYearList(): Observable<any> {
    return this.http.get(this.servicePath + this.urls.yearList);
  }

}
