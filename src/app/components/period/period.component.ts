import { ColumnsToolPanelModule } from '@ag-grid-enterprise/all-modules';
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


  tl = "Years";
  tl2 = "Months"
  tl3 = "Date";

  period: string;

  @Input() monthList: Strdata[] = [];
  @Input() yearList: Strdata[] = [];


  

  @ViewChild('years')
  yearSelectionsComponent: MulSelectionsComponent = new MulSelectionsComponent();

  @ViewChild('months')
  monthSelectionsComponent: MulSelectionsComponent = new MulSelectionsComponent();

  @ViewChild(DateSelectionsComponent)
  dateSelectionsComponent: DateSelectionsComponent = new DateSelectionsComponent();

  @ViewChild(MulSelectionsComponent)
  mulSelectionsComponent: MulSelectionsComponent = new MulSelectionsComponent();

  passedYears = [];
  passedMonths = [];
  passedDates = [];

  constructor() { }

  ngOnInit(): void {

  }

  setSelectedValues(period:Period) {
    this.period = period === null ? "1": period.selectedOption;
    if (this.period === "1") {
      this.yearSelectionsComponent.setSelectedValues(period.selectedValues)
    } else if (this.period === "2") {
      this.monthSelectionsComponent.setSelectedValues(period.selectedValues);
    } else if (this.period === "3") {
      this.dateSelectionsComponent.setSelectedValues(period.selectedValues); 
    }
    return this.period;
  }

  getSelectedValues() {
    console.log("PERIOD *********************")
    console.log(this.period);

    let p: Period = new Period();
    p.selectedOption = this.period;
    if (this.period === "1") {
      p.selectedValues = this.yearSelectionsComponent.getSelectedValues()
    } else if (this.period === "2") {
      p.selectedValues = this.monthSelectionsComponent.getSelectedValues();
    } else if (this.period === "3") {
      p.selectedValues = this.dateSelectionsComponent.getSelectedValues(); 
    }

    console.log(p);
    console.log("----------------------")
    return p;
  }

  // ngDoCheck() {
  //   console.log("selected data to remove... "+ this.periodData);
  // }

}
