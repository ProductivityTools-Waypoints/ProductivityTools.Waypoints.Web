import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PointEdit } from './point-edit';
import { Point } from '../models/point';

describe('PointEdit', () => {
  let component: PointEdit;
  let fixture: ComponentFixture<PointEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(PointEdit);
    component = fixture.componentInstance;
    component.point = new Point('Test Point', 100, 10);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

