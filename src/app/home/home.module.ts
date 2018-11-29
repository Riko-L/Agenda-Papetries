import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

import { ButtonEventsComponent } from '../components/button-events/button-events.component';
import { MonthCalendarComponent } from '../components/month-calendar/month-calendar.component';
import { DetailEventsComponent } from '../components/detail-events/detail-events.component';
import { DayCalendarComponent } from '../components/day-calendar/day-calendar.component';
import { ModalPage } from '../components/detail-events/modal-page/modal-page.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ButtonEventsComponent,
    HomePage,
    MonthCalendarComponent,
    DetailEventsComponent,
    DayCalendarComponent,
    ModalPage
  ],
  exports: [
    MonthCalendarComponent,
    DetailEventsComponent,
    DayCalendarComponent,
  ],
  entryComponents: [
      ModalPage
  ],

})
export class HomePageModule { }

