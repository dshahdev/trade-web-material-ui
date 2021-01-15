import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerSummaryComponent } from './ticker-summary.component';

describe('SummaryComponent', () => {
  let component: TickerSummaryComponent;
  let fixture: ComponentFixture<TickerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
