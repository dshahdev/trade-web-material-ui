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
    if (this.monthList.length > 0) {
      this.selectedValue = this.monthList[0].strdata;
    }

  }

  ngAfterViewChecked(): void {
    if (this.monthList.length > 0 ) {
      this.selectedValue = this.monthList[0].strdata;
    }
  }
  applyFilter(val: string) {
    console.log(val)
  }

  selectMonth(month: any ) {
    console.log("selected month: " +month);
    this.monthSelectedNotification.emit(month)
  }

  
}
