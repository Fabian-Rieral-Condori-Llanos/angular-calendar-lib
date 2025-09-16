import { Pipe, PipeTransform } from '@angular/core';
import { CalendarFormatterService } from '../services/calendar-formatter.service';
import { CalendarType, DateFormat, CalendarConfig } from '../types/calendar.types';

@Pipe({
  name: 'calendarFormat',
  standalone: true
})
export class CalendarFormatPipe implements PipeTransform {

  constructor(private calendarFormatter: CalendarFormatterService) {}

  transform(
    date: Date | string, 
    calendarType: CalendarType = CalendarType.GREGORIAN,
    format: DateFormat = DateFormat.MEDIUM,
    locale?: string,
    customFormat?: string
  ): string {
    
    if (!date) return '';

    const config: CalendarConfig = {
      type: calendarType,
      format: format,
      locale: locale,
      customFormat: customFormat
    };

    const result = this.calendarFormatter.formatDate(date, config);
    return result.formatted;
  }
}