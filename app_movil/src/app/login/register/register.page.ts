import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
      private loginService: LoginService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['login']);
  }

  register(form) {
    this.loginService.register(form.value).subscribe((res) => {
      this.router.navigate(['home']);
    });
  }

}
