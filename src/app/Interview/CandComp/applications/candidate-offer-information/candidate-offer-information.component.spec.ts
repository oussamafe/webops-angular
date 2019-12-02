import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateOfferInformationComponent } from './candidate-offer-information.component';

describe('CandidateOfferInformationComponent', () => {
  let component: CandidateOfferInformationComponent;
  let fixture: ComponentFixture<CandidateOfferInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateOfferInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateOfferInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
