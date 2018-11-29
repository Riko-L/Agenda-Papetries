import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { DataBaseService } from '../service/data-base.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage {

  currentdate = moment();

  eventForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    start_time: [ this.currentdate.toISOString(), Validators.required],
    end_time: [this.currentdate.add(2,'h').toISOString(), Validators.required],
    location: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private databaseService: DataBaseService,
    private location: Location) { }


  onSubmit() {
    this.databaseService.addEvent(this.eventForm.value).subscribe(data => {
      if(data.ok === true) this.location.back();
      }
      );
    
  }

  OnDelete() {
    this.eventForm.reset();
  }
}
