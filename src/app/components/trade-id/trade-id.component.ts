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
  constructor() { }

  ngOnInit(): void {
  }

  getSelectedValues():Array<string> {
    let idRange = [];
   
     if(typeof this.startId === "number") {
      idRange.push(this.startId);
     } 
     if(typeof this.endId === "number") {
      idRange.push(this.endId);
     }
    console.log(this.startId + " "+ this.endId);
    
    return idRange;
  }
}
