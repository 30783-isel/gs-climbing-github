import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTurbinesComponent } from './show-turbines.component';

describe('ShowTurbinesComponent', () => {
  let component: ShowTurbinesComponent;
  let fixture: ComponentFixture<ShowTurbinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTurbinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTurbinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
