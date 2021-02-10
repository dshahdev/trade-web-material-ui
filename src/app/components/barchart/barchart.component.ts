import { GroupCellRenderer } from '@ag-grid-enterprise/all-modules';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { MonthlySummary } from 'src/app/model/monthly-summary.model';
import { PortfolioDailyReturn } from 'src/app/model/portfolio-daily-return.model';
import { TickerSummary } from 'src/app/model/ticker-summary.model';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  //setting dynamic headings
  
  @Output() barchrtClickedEvent = new EventEmitter()
  

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

  // barChartData: ChartDataSets[] = [
  //   { data: [], label: 'Profit Loss' }
  // ];

  barChartData: ChartDataSets[] = Array<ChartDataSets>();

  constructor(private sharedService: SharedService) { }

  
  ngOnInit(): void {
   
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

      //if yIndex === 0(realized$) -- Trades pnlForDate
      //if yIndex === 1(Unrealized$) -- call positions
      //if yIndex === 2(Inv$) -- call positions
      //if yIndex === 3(RealizedC$) -- call Ticker and pnl

      switch(yIndex) {
        case 0:
          //call ticker and pnl for date
          console.log("sending date: "+date);
         
          this.barchrtClickedEvent.emit(date);
          break;
        case 1:
          //call positions
          break;
        case 2:
          //call positions
          break;
        case 3:
          // call ticker and pnl for date
         break;
      }

      console.log("value of data: " + event.active[0]._chart.data.datasets[yIndex].data[event.active[0]._index]);
    }
    // console.log('this is called from chartClick event ' + event.active[0]._chart.data.labels[event.active[0]._index]);
    // console.log('this is called from chartClick event ' + event.active[0]._chart.data.datasets[event.active[0]._datasetIndex].data[event.active[0]._index]);
    // console.log('chartClick: whicy Y-axis clicked >> ' + event.active[0]._chart.getElementAtEvent(event.event)[0]._datasetIndex); 
    // console.log('chartClick: whicy data Index from X-axis clicked >> ' + event.active[0]._chart.getElementAtEvent(event.event)[0]._index); 
    // let dataset;
    // let date =   event.active[0]._chart.data.labels[event.active[0]._index]
  }
 
 
   
  updateChart(pnldata: PortfolioDailyReturn[]) {
    this.barChartLabels = pnldata.map( e => e.positionDate)

    this.barChartData =  [{ data: pnldata.map( e => e.realized), label: 'Realized$', yAxisID: 'A' },
                          { data: pnldata.map( e => e.unrealized), label: 'Unrealized$', yAxisID: 'A' },
                          { data: pnldata.map( e => e.sodInv), label: 'Inv$', type: 'line', yAxisID: 'B', fill: false, borderColor: '#6D9EEB', borderWidth: 1 },
                          { data: pnldata.map( e => e.cumuRealizedPnl), label: 'RealizedC$', type: 'line', yAxisID: 'B', fill: false, borderColor: '#60AF09', borderWidth: 2}]
  }
// , backgroundColor: '#60AF09'
// , backgroundColor: '#D3D3D3'
  updateData(data: any) {
    console.log("barchart data: "+ JSON.stringify(data));
  }

}
