import { GroupCellRenderer } from '@ag-grid-enterprise/all-modules';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Options } from 'src/app/enum/options.enum';
import { MonthlySummary } from 'src/app/model/monthly-summary.model';
import { PortfolioDailyReturn } from 'src/app/model/portfolio-daily-return.model';
import { Strdata } from 'src/app/model/strdata.model';
import { TickerSummary } from 'src/app/model/ticker-summary.model';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})


export class BarchartComponent implements OnInit {
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
      
      console.log("date: "+date);
      date = date.split("-").join("");
      let yIndex = event.active[0]._chart.getElementAtEvent(event.event)[0]._datasetIndex;
      console.log("yIndex: "+ yIndex);
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
  globalFilterHandler(globalFilters){
    console.log("event data in: "+ JSON.stringify(globalFilters));
    
    this.globalFiltersEvent.emit(globalFilters);
  }
}
