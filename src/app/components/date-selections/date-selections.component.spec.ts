import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSelectionsComponent } from './date-selections.component';

describe('DateSelectionsComponent', () => {
  let component: DateSelectionsComponent;
  let fixture: ComponentFixture<DateSelectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateSelectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
