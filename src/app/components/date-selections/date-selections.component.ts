import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-date-selections',
  templateUrl: './date-selections.component.html',
  styleUrls: ['./date-selections.component.css']
})
export class DateSelectionsComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor() { }

  ngOnInit(): void {
  }

}
