import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarFormatterService, CalendarType, DateFormat, NgCalendarFormatterModule } from 'ng-calendar-formatter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgCalendarFormatterModule],
  template: `
    <div class="app-container">
      <header>
        <h1>🗓️ NgCalendarFormatter - Demo</h1>
        <p>Demostración de la librería de calendarios múltiples</p>
      </header>

      <main>
        <!-- Sección de Pipes -->
        <section class="demo-section">
          <h2>📝 Demo de Pipes</h2>
          <div class="pipes-demo">
            <div class="date-input">
              <label>Selecciona una fecha:</label>
              <input type="date" [(ngModel)]="selectedDateString" (change)="updateSelectedDate()">
            </div>
            
            <div class="formats-grid">
              <div class="format-card">
                <h3>🗓️ Gregoriano</h3>
                <ul>
                  <li><strong>Corto:</strong> {{ selectedDate | calendarFormat:'gregorian':'short' }}</li>
                  <li><strong>Medio:</strong> {{ selectedDate | calendarFormat:'gregorian':'medium' }}</li>
                  <li><strong>Largo:</strong> {{ selectedDate | calendarFormat:'gregorian':'long' }}</li>
                  <li><strong>Completo:</strong> {{ selectedDate | calendarFormat:'gregorian':'full' }}</li>
                </ul>
              </div>

              <div class="format-card">
                <h3>🌙 Islámico (Hijri)</h3>
                <ul>
                  <li><strong>Corto:</strong> {{ selectedDate | calendarFormat:'islamic':'short' }}</li>
                  <li><strong>Medio:</strong> {{ selectedDate | calendarFormat:'islamic':'medium' }}</li>
                  <li><strong>Largo:</strong> {{ selectedDate | calendarFormat:'islamic':'long' }}</li>
                  <li><strong>Completo:</strong> {{ selectedDate | calendarFormat:'islamic':'full' }}</li>
                </ul>
              </div>

              <div class="format-card">
                <h3>🏛️ Persa (Jalaali)</h3>
                <ul>
                  <li><strong>Corto:</strong> {{ selectedDate | calendarFormat:'persian':'short' }}</li>
                  <li><strong>Medio:</strong> {{ selectedDate | calendarFormat:'persian':'medium' }}</li>
                  <li><strong>Largo:</strong> {{ selectedDate | calendarFormat:'persian':'long' }}</li>
                  <li><strong>Completo:</strong> {{ selectedDate | calendarFormat:'persian':'full' }}</li>
                </ul>
              </div>

              <div class="format-card">
                <h3>✡️ Hebreo</h3>
                <ul>
                  <li><strong>Corto:</strong> {{ selectedDate | calendarFormat:'hebrew':'short' }}</li>
                  <li><strong>Medio:</strong> {{ selectedDate | calendarFormat:'hebrew':'medium' }}</li>
                  <li><strong>Largo:</strong> {{ selectedDate | calendarFormat:'hebrew':'long' }}</li>
                  <li><strong>Completo:</strong> {{ selectedDate | calendarFormat:'hebrew':'full' }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Sección de Calendarios -->
        <section class="demo-section">
          <h2>📅 Demo de Calendarios Visuales</h2>
          <div class="calendars-grid">
            <div class="calendar-demo">
              <h3>Calendario Gregoriano</h3>
              <lib-calendar-display 
                [calendarType]="'gregorian'"
                [showCalendarSelector]="false"
                (dateSelected)="onDateSelected($event, 'Gregoriano')">
              </lib-calendar-display>
            </div>

            <div class="calendar-demo">
              <h3>Calendario Islámico</h3>
              <lib-calendar-display 
                [calendarType]="'islamic'"
                [showCalendarSelector]="false"
                (dateSelected)="onDateSelected($event, 'Islámico')">
              </lib-calendar-display>
            </div>

            <div class="calendar-demo">
              <h3>Calendario Persa</h3>
              <lib-calendar-display 
                [calendarType]="'persian'"
                [showCalendarSelector]="false"
                (dateSelected)="onDateSelected($event, 'Persa')">
              </lib-calendar-display>
            </div>

            <div class="calendar-demo">
              <h3>Selector Múltiple</h3>
              <lib-calendar-display 
                [calendarType]="currentCalendarType"
                [showCalendarSelector]="true"
                [showCalendarInfo]="true"
                (dateSelected)="onDateSelected($event, 'Múltiple')"
                (calendarTypeChanged)="onCalendarTypeChanged($event)">
              </lib-calendar-display>
            </div>
          </div>
        </section>

        <!-- Sección de API del Servicio -->
        <section class="demo-section">
          <h2>⚙️ Demo del Servicio</h2>
          <div class="service-demo">
            <div class="controls">
              <button (click)="demonstrateService()" class="demo-button">
                🔄 Demostrar API del Servicio
              </button>
            </div>
            
            @if (serviceResults.length > 0) {
              <div class="service-results">
                <h4>Resultados del Servicio:</h4>
                <div class="results-grid">
                  @for (result of serviceResults; track result.title) {
                    <div class="result-card">
                      <h5>{{ result.title }}</h5>
                      <pre>{{ result.data | json }}</pre>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </section>

        @if (lastSelectedInfo) {
          <!-- Sección de Información de Eventos -->
          <section class="demo-section">
            <h2>🎯 Última Selección</h2>
            <div class="event-info">
              <div class="info-card">
                <h4>{{ lastSelectedInfo.calendarType }}</h4>
                <p><strong>Fecha:</strong> {{ lastSelectedInfo.date | date:'fullDate' }}</p>
                <p><strong>Timestamp:</strong> {{ lastSelectedInfo.timestamp | date:'medium' }}</p>
              </div>
            </div>
          </section>
        }
      </main>

      <footer>
        <p>📦 NgCalendarFormatter v1.0.0 - Creado con ❤️ para Angular</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    header {
      text-align: center;
      margin-bottom: 40px;
      padding: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
    }

    header h1 {
      margin: 0 0 10px 0;
      font-size: 2.5em;
    }

    header p {
      margin: 0;
      font-size: 1.2em;
      opacity: 0.9;
    }

    .demo-section {
      margin-bottom: 60px;
      padding: 30px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .demo-section h2 {
      margin: 0 0 30px 0;
      color: #333;
      font-size: 1.8em;
      border-bottom: 3px solid #667eea;
      padding-bottom: 10px;
    }

    .date-input {
      margin-bottom: 30px;
      text-align: center;
    }

    .date-input label {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
      color: #555;
    }

    .date-input input {
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 6px;
      width: 200px;
    }

    .formats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .format-card {
      background: #f8f9ff;
      border: 2px solid #e1e8ff;
      border-radius: 8px;
      padding: 20px;
    }

    .format-card h3 {
      margin: 0 0 15px 0;
      color: #4a5568;
      font-size: 1.2em;
    }

    .format-card ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .format-card li {
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
      font-size: 14px;
    }

    .format-card li:last-child {
      border-bottom: none;
    }

    .calendars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
    }

    .calendar-demo h3 {
      margin: 0 0 15px 0;
      text-align: center;
      color: #4a5568;
      font-size: 1.1em;
    }

    .controls {
      text-align: center;
      margin-bottom: 30px;
    }

    .demo-button {
      background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .demo-button:hover {
      transform: translateY(-2px);
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .result-card {
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 15px;
    }

    .result-card h5 {
      margin: 0 0 10px 0;
      color: #2d3748;
      font-size: 1em;
    }

    .result-card pre {
      background: #1a202c;
      color: #e2e8f0;
      padding: 10px;
      border-radius: 4px;
      font-size: 12px;
      overflow-x: auto;
    }

    .info-card {
      background: #fff5f5;
      border: 2px solid #feb2b2;
      border-radius: 8px;
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
      text-align: center;
    }

    .info-card h4 {
      margin: 0 0 15px 0;
      color: #c53030;
    }

    .info-card p {
      margin: 8px 0;
      color: #4a5568;
    }

    footer {
      text-align: center;
      margin-top: 60px;
      padding: 20px;
      background: #f7fafc;
      border-radius: 8px;
      color: #4a5568;
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 10px;
      }
      
      .formats-grid {
        grid-template-columns: 1fr;
      }
      
      .calendars-grid {
        grid-template-columns: 1fr;
      }
      
      header h1 {
        font-size: 2em;
      }
    }
  `]
})
export class AppComponent {
  title = 'NgCalendarFormatter Demo';
  
  selectedDate: Date = new Date();
  selectedDateString: string = '';
  currentCalendarType: CalendarType = CalendarType.GREGORIAN;
  
  serviceResults: any[] = [];
  lastSelectedInfo: any = null;

  constructor(private calendarFormatter: CalendarFormatterService) {
    this.selectedDateString = this.selectedDate.toISOString().split('T')[0];
  }

  updateSelectedDate() {
    if (this.selectedDateString) {
      this.selectedDate = new Date(this.selectedDateString);
    }
  }

  onDateSelected(date: Date, calendarType: string) {
    this.selectedDate = date;
    this.selectedDateString = date.toISOString().split('T')[0];
    
    this.lastSelectedInfo = {
      date: date,
      calendarType: calendarType,
      timestamp: new Date()
    };

    console.log(`Fecha seleccionada en calendario ${calendarType}:`, date);
  }

  onCalendarTypeChanged(calendarType: CalendarType) {
    this.currentCalendarType = calendarType;
    console.log('Tipo de calendario cambiado a:', calendarType);
  }

  demonstrateService() {
    const testDate = this.selectedDate;
    const results: any[] = [];

    // Demostrar formatDate con diferentes calendarios
    const calendars = [
      { type: CalendarType.GREGORIAN, name: 'Gregoriano' },
      { type: CalendarType.ISLAMIC, name: 'Islámico' },
      { type: CalendarType.PERSIAN, name: 'Persa' }
    ];

    calendars.forEach(calendar => {
      const formatted = this.calendarFormatter.formatDate(testDate, {
        type: calendar.type,
        format: DateFormat.FULL
      });

      results.push({
        title: `formatDate - ${calendar.name}`,
        data: {
          formatted: formatted.formatted,
          original: formatted.original,
          calendarType: formatted.calendarType,
          dayOfWeek: formatted.dayOfWeek,
          month: formatted.month,
          year: formatted.year
        }
      });
    });

    // Demostrar getCalendarInfo
    const gregorianInfo = this.calendarFormatter.getCalendarInfo(CalendarType.GREGORIAN, testDate);
    results.push({
      title: 'getCalendarInfo - Gregoriano',
      data: gregorianInfo
    });

    const islamicInfo = this.calendarFormatter.getCalendarInfo(CalendarType.ISLAMIC, testDate);
    results.push({
      title: 'getCalendarInfo - Islámico',
      data: islamicInfo
    });

    // Demostrar formato personalizado
    const customFormat = this.calendarFormatter.formatDate(testDate, {
      type: CalendarType.GREGORIAN,
      format: DateFormat.CUSTOM,
      customFormat: 'dddd, DD [de] MMMM [de] YYYY [a las] HH:mm:ss'
    });

    results.push({
      title: 'Formato Personalizado',
      data: {
        format: 'dddd, DD [de] MMMM [de] YYYY [a las] HH:mm:ss',
        result: customFormat.formatted
      }
    });

    this.serviceResults = results;
    
    console.log('Resultados del servicio:', results);
  }
}