import { Component, Input, OnInit } from '@angular/core';
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

  @Input() title: String = "";
  constructor() { }

  ngOnInit(): void {
  }


  getSelectedValues():Array<string> {

    let arr : Array<string> = [];
    console.log(this.range.value);

    let start = this.convert( this.range.value.start);
    let end = this.convert(this.range.value.end);


    // console.log(start + " " + end);

    arr.push(start);
    arr.push(end);

    // console.log(arr);
    return arr;
  }

  convert(str) {
  
    var dateObj = new Date(str);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var fd = year + "-" + (month < 10 ? "0" + month: month) + "-" + (day < 10 ? "0" + day: day);

    return fd;
  }

  
}
