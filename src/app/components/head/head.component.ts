import { ColumnsToolPanelModule } from '@ag-grid-enterprise/all-modules';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { GroupedObservable } from 'rxjs';
import { GlobalFilter } from 'src/app/model/global-filter.model';
import { Strdata } from 'src/app/model/strdata.model';
import { Trade } from 'src/app/model/trade.model';
import { SharedService } from 'src/services/shared.service';
import { DateSelectionsComponent } from '../date-selections/date-selections.component';
import { MulSelectionsComponent } from '../mul-selections/mul-selections.component';
import { PeriodComponent } from '../period/period.component';
import { TradeIdComponent } from '../trade-id/trade-id.component';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  

  @ViewChild(MatAccordion) accordion: MatAccordion;

  value = '';
  value1 = "Pinal";
  MTD$ = "00.00";
  YTD$ = "00.00";
  performance = "100%"

  title = "Months";
  title2 = "Tickers"
  title3 ="Realized$";
  title4 = "Strategy";
  title5 = "Trade Id";
  title6 = "Barchart Options";
  // barOptions: Strdata[]= [{strdata:"Ticker"},{strdata:"Realized"},{strdata:"Month"},{strdata:"Week"},{strdata:"Date"},{strdata:"Trade Id"}];
  
  date: string = "";
  selectedValue: string = "xxx";
  selectedMonth: string = "";
  fileName: String = "";

  // monthList: MonthList[] = [];
  @Input() monthList: Strdata[] = [];
  @Input() tickerList: Strdata[] = [];
  @Input() yearList: Strdata[] = [];
  @Input() realizedData: Strdata[] = [];
  @Input() strategyData: Strdata[] = [];
  @Input() barchartOptions: Strdata[] = [];


  @Output() globalFilterNotification = new EventEmitter();
  @Output() searchNotification = new EventEmitter();

  
  
  @ViewChild('tickerselect')
  tickerSelectComponent: MulSelectionsComponent = new MulSelectionsComponent();

  @ViewChild('realized')
  realizedSelectComponent: MulSelectionsComponent = new MulSelectionsComponent();

  @ViewChild('strategy')
  strategySelectComponent: MulSelectionsComponent = new MulSelectionsComponent();

  @ViewChild('barchart')
  barchartSelectComponent: MulSelectionsComponent = new MulSelectionsComponent();


  @ViewChild(TradeIdComponent)
  tradeIdSelectComponent: TradeIdComponent = new TradeIdComponent();

  @ViewChild(PeriodComponent)
  periodComponent: PeriodComponent = new PeriodComponent();


  monthlyDetail: Strdata[] = []
  tradesForDate: Trade[] = [];

  globalFilters: GlobalFilter;

  constructor(private sharedService: SharedService) { }PeriodComponent

  ngOnInit(): void {
   
    if (this.monthList.length > 0) {
      console.log("monthList: " + JSON.stringify(this.monthList))
      console.log(">>>>>.monthList: " + this.monthList);
      this.selectedValue = this.monthList[0].strdata;
      console.log("selectedValue: " + this.selectedValue);
      
    }

    if(this.tickerList.length > 0) {
      console.log("tickerList: "+ JSON.stringify(this.tickerList));
    }

  }

submitPressed() {
  this.globalFilters = new GlobalFilter();

  //set the instance for GloablFileter object.
 this.globalFilters.period =  this.periodComponent.getSelectedValues();
 this.globalFilters.ticker = this.tickerSelectComponent.getSelectedValues();
 this.globalFilters.realized = this.realizedSelectComponent.getSelectedValues();
 this.globalFilters.strategy = this.strategySelectComponent.getSelectedValues();
 this.globalFilters.tradeId = this.tradeIdSelectComponent.getSelectedValues();
 this.globalFilters.chartOption = this.barchartSelectComponent.getSelectedValues();

 this.globalFilterNotification.emit(this.globalFilters);
}


  updateSelection(selectedMonth) {
    this.selectedValue = selectedMonth;
  }
  applyFilter(val: string) {
    console.log("given ticker value: " + val)
    this.searchNotification.emit(val);
  }

  selectMonth(month: any) {
    console.log("selected month: " + month);
    this.globalFilterNotification.emit(month)
  }


  handleFileInput(event: any) {
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0]);

    this.fileName = event.target.value;
    console.log("file to upload: " + JSON.stringify(this.fileName));
    let fileFormat: any = this.fileName.split("\\");

    if (fileFormat.length === 3) {

      let FileToUpload = fileFormat[fileFormat.length - 1]
      console.log("file to upload: " + FileToUpload);
      let ft = FileToUpload.split(".");
      if (ft.length === 3) {

        if (ft[0] === "TRADEDATA" && ft[1].length === 8 && ft[2] === "CSV") {
          this.fileName = ft.join(".");
          console.log("Correct File: " + this.fileName);
          this.sharedService.uploadCSVfile(formData).subscribe((response) => {

            var res: Boolean = response.result;

            if (res == false) {
              console.log("failed uploading the file " + JSON.stringify(response));
            } else {
              this.sharedService.processCSVFile(this.fileName).subscribe((response) => {
                var result: Boolean = response.result;

                if (res == false) {
                  console.log("failed processing the file" + JSON.stringify(response));
                } else {
                  console.log("processed the file successfully " + JSON.stringify(response));
                }

              })

            }

          })
        } else {
          console.log("not-Correct File: " + this.fileName);
          console.log("check your file-name");
        }


      } else {
        console.log("your file must be CSV file");
      }

    }


  }

  downLoadData() {
    console.log("download is clicked....")
    this.sharedService.savePrices().subscribe((response) => {
      console.log("download done: " + response);
    });
  }

  
  

}
