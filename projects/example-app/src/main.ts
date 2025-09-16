
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
// import { CalendarFormatterService } from '../../../dist/ng-calendar-formatter';
import { CalendarFormatterService } from '../../ng-calendar-formatter/src/public-api';

bootstrapApplication(AppComponent, {
  providers: [
    CalendarFormatterService
  ]
}).catch(err => console.error(err));