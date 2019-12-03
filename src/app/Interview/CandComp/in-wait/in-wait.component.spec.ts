import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InWaitComponent } from './in-wait.component';

describe('InWaitComponent', () => {
  let component: InWaitComponent;
  let fixture: ComponentFixture<InWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InWaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
