import { GroupCellRenderer } from '@ag-grid-enterprise/all-modules';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Options } from 'src/app/enum/options.enum';
import { ChipData } from 'src/app/model/chip-data.model';
import { GlobalFilter } from 'src/app/model/global-filter.model';
import { MonthlySummary } from 'src/app/model/monthly-summary.model';
import { PortfolioDailyReturn } from 'src/app/model/portfolio-daily-return.model';
import { Strdata } from 'src/app/model/strdata.model';
import { TickerSummary } from 'src/app/model/ticker-summary.model';
import { SharedService } from 'src/services/shared.service';
import { HeadComponent } from '../head/head.component';


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})


export class BarchartComponent implements OnInit {

  chips = true;
  // chips setting
  
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    
    selectedFilter = [];
    chipObj: ChipData;
    chipObjArr = [];
    globalFilters:GlobalFilter;

  //setting dynamic headings
  
  @Input() monthList: Strdata[] = [];
  @Input() tickerList: Strdata[] = [];
  @Input() yearList: Strdata[] = [];
  @Input() realizedData: Strdata[] = [];
  @Input() strategyData: Strdata[] = [];
  @Input() barchartOptions: Strdata[] = [];

  @Output() barchrtClickedEvent = new EventEmitter();
  @Output() optionClickedEvent = new EventEmitter();
  @Output() globalFiltersEvent = new EventEmitter();

  @ViewChild(HeadComponent)
  headComponent: HeadComponent = new HeadComponent(null);


  fontStyleControl = new FormControl();
  fontStyle?: string;

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{id: 'A', type: 'linear', position: 'left'},
              {id: 'B', type: 'linear', position: 'right'}]
    },

  };

 
  barChartLabels: Label[] = ['Realized$','Unrealized$', 'Inv$', 'RealizedC$'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];



  barChartData: ChartDataSets[] = Array<ChartDataSets>();

  public barchartColors: Color[] = [
    { backgroundColor: 'red' }, 
    { backgroundColor: 'blue' },
    { backgroundColor: 'green' },
    { backgroundColor: 'black' },
    { backgroundColor: 'magenta' },
    { backgroundColor: 'yellow' },
    { backgroundColor: 'grey' },
    { backgroundColor: 'white' }
  ]
  constructor(private sharedService: SharedService) { }

  
  ngOnInit(): void {
    if (this.monthList.length > 0) {
      console.log("monthList: " + JSON.stringify(this.monthList))
      console.log(">>>>>.monthList: " + this.monthList);
      // this.selectedValue = this.monthList[0].strdata;
      // console.log("selectedValue: " + this.selectedValue);
      
    }

    if(this.tickerList.length > 0) {
      console.log("tickerList: "+ JSON.stringify(this.tickerList));
    }
   
  }

  callChartHover(event:any) {
    // console.log('this is called chartHover event ' + event.active[0]._chart.data.labels[event.active[0]._index]);
  }

  callChartClick(event:any) {
    console.log("onClick on chart: "+event);
    if(event.active.length > 0) {
      var color = "green";
      let date =   event.active[0]._chart.data.labels[event.active[0]._index];
      
      // console.log("date: "+date);
      date = date.split("-").join("");
      let yIndex = event.active[0]._chart.getElementAtEvent(event.event)[0]._datasetIndex;
      // console.log("yIndex: "+ yIndex);
      this.barchrtClickedEvent.emit({date,yIndex});

      console.log("value of data: " + event.active[0]._chart.data.datasets[yIndex].data[event.active[0]._index]);
    }
   
  }
 

  updateChart(pnldata: PortfolioDailyReturn[]) {
    this.barChartLabels = pnldata.map( e => e.positionDate);
    this.barChartData =  [{ data: pnldata.map( e => e.realized), label: 'Real$', yAxisID: 'A'},
                          { data: pnldata.map( e => e.onh), label: 'ONH$', yAxisID: 'A',  stack: 'a' },
                          { data: pnldata.map( e => e.swing), label: 'Swing$', yAxisID: 'A',  stack: 'a' },
                          { data: pnldata.map( e => e.sideBet), label: 'Side$', yAxisID: 'A',  stack: 'a' },
                          { data: pnldata.map( e => e.dayTrade), label: 'DT$', yAxisID: 'A',  stack: 'a' },
                          { data: pnldata.map( e => e.other), label: 'Oth$', yAxisID: 'A' ,  stack: 'a'},
                          { data: pnldata.map( e => e.unrealized), label: 'UnR$', yAxisID: 'A' },
                          { data: pnldata.map( e => e.sodInv), label: 'Inv$', type: 'line', yAxisID: 'B', fill: false, borderColor: '#6D9EEB', borderWidth: 1 },
                          { data: pnldata.map( e => e.cumuRealizedPnl), label: 'RealC$', type: 'line', yAxisID: 'B', fill: false, borderColor: '#60AF09', borderWidth: 2}]
  
  }

  updateData(data: any) {
    console.log("barchart data: "+ JSON.stringify(data));
  }
  selectedOption(option: string) {
    console.log("selected options: "+option);
    this.optionClickedEvent.emit(option);
  }

  globalFilterHandler(selectedFilters: GlobalFilter){
    // console.log("event data in chart-parent: "+ JSON.stringify(selectedFilters));
    this.globalFilters = selectedFilters
    this.globalFiltersEvent.emit(this.globalFilters);
    
    
    this.selectedFilter = [];
    ;
    for(const [key, value] of Object.entries(this.globalFilters)) {
      if(this.globalFilters[key]!== null  ) {
      
        if (key === "period") {
          let i: number = 0;
          if (this.globalFilters.period.selectedOption === "3") {
            var chipObj = new ChipData();
            chipObj.cameFrom = this.globalFilters.period.selectedOption;
            chipObj.sourceElement = 0;
            this.chipObjArr.push(chipObj)
            this.selectedFilter.push(value.selectedValues[0]+ " - "+value.selectedValues[1]);

          } else {

            this.globalFilters[key].selectedValues.forEach( e => {
            
              var chipObj = new ChipData();
              chipObj.cameFrom = this.globalFilters.period.selectedOption;
              chipObj.sourceElement = i;
              this.chipObjArr.push(chipObj)
              this.selectedFilter.push(e);
              i++;
              
            });
          }
          
        } else if(key === "tradeId") {
           if(value.length >= 2){
            var chipObj = new ChipData();

            chipObj.cameFrom = key;
            chipObj.sourceElement = 0;
           
            this.chipObjArr.push(chipObj)
            this.selectedFilter.push(value[0]+ " - "+value[1]);
            
           }
        } else if( key === "realized") {
          let i: number = 0;
          this.globalFilters[key].forEach(e =>{

            var chipObj = new ChipData();

            chipObj.cameFrom = key
            chipObj.sourceElement = i;
            this.chipObjArr.push(chipObj);
            this.selectedFilter.push(e);
            i++;
          })
        } else if( key === "strategy") {
          let i: number = 0;
          this.globalFilters[key].forEach(e =>{
           
            var chipObj = new ChipData();

            chipObj.cameFrom = key;
            chipObj.sourceElement = i;
            this.chipObjArr.push(chipObj)
            this.selectedFilter.push(e);
            i++;
          })
        } else if(key === "ticker") {
          let i: number = 0;
          this.globalFilters[key].forEach(e =>{
           
            var chipObj = new ChipData();

            chipObj.cameFrom = key;
            chipObj.sourceElement = i;
            this.chipObjArr.push(chipObj)
            this.selectedFilter.push(e);
            i++;
          })

        }
         else {
          let i: number = 0;
            var chipObj = new ChipData();

            chipObj.cameFrom = key;
            chipObj.sourceElement = i;
            this.chipObjArr.push(chipObj)
            this.selectedFilter.push(value);
        }
      }
    }
  
  }



  remove(filter) : void {
    
    const index = this.selectedFilter.indexOf(filter);
    const obj: ChipData = this.chipObjArr[index];

    this.updateGlobalFilterFromChipData(obj);

    this.chipObjArr.splice( index, 1);
    this.selectedFilter.splice(index, 1);

    this.headComponent.setSelectedValues(this.globalFilters);
    this.globalFiltersEvent.emit(this.globalFilters);
  }

  updateGlobalFilterFromChipData(cd: ChipData) {
    if (cd.cameFrom === "1" || cd.cameFrom === "2" ) {
      this.globalFilters.period.selectedValues.splice(cd.sourceElement, 1);
    } else if(cd.cameFrom === "3") {
      this.globalFilters.period.selectedValues[0] = "";
      this.globalFilters.period.selectedValues[1] = "";
    }
      else if (cd.cameFrom === "ticker") {
      this.globalFilters.ticker.splice(cd.sourceElement,1 );
    } else if (cd.cameFrom === "realized") {
      this.globalFilters.realized.splice(cd.sourceElement,1 );
    } else if (cd.cameFrom === "strategy") {
      this.globalFilters.strategy.splice(cd.sourceElement,1 );
    } else if (cd.cameFrom === "tradeId") {
      this.globalFilters.tradeId[0] = "";
      this.globalFilters.tradeId[1] = "";
    } else if (cd.cameFrom === "chartOption") {
      this.globalFilters.chartOption.splice(cd.sourceElement,1 );
    }
  }

}
