import { Component, Input, OnInit, Output, ViewChild, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { Trade } from 'src/app/model/trade.model';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { SharedService } from '../../../services/shared.service';
import { DialogOverviewExampleDialog } from './dialog/dialog-overview-example-dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  animal: string;
  name: string;

  @Input() tradeDate: string = "";

  displayedColumns: string[] = ['date','ticker', 'buyTradeId', 'sellTradeId', 'allocatedQty','pnl','cost','price']
  
  highlightedRow = "";
  
  date: string = '';

  dataSource = new MatTableDataSource<Trade>([]);

  @ViewChild(MatTab) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  onClick(event: any, row: any, i: any) {
    this.highlightedRow = row;

    console.log("row: "+ JSON.stringify(row.sellTradeId));
//
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: row.sellTradeId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      console.log("result: "+ this.animal);
    });

//
  }

  updateData(tradesForDate: Trade[]) {
    // console.log("data in detail component: " + tradesForDate);
    this.dataSource.data = tradesForDate;
    if (tradesForDate.length > 0) {
      this.date = tradesForDate[0].date.substring(0, 10);
    }
    this.dataSource.sort = this.sort;
  }
  
}

