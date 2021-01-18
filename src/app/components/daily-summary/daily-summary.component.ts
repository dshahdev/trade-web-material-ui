import { Component, Input, OnInit,DoCheck, ViewChild, Output, EventEmitter } from '@angular/core';
import { DatePnlDetail } from 'src/app/model/date-pnl.model';
import { MatSort} from '@angular/material/sort';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { SharedService } from '../../../services/shared.service';
import { Trade } from 'src/app/model/trade.model';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.css']
})
export class DailySummaryComponent implements OnInit {

  @Input() datePnlDetail: DatePnlDetail[] = [];

  @Output() detailTradesEvent: EventEmitter<any> = new EventEmitter();

  detailTradesForDate: Trade[] = [];

  displayedColumns: string[] = ['date', 'pnl'];
  highlightedRow = "";
  selectedIndex:number=0;

  date: string = "";

  dataSource = new MatTableDataSource<DatePnlDetail>([]);

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  
  

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  
    
  }


  ngAfterViewChecked(): void {
    this.dataSource.data = this.datePnlDetail;
    this.dataSource.sort = this.sort;
  }

  onClick(event: any, row: any, i: any) {
    this.selectedIndex = i;
    let formattedDate = row.date.split("-").join("");

    this.detailTradesEvent.emit(formattedDate);
  }
     
}
