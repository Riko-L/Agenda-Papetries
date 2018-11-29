import {Component, OnInit, Input, Output} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataBaseService} from '../../../service/data-base.service';
import {Location} from '@angular/common';
import {EventEmitter} from 'selenium-webdriver';
import {MonthCalendarComponent} from '../../month-calendar/month-calendar.component';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPage implements OnInit  {

  event  ;
  private eventFormUpdate: FormGroup;

  ngOnInit() {
      this.event = this.navParams.get('event');
      console.log(this.event);

      this.eventFormUpdate = this.fb.group({
          _id:[this.event._id],
          _rev:[this.event._rev],
          title: [this.event.title, Validators.required],
          description: [this.event.description, Validators.required],
          start_time: [this.event.start_time, Validators.required],
          end_time: [this.event.end_time, Validators.required],
          location: [this.event.location, Validators.required]
      });
  }

  constructor(
      private navParams: NavParams,
      private modalController: ModalController,
      private fb: FormBuilder,
      private databaseService: DataBaseService,
      private location: Location
  ) {}

  onSubmit() {
    this.databaseService.putEvent(this.eventFormUpdate.value).subscribe( data => {
        if(data.ok === true) this.modalController.dismiss();

    });
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
