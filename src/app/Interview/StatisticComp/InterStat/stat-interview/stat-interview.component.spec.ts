import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatInterviewComponent } from './stat-interview.component';

describe('StatInterviewComponent', () => {
  let component: StatInterviewComponent;
  let fixture: ComponentFixture<StatInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
