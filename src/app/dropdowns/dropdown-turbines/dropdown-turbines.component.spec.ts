import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTurbinesComponent } from './dropdown-turbines.component';

describe('DropdownTurbinesComponent', () => {
  let component: DropdownTurbinesComponent;
  let fixture: ComponentFixture<DropdownTurbinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownTurbinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTurbinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
