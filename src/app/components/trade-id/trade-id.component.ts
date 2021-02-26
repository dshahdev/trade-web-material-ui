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
     
    console.log(this.startId + " "+ this.endId);
    let idRange = [];
    idRange.push(this.startId);
    idRange.push(this.endId);

    return idRange;
  }
}
