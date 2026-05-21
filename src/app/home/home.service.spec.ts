import { TestBed } from '@angular/core/testing';
import { HomeService } from './home.service';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeService,
        {
          provide: Apollo,
          useValue: {
            query: () => of({ data: { helloQuery: 'Hello World' } })
          }
        }
      ]
    });
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
