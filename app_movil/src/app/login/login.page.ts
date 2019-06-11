import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {User} from '../entity/user';
import {ReportService} from '../home/report.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public ip = 'http://192.168.137.95';
  email: string;
  password: string;

  constructor(
      private loginService: LoginService,
      private reportService: ReportService,
      private router: Router,
      private alertCtrtl: AlertController
  ) { }

  ngOnInit() {
  }

  login() {
    const user = new User();
    user.email = this.email;
    user.password = this.password;
    console.log(user);
    this.loginService.login(user).subscribe(res  => {
      this.reportService.setUser(res);
      this.router.navigate(['home']);
      this.email = '';
      this.password = '';
    }, (err: any) => {
      console.log(err);
    });
  }

  async changeIp() {
    const alert = await this.alertCtrtl.create({
      header: 'Cambiar Ip',
      inputs: [
        {
          type: 'text',
          placeholder: 'Nueva ip'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Cambiar',
          handler: (ip) => {
            if (ip !== '') {
              this.reportService.setURL(ip[0]);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
