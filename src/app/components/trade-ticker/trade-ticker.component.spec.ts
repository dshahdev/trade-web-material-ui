import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeTickerComponent } from './trade-ticker.component';

describe('TradeTickerComponent', () => {
  let component: TradeTickerComponent;
  let fixture: ComponentFixture<TradeTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeTickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
