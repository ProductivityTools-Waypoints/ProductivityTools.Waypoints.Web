import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointEditMobile } from './point-edit-mobile';

describe('PointEditMobile', () => {
  let component: PointEditMobile;
  let fixture: ComponentFixture<PointEditMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointEditMobile],
    }).compileComponents();

    fixture = TestBed.createComponent(PointEditMobile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
