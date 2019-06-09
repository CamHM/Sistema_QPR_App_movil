import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {HomePage} from '../home/home.page';
import {User} from '../entity/user';
import {ReportService} from '../home/report.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  code: string;
  password: string;

  constructor(
      private loginService: LoginService,
      private reportService: ReportService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    const user = new User();
    user.code_person = +this.code;
    user.password = this.password;
    console.log(user);
    this.loginService.login(user).subscribe(res  => {
      this.reportService.setUser(res[0]);
      this.router.navigate(['home']);
      this.code = '';
      this.password = '';
    }, (err: any) => {
      console.log(err);
    });

  }
}
