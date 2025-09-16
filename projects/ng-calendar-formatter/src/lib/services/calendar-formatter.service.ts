import { Injectable } from '@angular/core';
import { CalendarType, DateFormat, CalendarConfig, FormattedDate } from '../types/calendar.types';

@Injectable({
  providedIn: 'root'
})
export class CalendarFormatterService {

  constructor() {}

  /**
   * Formatea una fecha según el calendario y formato especificados
   */
  formatDate(date: Date | string, config: CalendarConfig): FormattedDate {
    const dateObj = new Date(date);
    
    switch (config.type) {
      case CalendarType.GREGORIAN:
        return this.formatGregorianDate(dateObj, config);
      case CalendarType.ISLAMIC:
        return this.formatIslamicDate(dateObj, config);
      case CalendarType.PERSIAN:
        return this.formatPersianDate(dateObj, config);
      case CalendarType.HEBREW:
        return this.formatHebrewDate(dateObj, config);
      case CalendarType.CHINESE:
        return this.formatChineseDate(dateObj, config);
      default:
        return this.formatGregorianDate(dateObj, config);
    }
  }

  /**
   * Convierte una fecha entre diferentes tipos de calendario
   */
  convertDate(date: Date | string, fromCalendar: CalendarType, toCalendar: CalendarType): Date {
    const dateObj = new Date(date);
    return dateObj;
  }

  /**
   * Obtiene información del calendario actual
   */
  getCalendarInfo(calendarType: CalendarType, date?: Date): any {
    const currentDate = date || new Date();
    
    switch (calendarType) {
      case CalendarType.ISLAMIC:
        return this.getIslamicCalendarInfo(currentDate);
      case CalendarType.PERSIAN:
        return this.getPersianCalendarInfo(currentDate);
      default:
        return this.getGregorianCalendarInfo(currentDate);
    }
  }

  private formatGregorianDate(date: Date, config: CalendarConfig): FormattedDate {
    const locale = config.locale || 'en-US';
    let formatted: string;
    
    switch (config.format) {
      case DateFormat.SHORT:
        formatted = date.toLocaleDateString(locale, { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        });
        break;
      case DateFormat.MEDIUM:
        formatted = date.toLocaleDateString(locale, { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
        break;
      case DateFormat.LONG:
        formatted = date.toLocaleDateString(locale, { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        break;
      case DateFormat.FULL:
        formatted = date.toLocaleDateString(locale, { 
          weekday: 'long',
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        break;
      case DateFormat.CUSTOM:
        formatted = this.formatCustomDate(date, config.customFormat || 'YYYY-MM-DD');
        break;
      default:
        formatted = date.toISOString().split('T')[0];
    }

    return {
      formatted,
      original: date,
      calendarType: CalendarType.GREGORIAN,
      dayOfWeek: date.toLocaleDateString(locale, { weekday: 'long' }),
      month: date.toLocaleDateString(locale, { month: 'long' }),
      year: date.getFullYear()
    };
  }

  private formatIslamicDate(date: Date, config: CalendarConfig): FormattedDate {
    try {
      const locale = 'ar-SA-u-ca-islamic';
      const formatted = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);

      return {
        formatted,
        original: date,
        calendarType: CalendarType.ISLAMIC,
        dayOfWeek: new Intl.DateTimeFormat('ar-SA', { weekday: 'long' }).format(date),
        month: new Intl.DateTimeFormat(locale, { month: 'long' }).format(date),
        year: parseInt(new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date))
      };
    } catch (error) {
      // Fallback to Gregorian if Islamic calendar is not supported
      return this.formatGregorianDate(date, { ...config, type: CalendarType.GREGORIAN });
    }
  }

  private formatPersianDate(date: Date, config: CalendarConfig): FormattedDate {
    try {
      const locale = 'fa-IR-u-ca-persian';
      const formatted = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);

      return {
        formatted,
        original: date,
        calendarType: CalendarType.PERSIAN,
        dayOfWeek: new Intl.DateTimeFormat('fa-IR', { weekday: 'long' }).format(date),
        month: new Intl.DateTimeFormat(locale, { month: 'long' }).format(date),
        year: parseInt(new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date))
      };
    } catch (error) {
      return this.formatGregorianDate(date, { ...config, type: CalendarType.GREGORIAN });
    }
  }

  private formatHebrewDate(date: Date, config: CalendarConfig): FormattedDate {
    try {
      const locale = 'he-IL-u-ca-hebrew';
      const formatted = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);

      return {
        formatted,
        original: date,
        calendarType: CalendarType.HEBREW,
        dayOfWeek: new Intl.DateTimeFormat('he-IL', { weekday: 'long' }).format(date),
        month: new Intl.DateTimeFormat(locale, { month: 'long' }).format(date),
        year: parseInt(new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date))
      };
    } catch (error) {
      return this.formatGregorianDate(date, { ...config, type: CalendarType.GREGORIAN });
    }
  }

  private formatChineseDate(date: Date, config: CalendarConfig): FormattedDate {
    try {
      const locale = 'zh-CN-u-ca-chinese';
      const formatted = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);

      return {
        formatted,
        original: date,
        calendarType: CalendarType.CHINESE,
        dayOfWeek: new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(date),
        month: new Intl.DateTimeFormat(locale, { month: 'long' }).format(date),
        year: parseInt(new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date))
      };
    } catch (error) {
      return this.formatGregorianDate(date, { ...config, type: CalendarType.GREGORIAN });
    }
  }

  private formatCustomDate(date: Date, format: string): string {
    // Implementación básica de formato personalizado
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace(/YYYY/g, year.toString())
      .replace(/MM/g, month)
      .replace(/DD/g, day);
  }

  private getGregorianCalendarInfo(date: Date): any {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      dayOfWeek: date.getDay(),
      weekOfYear: this.getWeekOfYear(date),
      isLeapYear: this.isLeapYear(date.getFullYear())
    };
  }

  private getIslamicCalendarInfo(date: Date): any {
    // Implementación simplificada
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      dayOfWeek: date.getDay(),
      isLeapYear: false
    };
  }

  private getPersianCalendarInfo(date: Date): any {
    // Implementación simplificada
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      dayOfWeek: date.getDay(),
      isLeapYear: false
    };
  }

  private getWeekOfYear(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
}
