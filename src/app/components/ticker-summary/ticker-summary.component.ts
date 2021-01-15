import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { MatSort} from '@angular/material/sort';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { TickerSummary } from 'src/app/model/ticker-summary.model';
import { DatePnlDetail } from 'src/app/model/date-pnl.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-ticker-summary',
  templateUrl: './ticker-summary.component.html',
  styleUrls: ['./ticker-summary.component.css']
})

export class TickerSummaryComponent implements OnInit, AfterViewInit {

  details: boolean = false;
  ticker: string = "";
  highlightedRow = "";


  displayedColumns: string[] = ['ticker', 'pnl'];
  displayedColumns2: string[] = ['date', 'pnl'];
  
  dataSource = new MatTableDataSource<TickerSummary>([]);
  dataSource2 = new MatTableDataSource<DatePnlDetail>([])

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getPnlByTicker().subscribe((response) => {
        console.log("pnl Data: " + JSON.stringify(response));
        this.dataSource.data = response;
        // this.table.renderRows();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onClick(event:any, row: any) {
   this.ticker = event.target.innerText;
    this.highlightedRow = row;
    
    console.log("ticker: " + this.ticker);
    if(typeof this.ticker === 'string' ){
      this.sharedService.getPnlForTicker(this.ticker).subscribe((response) => {
        console.log("ticker response: " + JSON.stringify(response));
        if(response !== null) {
          this.details = true;
          this.dataSource2.data = response;
        }
      })
    } else {
      console.log("select the ticker.....");
      // send some Message;
    }
  }

}
