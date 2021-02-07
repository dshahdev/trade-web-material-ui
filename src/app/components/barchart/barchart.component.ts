import { GroupCellRenderer } from '@ag-grid-enterprise/all-modules';
import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { MonthlySummary } from 'src/app/model/monthly-summary.model';
import { PortfolioDailyReturn } from 'src/app/model/PortfolioDailyReturn.model';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{id: 'A', type: 'linear', position: 'left'},
              {id: 'B', type: 'linear', position: 'right'}]
    },

  };

  // tooltips: {
  //   callbacks: {
  //     title: function (tooltipItems, data) {
  //       return data.datasets[tooltipItems[0].datasetIndex].label;
  //     },
  //     label: function (tooltipItems, data) {
  //       console.log(data);
  //       return data.datasets[tooltipItems.datasetIndex].label ;
  //     }
  //   }
  // }
//  scales: {
//   yAxes: [ {type: "bar", "id": "y-axis-1",display:true, position: "left"}
// ]
// }
  // barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Best Fruits' }
  ];
  constructor() { }

  
  ngOnInit(): void {
    // console.log("monthly pnl: "+ this.monthlyPnl);
  }

  callChartHover(event:any) {
    console.log('this is called chartHover event ' + event.active[0]._chart.data.labels[event.active[0]._index]);
  }
 
   
  updateChart(pnldata: PortfolioDailyReturn[]) {
    this.barChartLabels = pnldata.map( e => e.positionDate)

    this.barChartData =  [{ data: pnldata.map( e => e.realized), label: 'Realized$', yAxisID: 'A' },
                          { data: pnldata.map( e => e.unrealized), label: 'Unrealized$', yAxisID: 'A' },
                          { data: pnldata.map( e => e.sodInv), label: 'Inv$', type: 'line', yAxisID: 'B', fill: false, borderColor: '#6D9EEB', borderWidth: 1 },
                          { data: pnldata.map( e => e.cumuRealizedPnl), label: 'RealizedC$', type: 'line', yAxisID: 'B', fill: false, borderColor: '#60AF09', borderWidth: 2}]
  }

}
