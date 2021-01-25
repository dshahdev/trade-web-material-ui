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
import { TickerSummary } from '../model/ticker-summary.model';
import { DailySummaryComponent } from '../components/daily-summary/daily-summary.component';
import { TickerDailySummaryComponent } from '../components/ticker-daily-summary/ticker-daily-summary.component';
import { DetailComponent } from '../components/detail/detail.component';
import { TickerDetailComponent } from '../components/ticker-detail/ticker-detail.component';
import { HeadComponent } from '../components/head/head.component';
import { CurrentPositionComponent } from '../components/current-position/current-position.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(HeadComponent)
  headComponent: HeadComponent = new HeadComponent(null);

  @ViewChild(BarchartComponent)
  barChartComponent: BarchartComponent = new BarchartComponent;

  @ViewChild(PiechartComponent)
  pieChartComponent: PiechartComponent = new PiechartComponent;

  @ViewChild(MonthPerformanceComponent)
  monthPerformanceComponent: MonthPerformanceComponent = new MonthPerformanceComponent;

  @ViewChild(DailySummaryComponent)
  dailySummaryComponent: DailySummaryComponent = new DailySummaryComponent;

  
  @ViewChild(DetailComponent)
  detailComponent: DetailComponent = new DetailComponent;

  @ViewChild(TickerDailySummaryComponent)
  tickerDailySummaryComponent: TickerDailySummaryComponent = new TickerDailySummaryComponent;


  @ViewChild(TickerDetailComponent)
  tickerDetailComponent: TickerDetailComponent = new TickerDetailComponent;

  @ViewChild(CurrentPositionComponent)
  currentPositionComponent: CurrentPositionComponent = new CurrentPositionComponent(null);


  value = 'Darshan';
  value1 = "Pinal";
  MTD$ = "00.00";
  YTD$ = "00.00";
  performance = "100%"

  monthList: MonthList[] = [];
  monthlyDetail: DatePnlDetail[] = []
  dateTrades: Trade[] = [];
  tickerTrades: Trade[] = [];
  pnlMonthly: MonthlySummary[] = [];
  tickerPnlDetail: TickerSummary[] = [];

  date: string = "";
  ticker: string = "";

  selectedValue: string= "";
  selectedMonth: string = "";

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    //getting Monthly List data
    this.sharedService.getMonthList().subscribe((response) => {
      this.monthList = response;
      console.log("monthList- in home: "+JSON.stringify(this.monthList));
      console.log("monthList - in home: "+this.monthList[0].strdata);
      this.headComponent.updateSelection(this.monthList[0].strdata);
      this.selectMonth(this.monthList[0].strdata);
   
    });

    //getting charts data
    this.sharedService.getMonthlyPnlSummary().subscribe((response) => {
      
      this.pnlMonthly = response; // to be removed 

      this.barChartComponent.updateChart(response);
      this.pieChartComponent.updateChart(response);
      this.monthPerformanceComponent.updateChart(response);

      console.log("monthly pnl summary: "+ JSON.stringify(this.pnlMonthly));
    })
    
    //getting current position data
    this.sharedService.getPosition().subscribe((response) => {
      console.log("position data: "+ JSON.stringify(response));
      this.currentPositionComponent.updateData(response);
    })
    
  }


  monthChanged(month:any) {
    console.log("month is changed: "+ month);
    this.selectMonth(month);
  }

  selectMonth(month: any ) {
    console.log("selected month: " +month);
    if(month !== 'all') {

   
// getting pnl by date
      console.log("selected month is: " + month);
      this.sharedService.getPnlForMonthByDate(month).subscribe((response) => {
        
        this.dailySummaryComponent.updateData(response);
        if (response.length > 0) {
         
          let formattedDate = response[0].date.split("-").join("");
          this.pnlDetailForDate(formattedDate);
        }
        
      })
// getting pnl by ticker
      this.sharedService.getPnlForMonthByTicker(month).subscribe((response:any) => {
        this.tickerDailySummaryComponent.updateData(response);
        if (response.length > 0) {
          this.pnlDetailForTicker(response[0].ticker);
        }
      })
    } else {
     
      this.sharedService.getPnlForAllMonths().subscribe((response:any) => {
        this.monthlyDetail = response; 
      })
    }
    
  }

  pnlDetailForDate(date: string) {
    console.log("it is called..."+ date);
    this.sharedService.getPnlDetailForDate(date).subscribe((response) => {
      this.dateTrades = response;
      console.log("<<<<< response in home for selected date: "+JSON.stringify(response));
      this.detailComponent.updateData(response);
      console.log("details of the date: " + JSON.stringify(response));
    })
  }
  pnlDetailForTicker(ticker: string) {
    console.log("it is called..." + ticker);
  
    this.sharedService.getPnlDetailForTicker(ticker).subscribe((response) => {
     
      this.tickerTrades = response;
      this.tickerDetailComponent.updateData(response);
    })
  }

  gettingDateWiseData(event: any) {
    console.log("event in date component: "+ event); 
    this.date = event;
    console.log("getting data in home component: " + this.date);
    this.pnlDetailForDate(this.date);
  }

  getTickerWiseData(event: any) {
    console.log("event in ticker component: "+ event); 
    this.ticker = event;
    this.pnlDetailForTicker(this.ticker);
  }

}
