import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade-id',
  templateUrl: './trade-id.component.html',
  styleUrls: ['./trade-id.component.css']
})
export class TradeIdComponent implements OnInit {
  @Input() title: String = "";
  startId= "";
  endId = "";
  idRange = [];
  constructor() { }

  ngOnInit(): void {
  }

  getSelectedValues():Array<string> {
    
   
     if(typeof this.startId === "number") {
      this.idRange.push(this.startId);
     } 
     if(typeof this.endId === "number") {
      this.idRange.push(this.endId);
     }
    console.log(this.startId + " "+ this.endId);
    
    return this.idRange;
  }

  setSelectedValues(valuesToSelect: any[]) {
    console.log("new values.."+valuesToSelect);
    this.startId = valuesToSelect[0];
    this.endId = valuesToSelect[1];
    this.idRange.push(valuesToSelect);
    console.log("new values.."+valuesToSelect);
  }
}
