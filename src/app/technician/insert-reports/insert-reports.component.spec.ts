import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertReportsComponent } from './insert-reports.component';

describe('InsertReportsComponent', () => {
  let component: InsertReportsComponent;
  let fixture: ComponentFixture<InsertReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
