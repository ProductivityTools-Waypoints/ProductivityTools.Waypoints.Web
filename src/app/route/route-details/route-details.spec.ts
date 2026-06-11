import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteDetails } from './route-details';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../route.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RouteDetails', () => {
  let component: RouteDetails;
  let fixture: ComponentFixture<RouteDetails>;

  const mockRouteService = {
    getRoute: () => of({
      id: '1',
      name: 'Test Route',
      direction: 'North',
      points: [
        { name: 'Point 1', odometer: null as any, distance: 10 },
        { name: 'Point 2', odometer: 100, distance: 90 }
      ]
    }),
    deleteRoute: () => of(''),
    removeOdometers: () => of({
      points: [
        { name: 'Point 1', odometer: null as any, distance: 10 },
        { name: 'Point 2', odometer: null as any, distance: 90 }
      ]
    })
  };

  const mockActivatedRoute = {
    paramMap: of({
      get: (key: string) => '1'
    })
  };

  const mockRouter = {
    navigate: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteDetails],
      providers: [
        { provide: RouteService, useValue: mockRouteService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display odometer values, defaulting to 0 if null', () => {
    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('Odometer: 0');
    expect(listItems[1].nativeElement.textContent).toContain('Odometer: 100');
  });

  it('should update UI to display 0 for all odometers after calling removeOdometers', () => {
    component.removeOdometers();
    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('Odometer: 0');
    expect(listItems[1].nativeElement.textContent).toContain('Odometer: 0');
  });
});


