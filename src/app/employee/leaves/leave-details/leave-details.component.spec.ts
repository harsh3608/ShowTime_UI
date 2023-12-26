import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDetailsComponent } from './leave-details.component';

describe('LeaveDetailsComponent', () => {
  let component: LeaveDetailsComponent;
  let fixture: ComponentFixture<LeaveDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveDetailsComponent]
    });
    fixture = TestBed.createComponent(LeaveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
