import { Component, OnInit, VERSION, ViewChild } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  // tiles: Tile[] = [
  //   {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
  //   {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
  //   {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  //   {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  // ];

  // tiles2: Tile[] = [
  //   {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
  //   {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
  //   {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  // ]

  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 3;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 3;
  }


}

