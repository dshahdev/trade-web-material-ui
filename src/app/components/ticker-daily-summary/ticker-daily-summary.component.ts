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
  
  }
 
  updateData(tickerPnlDetail:TickerSummary[]) {
    console.log(">>>datePnlDetail in TICKER: "+ tickerPnlDetail);
    this.dataSource.data = tickerPnlDetail;
    this.dataSource.sort = this.sort;
    
  }

  onClick(event: any, row: any, i: any) {
    console.log(row.ticker);
    this.highlightedRow = row;
    this.selectedIndex = i;
    
    this.detailTrickerEvent.emit(row.ticker);
  }
}
