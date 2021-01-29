import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table' 
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog' ;

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule
  ]
})
export class MaterialModule { }