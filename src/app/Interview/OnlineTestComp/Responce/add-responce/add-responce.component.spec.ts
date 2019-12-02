import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResponceComponent } from './add-responce.component';

describe('AddResponceComponent', () => {
  let component: AddResponceComponent;
  let fixture: ComponentFixture<AddResponceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResponceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResponceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
