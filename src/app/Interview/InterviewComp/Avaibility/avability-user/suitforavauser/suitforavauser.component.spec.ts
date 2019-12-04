import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitforavauserComponent } from './suitforavauser.component';

describe('SuitforavauserComponent', () => {
  let component: SuitforavauserComponent;
  let fixture: ComponentFixture<SuitforavauserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitforavauserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitforavauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
