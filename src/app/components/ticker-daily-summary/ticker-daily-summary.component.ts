import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TickerSummary } from 'src/app/model/ticker-summary.model';
import { MatSort} from '@angular/material/sort';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-ticker-daily-summary',
  templateUrl: './ticker-daily-summary.component.html',
  styleUrls: ['./ticker-daily-summary.component.css']
})
export class TickerDailySummaryComponent implements OnInit {

  @Input() tickerPnlDetail: TickerSummary[] = [];
  @Output() detailTrickerEvent: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['ticker', 'pnl'];
  highlightedRow = "";
  selectedIndex:number = 0;

  dataSource = new MatTableDataSource<TickerSummary>([]);

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor() { }

  ngOnInit(): void {
    console.log( " i am in ticker-summary")
  }
 
  
  ngAfterViewChecked() {
    this.dataSource.data = this.tickerPnlDetail;
    this.dataSource.sort = this.sort;
    // console.log("....in do check --tiker detail: " + JSON.stringify(this.tickerPnlDetail));
  }

  onClick(event: any, row: any, i: any) {
    console.log(row.ticker);
    this.highlightedRow = row;
    this.selectedIndex = i;
    // let formattedDate = row.date.split("-").join("");
    // console.log("fd: "+ formattedDate);

    this.detailTrickerEvent.emit(row.ticker);
  }
}
