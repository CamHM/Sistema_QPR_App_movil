import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsWallPage } from './reports-wall.page';

describe('ReportsWallPage', () => {
  let component: ReportsWallPage;
  let fixture: ComponentFixture<ReportsWallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsWallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsWallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
