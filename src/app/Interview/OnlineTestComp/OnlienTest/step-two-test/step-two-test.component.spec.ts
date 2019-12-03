import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwoTestComponent } from './step-two-test.component';

describe('StepTwoTestComponent', () => {
  let component: StepTwoTestComponent;
  let fixture: ComponentFixture<StepTwoTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepTwoTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
