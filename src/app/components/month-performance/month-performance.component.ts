import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MonthlySummary } from 'src/app/model/monthly-summary.model';
import { TickerSummary } from 'src/app/model/ticker-summary.model';

@Component({
  selector: 'app-month-performance',
  templateUrl: './month-performance.component.html',
  styleUrls: ['./month-performance.component.css']
})

export class MonthPerformanceComponent  implements OnInit{
 

 dataSource = new MatTableDataSource<MonthlySummary>([]);
 @ViewChild(MatTable) table!: MatTable<any>;
 @ViewChild(MatSort) sort!: MatSort;

 headings = [];
 displayedColumns: string[] = [];
 data = [];
 hideComp: boolean = false;

  ngOnInit() {
   
  }

  
 updateChart(pnldata: any[]) {
  this.hideComp =true;
  console.log(">>>>monthly pnl: "+ JSON.stringify(pnldata));
  var obj = pnldata.length > 0 ? pnldata[0]:{}

  this.displayedColumns = []
  this.headings = ["MY TICKER","MYPNL"]

  for(var k in obj) {
    this.headings.push(k + "X");
    this.displayedColumns.push(k)
    }

    this.dataSource.data = pnldata;   
    this.dataSource.sort = this.sort;
  console.log(this.displayedColumns);
  
} 
  

  
}
