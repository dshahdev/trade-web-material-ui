import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePnlDetail } from '../model/date-pnl.model';
import { Strdata } from '../model/strdata.model';
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
import { PositionForDateByticker } from '../model/position-date-ticker.model';
import { Options } from '../enum/options.enum';
import { keyframes } from '@angular/animations';
import { Key } from 'protractor';
import { DataService } from 'src/services/data.service';
import { SystemParam } from '../model/systemParam.model';
import { MulSelectionsComponent } from '../components/mul-selections/mul-selections.component';
import { GlobalFilter } from '../model/global-filter.model';
import { MatAccordion } from '@angular/material/expansion';
import { MatExpansionModule} from '@angular/material/expansion';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})




export class HomeComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  @ViewChild(HeadComponent)
  headComponent: HeadComponent = new HeadComponent(null);

  @ViewChild(BarchartComponent)
  barChartComponent: BarchartComponent = new BarchartComponent(null);

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

  monthList: Strdata[] = [];
  tickerList: Strdata[] = [];
  yearList: Strdata[] = [];

  realizedData: string[] = ['< -10%','-5% : -10%','0% : -5%','0% : 3%','3% : 5%','5% : 8%','5% : 8%','8% : 10%','> 10%'];
  strategyData: string[] = ['SWING','SIDE-BET','ONH','DT','OTHER'];
  barchartOptions: string[] = ['Ticker','Realized','Month','Week','Date','Trade Id'];

  monthlyDetail: DatePnlDetail[] = []
  dateTrades: Trade[] = [];
  tickerTrades: Trade[] = [];
  tickerPnlDetail: TickerSummary[] = [];
  positionForDateByticker: PositionForDateByticker[] = [];
  systemParameters: SystemParam;

  date: string = "";
  ticker: string = "";

  monthStr = [];
  tickerStr = [];
  yearStr = [];

  selectedValue: string= "";
  selectedMonth: string = "";

  globalFilter: GlobalFilter;

  constructor(private sharedService: SharedService, private dataService: DataService) { }

  ngOnInit(): void {

    
    //getting Monthly List data
    this.sharedService.getMonthList().subscribe((response) => {
      this.monthList = response;
      this.monthStr =  this.monthList.map(e => e.strdata);
    
      console.log("monthlist in home: "+ JSON.stringify(this.monthStr));
      // this.headComponent.updateSelection(this.monthList[0].strdata);
      // this.selectMonth(this.monthList[0].strdata);
   
    });

    // getting Ticker List Data
    this.sharedService.getTickersList().subscribe((response) =>{
      this.tickerList = response;
      this.tickerStr = this.tickerList.map(e => e.strdata);
      // console.log("tickerList: "+JSON.stringify(this.tickerStr));
    })

    // getting Years List Data
    this.sharedService.getYearList().subscribe((response) => {
      this.yearList = response;
      this.yearStr = this.yearList.map(e => e.strdata);
      console.log("all years: "+ JSON.stringify(response))
    })


    this.getPortfolioReturnData();

    // calling data service
   this.sharedService.getSystemParams().subscribe((response =>{
    console.log("from sharedService: "+ JSON.stringify(response));
    this.systemParameters = response;
    this.headComponent.updateSelection(this.systemParameters.selectedMonth);
    this.monthChanged(this.systemParameters.selectedMonth);
    }))
  }

  
//getting global filter obj from head
  monthChanged(month:any) {
    console.log("month is changed: "+ JSON.stringify(month));
    this.selectMonth(month);
  }
// collecting global filters here
  globalFilterHandler(gfSelectedValue) {
    console.log("global filters in home: "+ JSON.stringify(gfSelectedValue));
    this.sharedService.getGlobalFilter(gfSelectedValue).subscribe((response) => {
      console.log("months from server: "+ JSON.stringify(response));
    })
    // a separate request to the server
  }

  // collecting barchart options here
  selectedOption(value:any) {
    console.log("chart option: "+value);
   // a separate request to the server
  }


  selectMonth(month: any ) {
    console.log("selected month: " +month);
    if(month !== 'all') {
      this.getPortfolioReturnDataForMonth(month);
      
    // getting pnl by date --for the later use
    
      // this.sharedService.getPnlForMonthByDate(month).subscribe((response) => {
      
      //   this.dailySummaryComponent.updateData(response);
      //   if (response.length > 0) {
         
      //     let formattedDate = response[0].date.split("-").join("");
      //     this.pnlDetailForDate(formattedDate);
      //   }
        
      // })
    // getting pnl by ticker --for the later use
      // this.sharedService.getPnlForMonthByTicker(month).subscribe((response:any) => {
      //   this.tickerDailySummaryComponent.updateData(response);
      //   if (response.length > 0) {
      //     this.pnlDetailForTicker(response[0].ticker);
      //   }
      // })
    } else {
     
      this.getPortfolioReturnData();
    }
    
  }

  pnlDetailForDate(date: string) {
    this.sharedService.getPnlDetailForDate(date).subscribe((response) => {
      console.log("home PnlDetailForDate: "+JSON.stringify(response));
      this.dateTrades = response;
      this.barChartComponent.updateData(this.dateTrades);
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
    // this.getCurrentPosition();
  }

  // for barcharts

  getPortfolioReturnData() {
    this.sharedService.getPortfolioDailyReturn().subscribe((response) => {
      // console.log("response in the barchart: "+JSON.stringify(response));
      this.barChartComponent.updateChart(response);
    })
  }
   // for barcharts 

  getPortfolioReturnDataForMonth(month: string){
    this.sharedService.getPortfolioDailyReturnForMonth(month).subscribe((response) => {
      // console.log("response in the barchart: "+JSON.stringify(response));
      this.barChartComponent.updateChart(response);
    })
  }

 
  // getPortfolioSummary() {
  //   this.sharedService.getPortfolioSummary().subscribe((response) => {
  //     this.formattedDate = this.convert(response[0].positionDate);
  //     this.getCurrentPosition();
  //     this.portfolioSummaryComponent.updateData(response);
  //   })
  // }

  // getCurrentPosition() {
  //   this.sharedService.getCurrentPositionForDate(this.formattedDate).subscribe((response) => {
  //     this.currentPositionComponent.updateData(response);
  //   })
  // }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if(tabChangeEvent.index === 0) {
      this.detailComponent.updateData(this.tickerTrades);
    } else {
      this.detailComponent.updateData(this.dateTrades);
    }
    
  }

  // positionDateHandler(positionDate) {
  //   this.formattedDate = positionDate;
  //   console.log(">>>> position Date: "+ this.formattedDate);
  //   this.getCurrentPosition();
  // }

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

  // emmited chart-Data handlers

  chartDataHandler(event){
    // debugger;
    console.log("response from chart-date: "+ JSON.stringify(event.date));
    console.log("response from chart-yIndex: "+ JSON.stringify(event.yIndex));
    let date = event.date;
    let yIndex = event.yIndex;
    console.log( "enum "+Options.realized + " "+Options.cumuRealizedPnl)

    if((yIndex === Options.realized) || (yIndex === Options.cumuRealizedPnl)) {
      this.sharedService.getPnlForDateByTicker(date).subscribe((response) =>{
        this.tickerPnlDetail = response;
        console.log("responsed data for realized and realizedC: " + JSON.stringify(this.tickerPnlDetail))
        
      

        this.monthPerformanceComponent.updateChart(this.tickerPnlDetail,['Ticker', 'Pnl','ONH','Swing','DT','Side']);
        // this.pieChartComponent.updateChart(this.tickerPnlDetail)
       
      });
    } else if((yIndex === Options.unrealized)  || (yIndex === Options.sodInv)) {
      this.sharedService.getPositionForDateByTicker(date).subscribe((response) => {
        console.log("responsed data for unrealized and investment: "+JSON.stringify(response[0]));
        this.positionForDateByticker= response;
        
        this.monthPerformanceComponent.updateChart(this.positionForDateByticker, ['Position Date','Ticker','Orig', 'Av','Alloc','MV$','Cost','UnR$','Prior Px','Cur Px']);
      })
    } else {
      console.log("yIndex: "+yIndex);
    }
  }

  globalFiltersHandler(gfSelectedValue) {
    console.log("globalfilter request: "+JSON.stringify(gfSelectedValue));
    this.sharedService.getGlobalFilter(gfSelectedValue).subscribe((response) => {
          console.log("months from server: "+ JSON.stringify(response));
          this.barChartComponent.updateChart(response);
        })
  }

  
}
