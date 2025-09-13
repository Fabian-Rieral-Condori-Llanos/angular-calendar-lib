export enum CalendarType {
  GREGORIAN = 'gregorian',
  ISLAMIC = 'islamic', 
  PERSIAN = 'persian',
  HEBREW = 'hebrew',
  CHINESE = 'chinese'
}

export enum DateFormat {
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
  FULL = 'full',
  CUSTOM = 'custom'
}

export interface CalendarConfig {
  type: CalendarType;
  locale?: string;
  timezone?: string;
  format?: DateFormat;
  customFormat?: string;
}

export interface FormattedDate {
  formatted: string;
  original: Date;
  calendarType: CalendarType;
  dayOfWeek: string;
  month: string;
  year: number;
}
