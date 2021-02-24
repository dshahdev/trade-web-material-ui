import { Component, Input, OnInit } from '@angular/core';
import { Strdata } from 'src/app/model/strdata.model';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {

    
  tl="Years";
  tl2="Months"
  tl3="Date";

  @Input() monthList: Strdata[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }
   ngDocheck() {
     console.log("in periods: "+this.monthList)
   }
}
