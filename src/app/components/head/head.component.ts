import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MonthList } from 'src/app/model/month-list.model';
import { Trade } from 'src/app/model/trade.model';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  value = '';
  value1 = "Pinal";
  MTD$ = "00.00";
  YTD$ = "00.00";
  performance = "100%"


  date: string = "";
  selectedValue: string= "xxx";
  selectedMonth: string = "";
  fileName: String = "";

  // monthList: MonthList[] = [];
  @Input() monthList: MonthList[] = [];

  @Output() monthSelectedNotification = new EventEmitter();
  @Output() searchNotification = new EventEmitter();

  monthlyDetail: MonthList[] = []
  tradesForDate: Trade[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    if (this.monthList.length > 0) {
      console.log(">>>>>.monthList: "+ this.monthList);
      this.selectedValue = this.monthList[0].strdata;
      console.log("selectedValue: "+ this.selectedValue);
    }

  }

  updateSelection(selectedMonth) {
    this.selectedValue = selectedMonth;
  }
  applyFilter(val: string) {
    console.log("given ticker value: "+val)
    this.searchNotification.emit(val);
  }

  selectMonth(month: any ) {
    console.log("selected month: " +month);
    this.monthSelectedNotification.emit(month)
  }

  
  handleFileInput(event:any) {
    const formData: FormData = new FormData();
    formData.append('file',event.target.files[0]);
    
    this.fileName = event.target.value;
    console.log("file to upload: "+ JSON.stringify(this.fileName));
    let fileFormat:any = this.fileName.split("\\");
    
    if(fileFormat.length === 3 ) {
  
      let FileToUpload = fileFormat[fileFormat.length-1]
      console.log("file to upload: "+ FileToUpload);
      let ft = FileToUpload.split(".");
      if(ft.length === 3) {
        
        if(ft[0] === "TRADEDATA" && ft[1].length === 8 && ft[2] === "CSV" ) {
          this.fileName = ft.join(".");
          console.log("Correct File: "+this.fileName);
          this.sharedService.uploadCSVfile(formData).subscribe((response) => {

            var res: Boolean = response.result;

            if (res == false) {
              console.log("failed uploading the file "+ JSON.stringify(response));
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
          console.log("not-Correct File: "+this.fileName);
          console.log("check your file-name");
        }
    
      
      } else  {
        console.log("your file must be CSV file");
      }
  
    }
    

  }

  downLoadData() {
    console.log("download is clicked....")
    this.sharedService.savePrices().subscribe((response) => {
        console.log("download done: "+response);
    });
  }

  
}
