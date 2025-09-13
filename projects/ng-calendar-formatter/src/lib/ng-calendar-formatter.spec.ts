import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCalendarFormatter } from './ng-calendar-formatter';

describe('NgCalendarFormatter', () => {
  let component: NgCalendarFormatter;
  let fixture: ComponentFixture<NgCalendarFormatter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgCalendarFormatter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgCalendarFormatter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
