import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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

  @Output() selectedDateEvent = new EventEmitter();


  displayedColumns: string[] = ['positionDate','ticker', 'qty', 'cost','curPx', 'priorPx','inv','value','prior','unrPnl','dodPnl','returnP','dailyP']
 
  dataSource = new MatTableDataSource<Position>([]);
  date = new FormControl(new Date());
  events: string[] = [];


  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
   
  }
  updateData(currentPosition: Position[]) {
    console.log(">>>currentPosition: "+ JSON.stringify(currentPosition));
    this.dataSource.data = currentPosition;
    this.dataSource.sort = this.sort;
    
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    let fd = this.convert(this.events[1]);
    fd = fd.split('-').join('');  
    this.selectedDateEvent.emit(fd);
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
