import { GridOptions, Module } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { TickerSummary } from 'src/app/model/ticker-summary.model';
import { PNLDateDetail } from 'src/app/model/pnl-date-detail.model';
import { AllModules, ColumnsToolPanelModule, MasterDetailModule, MenuModule } from '@ag-grid-enterprise/all-modules';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent  {

  pnlDateDetail: PNLDateDetail[];

  private gridApi;
  private gridColumnApi;

  modules: Module[] = [
    ClientSideRowModelModule,
    MasterDetailModule,
    MenuModule,
    ColumnsToolPanelModule
    
  ];
  public defaultColDef;
  public detailCellRendererParams;
  public rowData: any[];
  public columnDefs: any[];

  constructor(private sharedService: SharedService) {
    
    
    this.columnDefs = [
      { field: "date", cellRenderer: 'agGroupCellRenderer'},
      { field: "pnl" },
    
   ];
 
    
  this.defaultColDef = { flex: 1};

   this.detailCellRendererParams = {
     detailGridOptions: {
       columnDefs: [
         { field: "date"},
         { field: "ticker"},
         { field: "buyTradeId"},
         { field: "sellTradeId"},
         { field: "allocatedQty"},
         { field: "pnl"},
         { field: "cost"},
         { field: "price"}
       ],
       defaultColDef: { flex: 1}
     },
     getDetailRowData: function(params) {
        params.successCallback(params.data.pnlTrade);
     }
    
   };
  
}
  onFirstDataRendered(params) {
    setTimeout(function (){
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
      
    }, 0)
  }
 
  onGridReady(params) {


  
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

   

    this.sharedService.getTradesByDatePnl().subscribe((response) => {
      console.log("response in onGridReady: "+ JSON.stringify(response));
      this.rowData = response;
      console.log("response in onGridReady.........: "+ JSON.stringify(this.rowData));
    })
    
   
  }


}
