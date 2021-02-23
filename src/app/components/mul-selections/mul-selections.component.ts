import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { MonthList } from 'src/app/model/month-list.model';

@Component({
  selector: 'app-mul-selections',
  templateUrl: './mul-selections.component.html',
  styleUrls: ['./mul-selections.component.css']
})
export class MulSelectionsComponent implements OnInit {
  form = FormGroup;
  months = new FormControl();
  @Input() monthList: MonthList[] = [];

  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor() {
 
   }

  ngOnInit(): void {
  //  this.months = ["January 2021"];
  }
  
  selectedMonths() {
    // console.log(Object.entries(this.months)); // [ ['foo', 'bar'] ]
    // console.log("selected month: " + Object.keys(this.months[key);
    // this.monthSelectedNotification.emit(month)
  }
  ngDoCheck() {
    // console.log(this.months.value);
  }
  getMonthsValue():Array<string> {
    console.log(this.months.value);
    return this.months.value;
  }

  setMonthList(monthList){
    console.log("monthList in selectcompo: "+monthList);
  }
  
}
