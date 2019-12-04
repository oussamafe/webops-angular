import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenForCandidateComponent } from './examen-for-candidate.component';

describe('ExamenForCandidateComponent', () => {
  let component: ExamenForCandidateComponent;
  let fixture: ComponentFixture<ExamenForCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenForCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenForCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
