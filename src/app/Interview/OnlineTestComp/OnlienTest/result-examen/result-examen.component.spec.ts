import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultExamenComponent } from './result-examen.component';

describe('ResultExamenComponent', () => {
  let component: ResultExamenComponent;
  let fixture: ComponentFixture<ResultExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
