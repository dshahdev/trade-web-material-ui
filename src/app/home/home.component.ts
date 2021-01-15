import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePnlDetail } from '../model/date-pnl.model';
import { MonthList } from '../model/month-list.model';
import { Trade } from '../model/trade.model';
import { SharedService } from '../../services/shared.service';
import { MonthlySummary } from '../model/monthly-summary.model';
import { BarchartComponent } from '../components/barchart/barchart.component';
import { PiechartComponent } from '../components/piechart/piechart.component';
import { MonthPerformanceComponent } from '../components/month-performance/month-performance.component';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(BarchartComponent)
  barChartComponent: BarchartComponent = new BarchartComponent;

  @ViewChild(PiechartComponent)
  pieChartComponent: PiechartComponent = new PiechartComponent;

  @ViewChild(MonthPerformanceComponent)
  monthPerformanceComponent: MonthPerformanceComponent = new MonthPerformanceComponent;

  value = 'Darshan';
  value1 = "Pinal";
  MTD$ = "00.00";
  YTD$ = "00.00";
  performance = "100%"

  pnlByMonth: MonthList[] = [];
  monthlyDetail: DatePnlDetail[] = []
  tradesForDate: Trade[] = [];
  pnlMonthly: MonthlySummary[] = [];

  date: string = "";

  selectedValue: string= "";
  selectedMonth: string = "";

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getMonthList().subscribe((response) => {
      console.log("pnlForAllDates: "+JSON.stringify(this.pnlByMonth));
      this.pnlByMonth = response;
      console.log("pnlForAllDates- in home: "+JSON.stringify(this.pnlByMonth));
      console.log("pnlForAllDates - in home: "+this.pnlByMonth[0].strdata);
      this.selectMonth(this.pnlByMonth[0].strdata);
      // this.selectedValue = this.monthList[0].strdata;
      // this.selectMonth(this.selectedValue);
    });

    this.sharedService.getMonthlyPnlSummary().subscribe((response) => {
      
      this.pnlMonthly = response; // to be removed 

      this.barChartComponent.updateChart(response);
      this.pieChartComponent.updateChart(response);
      this.monthPerformanceComponent.updateChart(response);

      console.log("monthly pnl summary: "+ JSON.stringify(this.pnlMonthly));
    })
    
  }

  applyFilter(val: string) {
    // console.log(val)
  }

  monthChanged(month:any) {
    console.log("month is changed: "+ month);
    this.selectMonth(month);
  }

  selectMonth(month: any ) {
    console.log("selected month: " +month);
    if(month !== 'all') {

      // var response1 = this.sharedService.getPnlForMonthByDate(month);
      // var response2 = this.sharedService.getPnlForMonthByTicker(month);
      // forkJoin([response1, response2]).subscribe((responseList) => {
      //   var r1 = responseList[0];
      //   var r2 = responseList[1];

      //   console.log("r1: "+JSON.stringify(r1));
      //   console.log("r1: "+JSON.stringify(r2));
      // })

      console.log("selected month is: " + month);
      this.sharedService.getPnlForMonthByDate(month).subscribe((response) => {
        console.log(" date wise pnl: " + JSON.stringify(response));
        this.monthlyDetail = response; 
        if (this.monthlyDetail.length > 0) {
          console.log(this.monthlyDetail[0].date);
          let formattedDate = this.monthlyDetail[0].date.split("-").join("");
          console.log("fd: "+ formattedDate);
          this.pnlDetailForDate(formattedDate);
        }
        
      })
      this.sharedService.getPnlForMonthByTicker(month).subscribe((response:any) => {
        console.log("ticker wise pnl: "+ response);
      })
    } else {
      console.log("selected month is: " + month);
      this.sharedService.getPnlForAllMonths().subscribe((response:any) => {
        console.log("dates for all months: " + response); 
        this.monthlyDetail = response; 
      })
    }
    
  }

  pnlDetailForDate(date: string) {
    console.log("it is called...");
    this.sharedService.getPnlDetailForDate(date).subscribe((response) => {
      console.log("details of the date: " + JSON.stringify(response));
      this.tradesForDate = response;
      console.log("details of the date: " + JSON.stringify(this.tradesForDate));
    })
  }

  gettingData(event: any) {
    console.log("event in home component: "+ event); 
    this.date = event;
    console.log("getting data in home component: " + this.date);
    this.pnlDetailForDate(this.date);
  }
}
