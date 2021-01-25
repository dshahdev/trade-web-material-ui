import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Position } from 'src/app/model/position.model';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-current-position',
  templateUrl: './current-position.component.html',
  styleUrls: ['./current-position.component.css']
})
export class CurrentPositionComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['ticker', 'qty', 'pnl','pnlPercentage','cost','price','value'];
 
  dataSource = new MatTableDataSource<Position>([]);

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
   
  }
  updateData(currentPosition: Position[]) {
    console.log(">>>currentPosition: "+ currentPosition);
    this.dataSource.data = currentPosition;
    this.dataSource.sort = this.sort;
    
  }

}
