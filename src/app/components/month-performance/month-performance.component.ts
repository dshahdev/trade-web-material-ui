import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MonthlySummary } from 'src/app/model/monthly-summary.model';

@Component({
  selector: 'app-month-performance',
  templateUrl: './month-performance.component.html',
  styleUrls: ['./month-performance.component.css']
})

export class MonthPerformanceComponent  {
 
 @Input() monthlyPnl: MonthlySummary[] = [];

 @ViewChild(MatTable) table!: MatTable<any>;
 @ViewChild(MatSort) sort!: MatSort;

 displayedColumns: string[] = ['month', 'pnl'];
 
 dataSource = new MatTableDataSource<MonthlySummary>([]);

 updateChart(pnldata: MonthlySummary[]) {
  console.log(">>>>monthly pnl: "+ JSON.stringify(pnldata));
  this.dataSource.data = pnldata;
  console.log("in monthly performance: "+ JSON.stringify(this.dataSource.data));
} 
  ngAfterViewInit(): void {
   
    this.dataSource.sort = this.sort;
  }

}
