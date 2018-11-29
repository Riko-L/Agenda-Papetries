import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Events, DataBaseService } from '../../service/data-base.service';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
  isWeek?: boolean;
  isSelectedMonth?: boolean;
  events?: Events[];
}

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent implements OnInit, OnChanges {

  @Input()
  events: Events[];
  @Input()
  dateforUpdate: CalendarDate;

  currentDate = moment().locale('fr');
  dayNames = [0,1,2,3,4,5,6].map( data => moment().day(data).format('ddd'))
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];

  @Input()
  selectedDates: CalendarDate[] = [];
  @Output()
  onSelectDate = new EventEmitter<CalendarDate>();

  constructor(private dataBaseService: DataBaseService) {}

  ngOnInit(): void {
    this.dataBaseService.getAllEvents().subscribe( data => {
      this.events = data
      this.generateCalendar();
   });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
        changes.selectedDates &&
        changes.selectedDates.currentValue &&
        changes.selectedDates.currentValue.length  > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }

    if(changes.dateforUpdate.currentValue){
      this.currentDate = moment(this.dateforUpdate.mDate);
      this.dataBaseService.getAllEvents().subscribe( data => {
        this.events = data
        this.generateCalendar();
     });
    }
  }

  // date checkers

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  isWeekDay(date: moment.Moment):boolean {
    return moment(date).isSame(moment(date).isoWeekday("Sunday"));
  }
  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }
  onClickDay(date: CalendarDate) {
    this.onSelectDate.emit(date);
  }
  eventOfDay(date: moment.Moment): Events[]{
    return this.events.filter( event => { 
      return moment(event.start_time).isSame(date, 'day') && event.start_time !== undefined ?event : null;
    });
   }

  // actions from calendar

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // generate the calendar grid

  public generateCalendar(): void {
    
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
              return {
                today: this.isToday(d),
                selected: this.isSelected(d),
                isWeek: this.isWeekDay(d),
                isSelectedMonth : this.isSelectedMonth(d),
                mDate: d,
                events: this.eventOfDay(d)
              };
            });
  }
}
