import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { DatePnlDetail } from 'src/app/model/date-pnl.model';
import { MonthList } from 'src/app/model/month-list.model';
import { Trade } from 'src/app/model/trade.model';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  value = 'Darshan';
  value1 = "Pinal";
  MTD$ = "00.00";
  YTD$ = "00.00";
  performance = "100%"


  date: string = "";
  selectedValue: string= "";
  selectedMonth: string = "";

  // monthList: MonthList[] = [];
  @Input() monthList: MonthList[] = [];

  @Output() monthSelectedNotification = new EventEmitter();

  monthlyDetail: MonthList[] = []
  tradesForDate: Trade[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    // this.sharedService.getMonthList().subscribe((response) => {
    //   console.log("monthlist: "+JSON.stringify(this.monthList));
    //   this.monthList = response;
    if (this.monthList.length > 0) {

      console.log(" i am here in head component");
      console.log("monthlist - in head component:: "+JSON.stringify(this.monthList));
      console.log("monthlist strdata: "+this.monthList[0].strdata);
      this.selectedValue = this.monthList[0].strdata;
      console.log("selectedValue: "+ this.selectedValue);
      //   this.selectMonth(this.selectedValue);
      // })
    }

  }

  ngDoCheck() {
 
    if (this.monthList.length > 0 ) {
      this.selectedValue = this.monthList[0].strdata;
      // this.selectMonth(this.selectedValue);
    }
  }

  applyFilter(val: string) {
    console.log(val)
  }

  selectMonth(month: any ) {
    console.log("selected month: " +month);
    this.monthSelectedNotification.emit(month);
    // if(month !== 'all') {
    //   this.sharedService.getPnlForMonthByDate(month).subscribe((response) => {
    //     // console.log("for month: " + JSON.stringify(response));
    //     this.monthlyDetail = response; 
    //     console.log(this.monthlyDetail[0].date);
    //     let formattedDate = this.monthlyDetail[0].date.split("-").join("");
    //     console.log("fd: "+ formattedDate);
    //     this.pnlDetailForDate(formattedDate);
        
    //   })
    // } else {
    //   console.log("selected month is: " + month);
    //   this.sharedService.getPnlForAllMonths().subscribe((response) => {
    //     console.log("dates for all months: " + response); 
    //     this.monthlyDetail = response; 
    //   })
    // }
   
  }

  pnlDetailForDate(date: string) {
    // console.log("it is called...");
    // this.sharedService.getPnlDetailForDate(date).subscribe((response) => {
    //   this.tradesForDate = response;
    //   console.log("details of the date: " + JSON.stringify(this.tradesForDate));
    // })
  }
  gettingData(event: any) {
    // console.log("event in home component: "+ event); 
    // this.date = event;
    // console.log("getting data in home component: " + this.date)
  }
}
