import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAddDialogComponent } from './leave-add-dialog.component';

describe('LeaveAddDialogComponent', () => {
  let component: LeaveAddDialogComponent;
  let fixture: ComponentFixture<LeaveAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveAddDialogComponent]
    });
    fixture = TestBed.createComponent(LeaveAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
