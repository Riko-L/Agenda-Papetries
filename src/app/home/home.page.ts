import { Component ,Input} from '@angular/core';
import { CalendarDate } from '../components/month-calendar/month-calendar.component';
import { AuthenticationService } from '../service/authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginName:string;
  dateCalendar: CalendarDate;
  dateUpdate: CalendarDate;

  constructor(private authService: AuthenticationService, private storage: Storage) { }

  ngOnInit(): void {
    this.storage.get('auth-token').then(login => this.loginName = login);
  }

  dateSelected(data: CalendarDate){
    this.dateCalendar= data;
  }

  updateCal(data: CalendarDate){
    this.dateUpdate= data;
  }

  logout() {
    this.authService.logout();
  }
}

