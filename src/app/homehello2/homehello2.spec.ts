import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homehello2 } from './homehello2';

describe('Homehello2', () => {
  let component: Homehello2;
  let fixture: ComponentFixture<Homehello2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homehello2],
    }).compileComponents();

    fixture = TestBed.createComponent(Homehello2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
