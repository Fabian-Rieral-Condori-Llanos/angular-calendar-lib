import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarDisplayComponent } from './components/calendar-display.component';
import { CalendarFormatPipe } from './pipes/calendar-format.pipe';
import { CalendarFormatterService } from './services/calendar-formatter.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarDisplayComponent,
    CalendarFormatPipe
  ],
  exports: [
    CalendarDisplayComponent,
    CalendarFormatPipe
  ],
  providers: [
    CalendarFormatterService
  ]
})
export class NgCalendarFormatterModule { }

