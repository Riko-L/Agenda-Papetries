import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataBaseService, Events } from '../../service/data-base.service';
import * as moment from 'moment';
import { CalendarDate } from '../month-calendar/month-calendar.component';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal-page/modal-page.page';

@Component({
  selector: 'app-detail-events',
  templateUrl: './detail-events.component.html',
  styleUrls: ['./detail-events.component.scss']
})

export class DetailEventsComponent implements OnInit ,OnChanges {
    @Input()
    events: Events[];
    @Input()
    dateCalendarInput: CalendarDate;
    @Output()
    calendarUpdate: EventEmitter<CalendarDate> = new EventEmitter<CalendarDate>();
    
    constructor(private modalController: ModalController, private databaseService: DataBaseService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.dateCalendarInput.currentValue) {
            this.getEvents(this.dateCalendarInput);
        }
    }

    getEvents(date: CalendarDate) {
        this.events = date.events;
    }

    async openModal(id: any) {

        const modalPage = await this.modalController.create({
            component: ModalPage,
            componentProps: {
                event: this.events.find( event => event._id === id)
            }
        });
        return await modalPage.present();
    }

  deleteEvent(event: Events){
    this.databaseService.deleteEvent(event).subscribe(data => {
      this.calendarUpdate.emit(this.dateCalendarInput);
      const el = this.events.findIndex(tabevent => tabevent._id === data.id);
      this.events.splice(el,1);
    });
  }
}
