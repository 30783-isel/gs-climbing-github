import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownReportsComponent } from './dropdown-reports.component';

describe('DropdownReportsComponent', () => {
  let component: DropdownReportsComponent;
  let fixture: ComponentFixture<DropdownReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
