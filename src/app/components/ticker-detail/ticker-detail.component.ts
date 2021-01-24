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

  
  

  updateData(tradesForDate: Trade[]) {
    console.log("data in detail component: " + tradesForDate);
    this.dataSource.data = tradesForDate;
    
    this.dataSource.sort = this.sort;
  }
  
  onClick(event: any, row: any, i: any) {
    this.selectedIndex = i;
   
  }

}
