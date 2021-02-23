import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulSelectionsComponent } from './mul-selections.component';

describe('MulSelectionsComponent', () => {
  let component: MulSelectionsComponent;
  let fixture: ComponentFixture<MulSelectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MulSelectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MulSelectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
