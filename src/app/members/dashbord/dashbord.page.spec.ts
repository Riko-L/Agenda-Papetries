import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordPage } from './dashbord.page';

describe('DashbordPage', () => {
  let component: DashbordPage;
  let fixture: ComponentFixture<DashbordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
