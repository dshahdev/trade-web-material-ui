import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { Trade } from 'src/app/model/trade.model';

@Component({
  selector: 'app-ticker-detail',
  templateUrl: './ticker-detail.component.html',
  styleUrls: ['./ticker-detail.component.css']
})
export class TickerDetailComponent implements OnInit {

  @Input() tradesForTicker: Trade[] = [];

  displayedColumns: string[] = ['date', 'buyTradeId', 'sellTradeId', 'allocatedQty','pnl','cost','price'];
  highlightedRow = "";
  selectedIndex: number=0;
  ticker: string = '';

  dataSource = new MatTableDataSource<Trade>([]);

  @ViewChild(MatTab) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.dataSource.data = this.tradesForTicker;
    if (this.tradesForTicker.length > 0) {
      this.ticker = this.tradesForTicker[0].ticker;
    }
    else {
      console.log("no data");
    }
   
  }
  ngAfterViewChecked() {
    this.dataSource.sort = this.sort;
    console.log("....in do check --tiker detail: " + JSON.stringify(this.tradesForTicker));
  }
  onClick(event: any, row: any, i: any) {
    // this.highlightedRow = row;
    this.selectedIndex = i;
   
  }

}
