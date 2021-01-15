import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerDailySummaryComponent } from './ticker-daily-summary.component';

describe('TickerDailySummaryComponent', () => {
  let component: TickerDailySummaryComponent;
  let fixture: ComponentFixture<TickerDailySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerDailySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerDailySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
