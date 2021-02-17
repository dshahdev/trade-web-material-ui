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
 
//  @Input() monthlyPnl: MonthlySummary[] = [];

 dataSource = new MatTableDataSource<MonthlySummary>([]);
 @ViewChild(MatTable) table!: MatTable<any>;
 @ViewChild(MatSort) sort!: MatSort;

 headings = [];
 displayedColumns: string[] = [];
 data = [];

  ngOnInit() {
    this.headings = ["First Name", "Last Name", "Age (in Years)"];
    this.displayedColumns = ["firstname", "lastname", "age"];
    this.data = [
      { firstname: "aa", lastname: "patel", age: 30 },
      { firstname: "bb", lastname: "shah", age: 40 }
    ];
  }

  someEvent() {
    this.headings = ["empname", "phone", "address", "ssn", "location"];
    this.displayedColumns = ["empname", "phone", "address", "ssn", "location"];
    this.data = [
      {
        empname: "bb",
        phone: "1232342345",
        address: "bemedow",
        ssn: "123121234",
        location: "parsippany"
      },
      {
        empname: "cc",
        phone: "123",
        address: "test 2",
        ssn: "99999999",
        location: "Whippany"
      }
    ];
  }
 updateChart(pnldata: any[]) {
  console.log(">>>>monthly pnl: "+ JSON.stringify(pnldata));
  var obj = pnldata.length > 0 ? pnldata[0]:{}

  this.displayedColumns = []
  this.headings = ["MY TICKER","MYPNL"]

  for(var k in obj) {
    this.headings.push(k + "X");
    this.displayedColumns.push(k)
    }

    // this.data = pnldata;
    this.dataSource.data = pnldata;
    
    this.dataSource.sort = this.sort;
    
   

    // // this.headings = ["firstname", "lastname", "age"];
    // // this.displayedColumns = ["firstname", "lastname", "age"];
    // this.data = [
    //   { firstname: "aa", lastname: "patel", age: 30 },
    //   { firstname: "bb", lastname: "shah", age: 40 }
    // ];

  console.log(this.displayedColumns);
  // this.dataSource.data = pnldata;
  // this.dataSource.sort = this.sort;
  // console.log("in monthly performance: "+ JSON.stringify(this.dataSource.data));
} 
  

  
}
