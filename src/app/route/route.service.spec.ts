import { TestBed } from '@angular/core/testing';
import { RouteService } from './route.service';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

describe('RouteService', () => {
  let service: RouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouteService,
        {
          provide: Apollo,
          useValue: {
            mutate: () => of({})
          }
        }
      ]
    });
    service = TestBed.inject(RouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
