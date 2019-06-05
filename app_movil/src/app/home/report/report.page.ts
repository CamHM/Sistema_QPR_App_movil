import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  picture: any;
  imageResponse: string[];
  latitude: any;
  longitude: any;

  constructor(
      private camera: Camera,
      private imagePicker: ImagePicker,
      private geolocation: Geolocation,
      private alertCtrl: AlertController,
      private actionSheetCtrl: ActionSheetController,
      private router: Router
  ) {}

  ngOnInit() {
    this.getPosition();
  }

  getPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(`latitud: ${this.latitude} - longitud: ${this.longitude}`);
    });
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

  async presentPhotoOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [{
        text: 'Tomar foto',
        icon: 'camera',
        cssClass: 'danger',
        handler: () => {
          this.takePicture();
        }
      }, {
        text: 'Subir foto',
        icon: 'photos',
        handler: () => {
          this.getImages();
        }
      }, {
        text: 'Cancelar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options)
        .then(imageData => {
          this.picture = 'data:image/jpeg;base64,' + imageData;
          const image = document.getElementsByTagName('img').namedItem('picture');
          image.src = 'data:image/jpeg;base64,' + imageData;
        })
        .catch(error => {
          prompt(error);
        });
  }

  getImages() {
    this.imagePicker.getPictures({
      maximumImagesCount: 4,
      quality: 50,
      outputType: 1
    }).then((results) => {
      for (const i of results) {
        this.imageResponse.push(results[i]);
      }
    }).catch(err => {
      alert(err);
    });
  }
}
