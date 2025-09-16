import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  CalendarFormatterService, 
  CalendarType, 
  DateFormat,
  CalendarDisplayComponent,
  CalendarFormatPipe
} from '../../../ng-calendar-formatter/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarDisplayComponent, CalendarFormatPipe],
  template: `
    <div class="app-container">
      <header>
        <h1>🗓️ NgCalendarFormatter - Demo</h1>
        <p>Demostración de la librería de calendarios</p>
      </header>

      <main>
        <section class="demo-section">
          <h2>📝 Test del Servicio</h2>
          <div class="service-demo">
            <button (click)="testService()" class="demo-button">
              🔄 Probar Servicio
            </button>
            
            <div class="results" *ngIf="result">
              <h4>Resultado:</h4>
              <pre>{{ result | json }}</pre>
            </div>
          </div>
        </section>

        <section class="demo-section">
          <h2>📅 Calendario Interactivo</h2>
          <div class="calendar-controls">
            <label for="calendar-type">Tipo de calendario:</label>
            <select 
              id="calendar-type" 
              [(ngModel)]="selectedCalendarType" 
              (change)="onCalendarTypeChange()">
              <option [value]="CalendarType.GREGORIAN">Gregoriano</option>
              <option [value]="CalendarType.ISLAMIC">Islámico (Hijri)</option>
              <option [value]="CalendarType.PERSIAN">Persa (Jalaali)</option>
              <option [value]="CalendarType.HEBREW">Hebreo</option>
              <option [value]="CalendarType.CHINESE">Chino</option>
            </select>
          </div>
          <div class="calendar-demo">
            <lib-calendar-display 
              [calendarType]="selectedCalendarType"
              [showCalendarSelector]="false"
              (dateSelected)="onDateSelected($event)">
            </lib-calendar-display>
          </div>
        </section>

        <section class="demo-section" *ngIf="selectedDate">
          <h2>🎯 Fecha Seleccionada</h2>
          <div class="selected-info">
            <p><strong>Fecha Original:</strong> {{ selectedDate | date:'fullDate' }}</p>
            <p><strong>Gregoriano (Corto):</strong> {{ selectedDate | calendarFormat:CalendarType.GREGORIAN:DateFormat.SHORT }}</p>
            <p><strong>Gregoriano (Largo):</strong> {{ selectedDate | calendarFormat:CalendarType.GREGORIAN:DateFormat.LONG }}</p>
            <p><strong>Islámico (Largo):</strong> {{ selectedDate | calendarFormat:CalendarType.ISLAMIC:DateFormat.LONG }}</p>
            <p><strong>Persa (Medio):</strong> {{ selectedDate | calendarFormat:CalendarType.PERSIAN:DateFormat.MEDIUM }}</p>
            <p><strong>ISO:</strong> {{ selectedDate.toISOString() }}</p>
          </div>
        </section>
      </main>

      <footer>
        <p>📦 NgCalendarFormatter v1.0.0</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    header {
      text-align: center;
      margin-bottom: 40px;
      padding: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
    }

    .demo-section {
      margin-bottom: 40px;
      padding: 30px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .demo-section h2 {
      margin: 0 0 20px 0;
      color: #333;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }

    .demo-button {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .demo-button:hover {
      background: #45a049;
    }

    .results {
      margin-top: 20px;
      padding: 15px;
      background: #f7fafc;
      border-radius: 8px;
    }

    .calendar-demo {
      display: flex;
      justify-content: center;
    }

    .selected-info {
      padding: 15px;
      background: #e6f3ff;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }

    .selected-info p {
      margin: 8px 0;
      font-size: 16px;
    }

    pre {
      background: #1a202c;
      color: #e2e8f0;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
    }

    footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      background: #f7fafc;
      border-radius: 8px;
    }
      .calendar-controls {
      margin-bottom: 20px;
      text-align: center;
    }

    .calendar-controls label {
      display: inline-block;
      margin-right: 10px;
      font-weight: bold;
      color: #333;
    }

    .calendar-controls select {
      padding: 8px 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      background: white;
      cursor: pointer;
    }

    .calendar-controls select:focus {
      outline: none;
      border-color: #667eea;
    }
  `]
})
export class AppComponent {
  title = 'NgCalendarFormatter Demo';
  result: any = null;
  selectedDate: Date | null = null;
  selectedCalendarType: CalendarType = CalendarType.GREGORIAN;

  // Exponer los enums para usar en el template
  CalendarType = CalendarType;
  DateFormat = DateFormat;

  constructor(private calendarFormatter: CalendarFormatterService) {}

  testService() {
    const testDate = new Date();
    
    try {
      const gregorianResult = this.calendarFormatter.formatDate(testDate, {
        type: CalendarType.GREGORIAN,
        format: DateFormat.FULL
      });

      const islamicResult = this.calendarFormatter.formatDate(testDate, {
        type: CalendarType.ISLAMIC,
        format: DateFormat.LONG
      });

      this.result = {
        date: testDate.toISOString(),
        gregorian: gregorianResult,
        islamic: islamicResult,
        info: this.calendarFormatter.getCalendarInfo(CalendarType.GREGORIAN, testDate)
      };
    } catch (error) {
      this.result = {
        error: 'Error al ejecutar el servicio',
        details: error
      };
    }
    
    console.log('Resultado del test:', this.result);
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    console.log('Fecha seleccionada:', date);
  }

  onCalendarTypeChange() {
    console.log('Tipo de calendario cambiado a:', this.selectedCalendarType);
  }
}