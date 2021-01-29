import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { ProtfolioSummary } from 'src/app/model/portfolio-summary.model';

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.css']
})
export class PortfolioSummaryComponent implements OnInit {


  @Output() positionDateEvent: EventEmitter<any> = new EventEmitter();


  displayedColumns: string[] = ['positionDate','inv', 'mv', 'unrPnl', 'retP'];
  highlightedRow = "";
  selectedIndex:number=0;
  
  dataSource = new MatTableDataSource<ProtfolioSummary>([]);

  @ViewChild(MatTab) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public datepipe: DatePipe) { }

  ngOnInit(): void {

  }

  onClick(event: any, row:any, i: number) {
   
    this.selectedIndex = i;
    
    let pdate = this.datepipe.transform(row.positionDate, 'yyyy-MM-dd');
    let formattedDate = pdate.split("-").join("");
    this.positionDateEvent.emit(formattedDate);
   
  }

  updateData(portFolioSumm: ProtfolioSummary[]) {
    
    // console.log("portfolio summary in >>>>>: " + JSON.stringify(portFolioSumm));
    this.dataSource.data = portFolioSumm;
    this.dataSource.sort = this.sort;
  }

}
