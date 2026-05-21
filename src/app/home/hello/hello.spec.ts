import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hello } from './hello';
import { HomeService } from '../home.service';
import { of } from 'rxjs';

describe('Hello', () => {
  let component: Hello;
  let fixture: ComponentFixture<Hello>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hello],
      providers: [
        {
          provide: HomeService,
          useValue: {
            hello: () => of('Test Hello')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Hello);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
