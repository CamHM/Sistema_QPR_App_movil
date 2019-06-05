import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  picture: any;

  constructor(
      private camera: Camera,
      private alertCtrl: AlertController,
      private router: Router
  ) {}

  ngOnInit() {
  }

  async dismiss() {
    const alert = await this.alertCtrl.create({
      header: 'Descartar',
      message: '¿Sumercé desea botar la publicación así como así?',
      buttons: [
        {
          text: 'Descartar',
          cssClass: 'danger',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'success'
        }
      ]
    });
    await alert.present();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options)
        .then(imageData => {
          this.picture = 'data:image/jpeg;base64,' + imageData;
        })
        .catch(error => {
          prompt(error);
        });
  }
}
