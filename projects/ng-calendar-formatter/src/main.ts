import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgCalendarFormatterModule } from 'ng-calendar-formatter';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule, NgCalendarFormatterModule)
  ]
}).catch(err => console.error(err));