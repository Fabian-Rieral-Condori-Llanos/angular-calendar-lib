import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarFormatterService } from '../services/calendar-formatter.service';
import { CalendarType, DateFormat, CalendarConfig } from '../types/calendar.types';

@Component({
  selector: 'lib-calendar-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="calendar-container">
      <div class="calendar-header">
        <button (click)="previousMonth()" class="nav-button">‹</button>
        <div class="month-year">
          <span class="month">{{ currentMonthName }}</span>
          <span class="year">{{ currentYear }}</span>
        </div>
        <button (click)="nextMonth()" class="nav-button">›</button>
      </div>
      
      @if (showCalendarSelector) {
        <div class="calendar-type-selector">
          <select [(ngModel)]="selectedCalendarType" (change)="onCalendarTypeChange()">
            <option value="gregorian">Gregoriano</option>
            <option value="islamic">Islámico (Hijri)</option>
            <option value="persian">Persa (Jalaali)</option>
            <option value="hebrew">Hebreo</option>
            <option value="chinese">Chino</option>
          </select>
        </div>
      }

      <div class="calendar-grid">
        <div class="weekdays">
          @for (day of weekdays; track day) {
            <div class="weekday">{{ day }}</div>
          }
        </div>
        
        <div class="days">
          @for (day of calendarDays; track day.date) {
            <div 
              class="day"
              [class.other-month]="!day.currentMonth"
              [class.today]="day.isToday"
              [class.selected]="day.isSelected"
              (click)="selectDate(day)"
            >
              <span class="day-number">{{ day.dayNumber }}</span>
              @if (showCalendarInfo) {
                <div class="day-info">
                  <small class="calendar-date">{{ day.formattedDate }}</small>
                </div>
              }
            </div>
          }
        </div>
      </div>

      @if (selectedDate) {
        <div class="selected-date-info">
          <h3>Fecha seleccionada:</h3>
          <div class="date-formats">
            @for (format of availableFormats; track format.name) {
              <div>
                <strong>{{ format.name }}:</strong> {{ format.value }}
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .calendar-container {
      font-family: Arial, sans-serif;
      max-width: 400px;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .nav-button {
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-size: 18px;
    }

    .nav-button:hover {
      background: #0056b3;
    }

    .month-year {
      text-align: center;
      font-weight: bold;
      font-size: 18px;
    }

    .calendar-type-selector {
      margin-bottom: 16px;
      text-align: center;
    }

    .calendar-type-selector select {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    .calendar-grid {
      display: flex;
      flex-direction: column;
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      margin-bottom: 8px;
    }

    .weekday {
      padding: 8px 4px;
      text-align: center;
      font-weight: bold;
      background: #f8f9fa;
      font-size: 12px;
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
    }

    .day {
      min-height: 60px;
      padding: 4px;
      border: 1px solid #eee;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .day:hover {
      background: #f0f8ff;
    }

    .day.other-month {
      color: #ccc;
      background: #f9f9f9;
    }

    .day.today {
      background: #007bff;
      color: white;
      font-weight: bold;
    }

    .day.selected {
      background: #28a745;
      color: white;
    }

    .day-number {
      font-weight: bold;
      font-size: 14px;
    }

    .day-info {
      margin-top: 2px;
    }

    .calendar-date {
      font-size: 10px;
      opacity: 0.8;
    }

    .selected-date-info {
      margin-top: 16px;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 4px;
    }

    .selected-date-info h3 {
      margin: 0 0 8px 0;
      font-size: 14px;
    }

    .date-formats div {
      margin: 4px 0;
      font-size: 12px;
    }
  `]
})
export class CalendarDisplayComponent implements OnInit, OnChanges {
  
  @Input() calendarType: CalendarType = CalendarType.GREGORIAN;
  @Input() showCalendarSelector: boolean = true;
  @Input() showCalendarInfo: boolean = true;
  @Input() initialDate?: Date;
  
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() calendarTypeChanged = new EventEmitter<CalendarType>();

  selectedCalendarType: CalendarType = CalendarType.GREGORIAN;
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  currentMonthName: string = '';
  currentYear: number = 0;
  weekdays: string[] = [];
  calendarDays: any[] = [];
  availableFormats: { name: string, value: string }[] = [];

  constructor(private calendarFormatter: CalendarFormatterService) {}

  ngOnInit() {
    this.selectedCalendarType = this.calendarType;
    if (this.initialDate) {
      this.currentDate = new Date(this.initialDate);
    }
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['calendarType'] && !changes['calendarType'].firstChange) {
      this.selectedCalendarType = this.calendarType;
      this.generateCalendar();
    }
  }

  generateCalendar() {
    this.updateMonthYear();
    this.generateWeekdays();
    this.generateDays();
  }

  updateMonthYear() {
    const config: CalendarConfig = {
      type: this.selectedCalendarType,
      format: DateFormat.LONG
    };
    
    const formatted = this.calendarFormatter.formatDate(this.currentDate, config);
    this.currentMonthName = formatted.month;
    this.currentYear = formatted.year;
  }

  generateWeekdays() {
    if (this.selectedCalendarType === CalendarType.ISLAMIC || 
        this.selectedCalendarType === CalendarType.HEBREW) {
      this.weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    } else {
      this.weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    }
  }

  generateDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const config: CalendarConfig = {
        type: this.selectedCalendarType,
        format: DateFormat.SHORT
      };
      
      const formatted = this.calendarFormatter.formatDate(date, config);
      
      days.push({
        date: new Date(date),
        dayNumber: date.getDate(),
        currentMonth: date.getMonth() === month,
        isToday: this.isSameDay(date, today),
        isSelected: this.selectedDate ? this.isSameDay(date, this.selectedDate) : false,
        formattedDate: formatted.formatted
      });
    }
    
    this.calendarDays = days;
  }

  selectDate(day: any) {
    this.selectedDate = day.date;
    this.generateCalendar();
    this.updateSelectedDateInfo();
    if (this.selectedDate) {
      this.dateSelected.emit(this.selectedDate);
    }
  }

  updateSelectedDateInfo() {
    if (!this.selectedDate) return;

    this.availableFormats = [];
    const formats = [
      { type: DateFormat.SHORT, name: 'Corto' },
      { type: DateFormat.MEDIUM, name: 'Medio' },
      { type: DateFormat.LONG, name: 'Largo' },
      { type: DateFormat.FULL, name: 'Completo' }
    ];

    formats.forEach(format => {
      const config: CalendarConfig = {
        type: this.selectedCalendarType,
        format: format.type
      };
      
      const result = this.calendarFormatter.formatDate(this.selectedDate!, config);
      this.availableFormats.push({
        name: format.name,
        value: result.formatted
      });
    });
  }

  onCalendarTypeChange() {
    this.generateCalendar();
    this.calendarTypeChanged.emit(this.selectedCalendarType);
    if (this.selectedDate) {
      this.updateSelectedDateInfo();
    }
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}