import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import { Strdata } from '../../model/strdata.model';

@Component({
  selector: 'app-mul-selections',
  templateUrl: './mul-selections.component.html',
  styleUrls: ['./mul-selections.component.css']
})
export class MulSelectionsComponent implements OnInit {
  form = FormGroup;
  selectedValues = new FormControl();
  @Input() title: String = "";
  @Input() data: Strdata[] = [];
  @Output() periodDataNotification = new EventEmitter();
  

  constructor() {}

  ngOnInit(): void {
  }
  

   getSelectedValues():Array<string> {
     
    console.log(this.selectedValues.value);
    return this.selectedValues.value;
  }

  
  changeEvent(event){
    console.log("event value in mul-selection: "+event);
  }

  
  
}
