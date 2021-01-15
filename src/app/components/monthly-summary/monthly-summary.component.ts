import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MonthlySummary } from 'src/app/model/monthly-summary.model';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-monthly-summary',
  templateUrl: './monthly-summary.component.html',
  styleUrls: ['./monthly-summary.component.css']
})
export class MonthlySummaryComponent implements OnInit {

  displayedColumns: string[] = ['month', 'pnl'];
  dataSource = new MatTableDataSource<MonthlySummary>([]);

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getPnlByMonth().subscribe((response) => {
      console.log("monthly response: " + response);
      this.dataSource.data = response;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
