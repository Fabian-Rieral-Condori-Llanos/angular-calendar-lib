import { TestBed } from '@angular/core/testing';
import { CalendarFormatterService } from './calendar-formatter.service';
import { CalendarType, DateFormat } from '../types/calendar.types';

describe('CalendarFormatterService', () => {
  let service: CalendarFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatDate', () => {
    it('should format gregorian date correctly', () => {
      const testDate = new Date('2024-01-15');
      const result = service.formatDate(testDate, {
        type: CalendarType.GREGORIAN,
        format: DateFormat.SHORT
      });

      expect(result.formatted).toBeTruthy();
      expect(result.calendarType).toBe(CalendarType.GREGORIAN);
      expect(result.original).toEqual(testDate);
      expect(result.year).toBe(2024);
    });

    it('should format islamic date correctly', () => {
      const testDate = new Date('2024-01-15');
      const result = service.formatDate(testDate, {
        type: CalendarType.ISLAMIC,
        format: DateFormat.LONG
      });

      expect(result.formatted).toBeTruthy();
      expect(result.calendarType).toBe(CalendarType.ISLAMIC);
      expect(result.original).toEqual(testDate);
      expect(typeof result.year).toBe('number');
    });

    it('should handle custom format correctly', () => {
      const testDate = new Date('2024-01-15');
      const customFormat = 'DD/MM/YYYY';
      
      const result = service.formatDate(testDate, {
        type: CalendarType.GREGORIAN,
        format: DateFormat.CUSTOM,
        customFormat: customFormat
      });

      expect(result.formatted).toBeTruthy();
      expect(result.formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });
  });

  describe('getCalendarInfo', () => {
    it('should return gregorian calendar info', () => {
      const testDate = new Date('2024-01-15');
      const info = service.getCalendarInfo(CalendarType.GREGORIAN, testDate);

      expect(info).toBeTruthy();
      expect(info.year).toBe(2024);
      expect(info.month).toBe(1);
      expect(info.day).toBe(15);
      expect(typeof info.isLeapYear).toBe('boolean');
    });
  });
});