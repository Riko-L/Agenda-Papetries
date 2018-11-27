import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataBaseService, Events } from '../../service/data-base.service';
import * as moment from 'moment';
import { CalendarDate } from '../month-calendar/month-calendar.component';

@Component({
  selector: 'app-detail-events',
  templateUrl: './detail-events.component.html',
  styleUrls: ['./detail-events.component.scss']
})
export class DetailEventsComponent implements OnInit ,OnChanges{
 
  
  events: Events[];

  @Input()
  dateCalendarInput:CalendarDate;

  @Output()
  calendarUpdate: EventEmitter<CalendarDate> = new EventEmitter<CalendarDate>();
  constructor(private databaseService: DataBaseService) { }

  ngOnInit() {
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.dateCalendarInput.currentValue) {
      this.getEvents(this.dateCalendarInput);
    }
  }

  getEvents(date: CalendarDate){
    this.events = date.events;
  }
 
  deleteEvent(event: Events){
    this.databaseService.deleteEvent(event).subscribe(data => {
      this.calendarUpdate.emit(this.dateCalendarInput);
      const el = this.events.findIndex(tabevent => tabevent._id === data.id);
      this.events.splice(el,1);
    });
  }
}
