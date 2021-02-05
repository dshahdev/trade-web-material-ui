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
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PortfolioSummaryComponent } from '../components/portfolio-summary/portfolio-summary.component';
import { TradeComponent } from '../components/trade/trade.component';
import { PnlComponent } from '../components/pnl/pnl.component';



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
  detailComponent: DetailComponent = new DetailComponent(null);

  @ViewChild(TickerDailySummaryComponent)
  tickerDailySummaryComponent: TickerDailySummaryComponent = new TickerDailySummaryComponent;


  @ViewChild(TickerDetailComponent)
  tickerDetailComponent: TickerDetailComponent = new TickerDetailComponent;

  @ViewChild(PortfolioSummaryComponent)
  portfolioSummaryComponent: PortfolioSummaryComponent = new PortfolioSummaryComponent(null);

  @ViewChild(CurrentPositionComponent)
  currentPositionComponent: CurrentPositionComponent = new CurrentPositionComponent(null);

  @ViewChild(PnlComponent)
  appPnlComponent: PnlComponent = new PnlComponent(null);
   
  showDetails = false;



  positionDate = "20210122"
  positionDate1 = (new Date()).toISOString().split('T')[0];; // when app. runs for the first time
  formattedDate = this.positionDate1.split('-').join('');

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

    console.log("date: "+this.positionDate1);
     var formattedDate = this.positionDate1.split('-').join('');
    console.log("fd: "+formattedDate);
    //getting Monthly List data
    this.sharedService.getMonthList().subscribe((response) => {
      this.monthList = response;
      this.headComponent.updateSelection(this.monthList[0].strdata);
      this.selectMonth(this.monthList[0].strdata);
   
    });

    //getting charts data
    this.sharedService.getMonthlyPnlSummary().subscribe((response) => {
      
      this.pnlMonthly = response; // to be removed 

      this.barChartComponent.updateChart(response);
      this.pieChartComponent.updateChart(response);
    })
    
    this.getPortfolioSummary();
    
    this.getCurrentPosition();
    

    
  }


  monthChanged(month:any) {
    console.log("month is changed: "+ month);
    this.selectMonth(month);
  }

  selectMonth(month: any ) {
    console.log("selected month: " +month);
    if(month !== 'all') {

   
    // getting pnl by date
    
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
    this.sharedService.getPnlDetailForDate(date).subscribe((response) => {
      this.dateTrades = response;
      this.detailComponent.updateData( this.dateTrades);
    })
  }
  pnlDetailForTicker(ticker: string) {
    this.sharedService.getPnlDetailForTicker(ticker).subscribe((response) => {
      this.tickerTrades = response;
      this.detailComponent.updateData(this.tickerTrades);
    })
  }

  gettingDateWiseData(event: any) {
    this.date = event;
 
    this.pnlDetailForDate(this.date);
  }

  getTickerWiseData(event: any) {
    this.ticker = event;
    this.pnlDetailForTicker(this.ticker);
  }

  

  getSelectedDate(selectedDate: string) {
    this.formattedDate = selectedDate;
    this.getCurrentPosition();
  }

  getPortfolioSummary() {
    this.sharedService.getPortfolioSummary().subscribe((response) => {
      this.formattedDate = this.convert(response[0].positionDate);
      this.getCurrentPosition();
      this.portfolioSummaryComponent.updateData(response);
    })
  }

  getCurrentPosition() {
    this.sharedService.getCurrentPositionForDate(this.formattedDate).subscribe((response) => {
      this.currentPositionComponent.updateData(response);
    })
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if(tabChangeEvent.index === 0) {
      this.detailComponent.updateData(this.tickerTrades);
    } else {
      this.detailComponent.updateData(this.dateTrades);
    }
    
  }

  positionDateHandler(positionDate) {
    this.formattedDate = positionDate;
    console.log(">>>> position Date: "+ this.formattedDate);
    this.getCurrentPosition();
  }

  convert(str) {
  
    var dateObj = new Date(str);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var fd = year + "-" + month + "-" + day

    return fd;
  }
  display(){
    this.showDetails = !this.showDetails;
  }
  
  searchHandler(searchText) {
   this.appPnlComponent.setFilter(searchText);
  }

}
