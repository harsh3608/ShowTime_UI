import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfLeaveCalendarComponent } from './self-leave-calendar.component';

describe('SelfLeaveCalendarComponent', () => {
  let component: SelfLeaveCalendarComponent;
  let fixture: ComponentFixture<SelfLeaveCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfLeaveCalendarComponent]
    });
    fixture = TestBed.createComponent(SelfLeaveCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
