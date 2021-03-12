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

  @Input() title: string = "";
  @Input() data: Strdata[] = [];
  @Output() periodDataNotification = new EventEmitter();
  
  constructor() {}

  ngOnInit(): void {
  }
  

   getSelectedValues() {
    console.log(this.selectedValues.value);
    console.log(this.title);
    return this.selectedValues.value;
    
  }

  setSelectedValues(valuesToSelect: any) {
    this.selectedValues.setValue(valuesToSelect);
    console.log("new values.."+valuesToSelect);
  }
  
  changeEvent(event){
    console.log("event value in mul-selection: "+event);
  }
  
  
}
