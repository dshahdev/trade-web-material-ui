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

  @Input() tradesForDate: Trade[] = [];
  @Input() tradeDate: string = "";

 displayedColumns: string[] = ['ticker', 'buyTradeId', 'sellTradeId', 'allocatedQty','pnl','cost','price']
  
  highlightedRow = "";
  
  date: string = '';

  dataSource = new MatTableDataSource<Trade>([]);

  @ViewChild(MatTab) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    
  }


  ngAfterViewChecked(): void {
    console.log("tradesForDate: " + this.tradesForDate );
    this.dataSource.data = this.tradesForDate;
    if (this.tradesForDate.length > 0) {
      this.date = this.tradesForDate[0].date.substring(0, 10);
    }
    this.dataSource.sort = this.sort;
    
   
  }
  
  onClick(event: any, row: any) {
    this.highlightedRow = row;

  }

  getDetailsOfDate(date: String) {
    let formattedDate = date.split("-").join("");
    console.log("fd: in detail compo: " +formattedDate);   
    this.sharedService.getPnlDetailForDate(formattedDate).subscribe((response) => {
      console.log("res for detail data : " + JSON.stringify(response));
      this.dataSource.data = response;
      
    });
  }
}