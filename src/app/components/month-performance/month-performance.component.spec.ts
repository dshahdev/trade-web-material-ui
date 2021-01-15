import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPerformanceComponent } from './month-performance.component';

describe('MonthPerformanceComponent', () => {
  let component: MonthPerformanceComponent;
  let fixture: ComponentFixture<MonthPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
