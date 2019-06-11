import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  code_person: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  passwordAgain: string;
  path_photo: string;
  type: string;

  constructor(
      private loginService: LoginService,
      private router: Router,
      private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['login']);
  }

  register() {
    if (this.password !== this.passwordAgain) {
      this.passwordMessage().then();
    }
  }

  async passwordMessage() {
    const alert = await this.alertCtrl.create({
      header: 'Campo invalido',
      message: 'Las contraseñas digitadas no coinciden',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });
    await alert.present();
  }
}
