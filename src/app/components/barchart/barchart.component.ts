import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { MonthlySummary } from 'src/app/model/monthly-summary.model';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  @Input() monthlyPnl: MonthlySummary[] = [];


  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
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
 
  updateChart(pnldata: MonthlySummary[]) {
    // console.log(">>>>monthly pnl: "+ JSON.stringify(pnldata));
    this.barChartLabels = []
    let data:any = [];
    pnldata.forEach(e => {
      this.barChartLabels.push(e.month);
      data.push(e.pnl);
    })
    this.barChartData =  [{ data, label: 'Best Fruits' }]
  }
}
