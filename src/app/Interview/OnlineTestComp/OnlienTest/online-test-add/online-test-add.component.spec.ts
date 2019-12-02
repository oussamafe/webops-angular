import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineTestAddComponent } from './online-test-add.component';

describe('OnlineTestAddComponent', () => {
  let component: OnlineTestAddComponent;
  let fixture: ComponentFixture<OnlineTestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineTestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineTestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
