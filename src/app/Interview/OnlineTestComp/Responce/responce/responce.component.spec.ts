import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponceComponent } from './responce.component';

describe('ResponceComponent', () => {
  let component: ResponceComponent;
  let fixture: ComponentFixture<ResponceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
