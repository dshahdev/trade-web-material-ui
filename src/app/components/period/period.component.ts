import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Period } from 'src/app/model/period.model';
import { Strdata } from 'src/app/model/strdata.model';
import { DateSelectionsComponent } from '../date-selections/date-selections.component';
import { MulSelectionsComponent } from '../mul-selections/mul-selections.component';

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
  @Input() yearList: Strdata[] = [];
  
   ;
  @ViewChild('years')
  yearSelectionsComponent: MulSelectionsComponent = new MulSelectionsComponent();

  @ViewChild('months')
  monthSelectionsComponent: MulSelectionsComponent = new MulSelectionsComponent();
  
  @ViewChild(DateSelectionsComponent)
  dateSelectionsComponent: DateSelectionsComponent = new DateSelectionsComponent();

  constructor() { }

  ngOnInit(): void {
    
  }

  getSelectedValues() {
    let p: Period = new Period();
    p.dates = this.dateSelectionsComponent.getSelectedValues();
    p.years = this.yearSelectionsComponent.getSelectedValues();
    p.months = this.monthSelectionsComponent.getSelectedValues();
    return p;
  }

  
   
}
