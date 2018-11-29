import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup = this.fb.group({
    email: ['', [Validators.required ,Validators.email]]
  })


  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder) { }

  ngOnInit() {
  
  }

  
  onSubmit() {
    this.authService.login(this.loginForm.value.email);
  }
}
