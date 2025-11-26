import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownProjectsComponent } from './dropdown-projects.component';

describe('DropdownProjectsComponent', () => {
  let component: DropdownProjectsComponent;
  let fixture: ComponentFixture<DropdownProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
