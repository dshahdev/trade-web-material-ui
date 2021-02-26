import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeIdComponent } from './trade-id.component';

describe('TradeIdComponent', () => {
  let component: TradeIdComponent;
  let fixture: ComponentFixture<TradeIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
