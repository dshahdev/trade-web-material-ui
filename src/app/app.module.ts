import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { RoutingModule } from './routing/routing.module';
import { ChartsModule } from 'ng2-charts';

import { HomeComponent } from './home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { PositionComponent } from './components/position/position.component';


import { MonthlySummaryComponent } from './components/monthly-summary/monthly-summary.component';
import { DailySummaryComponent } from './components/daily-summary/daily-summary.component';
import { HeadComponent } from './components/head/head.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { MonthPerformanceComponent } from './components/month-performance/month-performance.component';
import { CurrentPositionComponent } from './components/current-position/current-position.component';
import { TickerDailySummaryComponent } from './components/ticker-daily-summary/ticker-daily-summary.component';
import { TickerDetailComponent } from './components/ticker-detail/ticker-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    DetailComponent,
    PositionComponent,
    MonthlySummaryComponent,
    DailySummaryComponent,
    HeadComponent,
    BarchartComponent,
    PiechartComponent,
    MonthPerformanceComponent,
    CurrentPositionComponent,
    TickerDailySummaryComponent,
    TickerDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    RoutingModule,
    FlexLayoutModule,
    FormsModule,
    ChartsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
