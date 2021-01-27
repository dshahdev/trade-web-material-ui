import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { Trade } from 'src/app/model/trade.model';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

 
  @Input() tradeDate: string = "";

 displayedColumns: string[] = ['date','ticker', 'buyTradeId', 'sellTradeId', 'allocatedQty','pnl','cost','price']
  
  highlightedRow = "";
  
  date: string = '';

  dataSource = new MatTableDataSource<Trade>([]);

  @ViewChild(MatTab) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  

  constructor() { }

  ngOnInit(): void {
    
  }


  
  
  onClick(event: any, row: any) {
    this.highlightedRow = row;

  }

  updateData(tradesForDate: Trade[]) {
    console.log("data in detail component: " + tradesForDate);
    this.dataSource.data = tradesForDate;
    if (tradesForDate.length > 0) {
      this.date = tradesForDate[0].date.substring(0, 10);
    }
    this.dataSource.sort = this.sort;
  }
  
}
