import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { MonthlySummary } from 'src/app/model/monthly-summary.model';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  // @Input() monthlyPnl: MonthlySummary[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    // maintainAspectRatio: false
  };
  // public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
  public pieChartLabels: Label[] = [];
  // public pieChartData: SingleDataSet = [];
 
  public data: any[] = []
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ]

  pieChartData:any = [{data:[]}];
  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

  // updateChart(twoColumnData: any[]) {
  // debugger;
  //   console.log(">>>>monthly pnl: "+ JSON.stringify(twoColumnData));
  //   var obj = twoColumnData.length > 0 ? twoColumnData[0]:{}
  //   this.pieChartLabels = []

  //   var key = Object.keys(obj)[0]
  //   var val = Object.keys(obj)[1]
  //   var total = 0

  //   var func = function(total, item) { return total + item }
  //   const sum = twoColumnData.reduce( e => { total += e[val]} );
    
  //   twoColumnData.map( e => { 
  //     this.pieChartLabels.push( [e[key]] ); 
  //     this.data.push( e[val] / sum );
  //   } )

  // } 

}
