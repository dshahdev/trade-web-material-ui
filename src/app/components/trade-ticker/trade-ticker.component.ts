import { ClientSideRowModelModule, ColumnsToolPanelModule, MasterDetailModule, MenuModule, Module } from '@ag-grid-enterprise/all-modules';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-trade-ticker',
  templateUrl: './trade-ticker.component.html',
  styleUrls: ['./trade-ticker.component.css']
})
export class TradeTickerComponent {

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
        { field: "ticker", cellRenderer: 'agGroupCellRenderer'},
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

    this.sharedService.getTradesByTickerPnl().subscribe((response) => {
      this.rowData = response;
    })
    
  }

 
}
