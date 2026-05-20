import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEdit } from './route-edit';

describe('RouteEdit', () => {
  let component: RouteEdit;
  let fixture: ComponentFixture<RouteEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
