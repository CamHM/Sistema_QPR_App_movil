import {Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {DomSanitizer} from '@angular/platform-browser';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  map = new Map();
  imagesCount = 0;
  latitude: any;
  longitude: any;

  constructor(
      private camera: Camera,
      private imagePicker: ImagePicker,
      private geolocation: Geolocation,
      private alertCtrl: AlertController,
      private actionSheetCtrl: ActionSheetController,
      public toastCtrl: ToastController,
      private router: Router,
      private sanitizer: DomSanitizer
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
          if (this.imagesCount < 4) {
            this.takePicture();
          } else {
            this.showMaxPhotoToast().then();
          }
        }
      }, {
        text: 'Subir foto',
        icon: 'photos',
        handler: () => {
          if (this.imagesCount < 4) {
            this.getImages();
          } else {
            this.showMaxPhotoToast().then();
          }
        }
      }, {
        text: 'Cancelar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  async showMaxPhotoToast() {
    const toast = await this.toastCtrl.create({
      message: 'Puedes subir máximo 4 fotos',
      duration: 2000
    });
    toast.present();
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
          const picture = 'data:image/jpeg;base64,' + imageData;
          console.log(picture);
          this.map.set(this.imagesCount++, picture);
        })
        .catch(error => {
          prompt(error);
        });
  }

  getImages() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 4,
      quality: 50,
      outputType: 1
    };
    this.imagePicker.getPictures(options)
        .then((results) => {
          for (let i = 0; i < results.length; i++) {
            this.map.set(this.imagesCount++, 'data:image/jpeg;base64,' + results[i]);
          }
        }).catch((err) => {
          alert(err);
    });
  }
}
