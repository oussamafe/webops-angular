import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvabilityUserComponent } from './avability-user.component';

describe('AvabilityUserComponent', () => {
  let component: AvabilityUserComponent;
  let fixture: ComponentFixture<AvabilityUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvabilityUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvabilityUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
