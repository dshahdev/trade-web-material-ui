import { ClientSideRowModelModule, ColumnsToolPanelModule, MasterDetailModule, MenuModule, Module } from '@ag-grid-enterprise/all-modules';
import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-pnl',
  templateUrl: './pnl.component.html',
  styleUrls: ['./pnl.component.css']
})
export class PnlComponent {

  // @Input() searchedText = "";

  private gridApi;
  private gridColumnApi;

  public defaultColDef;
  public detailCellRendererParams;
  public rowData: any[];
  public columnDefs: any[];
  public rowHeight;

  modules: Module[] = [
    ClientSideRowModelModule,
    MasterDetailModule,
    MenuModule,
    ColumnsToolPanelModule

  ];

  constructor(private sharedService: SharedService) {

    this.columnDefs = [
      { headerName: 'BuyId', field: 'buyTradeId', type: 'leftAligned', cellRenderer: 'agGroupCellRenderer' },
      { headerName: 'SellId', field: 'sellTradeId', type: 'leftAligned', cellRenderer: 'agGroupCellRenderer' },
      { headerName: 'Date', field: 'date' },
      { headerName: 'Ticker', field: 'ticker', type: 'rightAligned' },
      { headerName: 'Qty', field: 'allocatedQty', type: 'rightAligned' },
      { headerName: 'Cost', field: 'cost', type: 'numericColumn' },
      { headerName: 'Price', field: 'price', type: 'numericColumn' },
      { headerName: 'Pnl', field: 'pnl', type: 'numericColumn' },

    ];


    this.defaultColDef = {

      editable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
    };

    this.rowHeight = 30;

  }


  onGridReady(params) {
    this.gridApi = params;
    this.gridColumnApi = params.columnApi;


    this.sharedService.getPnlAll().subscribe((response) => {
      this.rowData = response;
    })
  }

  clearFilters() {
    this.gridApi.api.setFilterModel(null);
  }

  setFilter(searchText: string) {
    var model = this.gridApi.api.getFilterModel();

    if ((searchText.match(/^[0-9]+$/) != null)) {
      if (searchText.length === 4) {
        model = {
          date: { filterType: 'text', type: 'startsWith', filter: searchText }
        }

      } else if (searchText.length === 6) {
        let a = searchText.substring(0, 4);
        let b = searchText.substring(4, 6);
        searchText = a + "-" + b;

        model = {
          date: { filterType: 'text', type: 'startsWith', filter: searchText }
        }
      } else {
        let a = searchText.substring(0, 4);
        let b = searchText.substring(4, 6);
        let c = searchText.substring(6);
        searchText = a + "-" + b + "-" + c;

        model = {
          date: { filterType: 'text', type: 'startsWith', filter: searchText }
        }
      }
    } else {
      model = {
        ticker: { filterType: 'text', type: 'startsWith', filter: searchText },
      };
    }
    

    this.gridApi.api.setFilterModel(model);
    //  this.clearFilters();
  }
}
