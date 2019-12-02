import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQComponent } from './list-q.component';

describe('ListQComponent', () => {
  let component: ListQComponent;
  let fixture: ComponentFixture<ListQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
