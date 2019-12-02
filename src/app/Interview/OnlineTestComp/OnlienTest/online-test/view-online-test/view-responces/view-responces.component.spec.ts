import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResponcesComponent } from './view-responces.component';

describe('ViewResponcesComponent', () => {
  let component: ViewResponcesComponent;
  let fixture: ComponentFixture<ViewResponcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResponcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResponcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
