import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointEdit } from './point-edit';

describe('PointEdit', () => {
  let component: PointEdit;
  let fixture: ComponentFixture<PointEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(PointEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
