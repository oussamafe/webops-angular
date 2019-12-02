import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResIsvalidComponent } from './res-isvalid.component';

describe('ResIsvalidComponent', () => {
  let component: ResIsvalidComponent;
  let fixture: ComponentFixture<ResIsvalidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResIsvalidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResIsvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
