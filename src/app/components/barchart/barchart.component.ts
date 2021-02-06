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
    }
  };

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
 
   
  updateChart(pnldata: PortfolioDailyReturn[]) {
    // console.log(">>>>monthly pnl: "+ JSON.stringify(pnldata));
    this.barChartLabels = []
    let data1:any = [];
    let data2:any = [];
    let data3:any = [];
    let data4:any = [];
    pnldata.forEach(e => {
      this.barChartLabels.push(e.positionDate);
      data1.push(e.realized);
      data2.push(e.unrealized);
      data3.push(e.sodInv)
      data4.push(e.cumuRealizedPnl)
    })
    this.barChartData =  [{ data: data1, label: 'Realized$', yAxisID: 'A' },
                          { data: data2, label: 'Unrealized$', yAxisID: 'A' },
                          { data: data3, label: 'Inv$', type: 'line', yAxisID: 'B', fill: false },
                          { data: data4, label: 'RealizedC$', type: 'line', yAxisID: 'B', fill: false}]
  }

  // updateChart(pnldata: MonthlySummary[]) {
  //   // console.log(">>>>monthly pnl: "+ JSON.stringify(pnldata));
  //   this.barChartLabels = []
  //   let data:any = [];
  //   pnldata.forEach(e => {
  //     this.barChartLabels.push(e.month);
  //     data.push(e.pnl);
  //   })
  //   this.barChartData =  [{ data, label: 'Best Fruits' }]
  // }
}
