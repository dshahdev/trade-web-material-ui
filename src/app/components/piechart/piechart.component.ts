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

  @Input() monthlyPnl: MonthlySummary[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    // maintainAspectRatio: false
  };
  // public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
  public pieChartLabels: Label[] = [];
  // public pieChartData: SingleDataSet = [];
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

  updateChart(pnldata: MonthlySummary[]) {
    console.log("<<<<monthly pnl: " + JSON.stringify(pnldata));
    // this.pieChartLabels = [];

    pnldata.forEach(e => {
      this.pieChartLabels.push([e.month]);
      let percentage = e.pnl / 100;
      console.log("percentage: " + percentage);
      this.data.push(percentage);
      console.log("data on hand is: " +this.data);
     
    })
    console.log("data in pie before: " + this.data);
    this.pieChartData = this.data as any[];
    console.log("labels: " + this.pieChartLabels);
    console.log("data in pie: " + this.pieChartData)
    // console.log("data in pie: " + this.data);
  }
  
}
