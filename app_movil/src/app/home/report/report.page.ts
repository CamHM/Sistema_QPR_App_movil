import {Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Post} from '../../entity/post';
import {ReportService} from '../report.service';
import {forEach} from '@angular-devkit/schematics';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  map = new Map();
  imagesCount = 0;
  imagesAmount = 0;
  latitude: any;
  longitude: any;
  time: string;
  title = '';
  desc = '';

  constructor(
      private camera: Camera,
      private imagePicker: ImagePicker,
      private photoViewer: PhotoViewer,
      private geolocation: Geolocation,
      private nativeGeocoder: NativeGeocoder,
      private alertCtrl: AlertController,
      private actionSheetCtrl: ActionSheetController,
      public toastCtrl: ToastController,
      private router: Router,
      private reportService: ReportService
  ) {}

  ngOnInit() {
    this.getPosition();
    this.getReverseGeocoder();
  }

  getPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude.toFixed(4);
      this.longitude = resp.coords.longitude.toFixed(4);
    });
  }

  getReverseGeocoder() {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, options)
        .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
        .catch((error: any) => console.log(error));
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
    if (this.imagesCount < 4) {
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
    } else {
      this.showMaxPhotoToast().then();
    }
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
          this.map.set(this.imagesAmount++, picture);
          this.imagesCount++;
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
            this.map.set(this.imagesAmount++, 'data:image/jpeg;base64,' + results[i]);
            this.imagesCount++;
          }
        }).catch((err) => {
          alert(err);
    });
  }

  zoomPhoto(photo) {
    this.photoViewer.show(photo);
  }

  async showDeleteAlert(photoKey) {
    const alert = await this.alertCtrl.create({
      header: 'Borrar foto',
      message: '¿Sumercé está seguro que quiere quitar esa bella foto?',
      buttons: [
        {
          text: 'Elminar',
          handler: () => {
            this.map.delete(photoKey);
            this.imagesCount--;
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  sendPost() {
    const user = this.reportService.getUser();
    const today = new Date();
    const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.time = time;
    const post = new Post();
    post.id_post = -1;
    post.code_person = user.code_person;
    post.title = this.title;
    post.content = this.desc;
    post.latitude = this.latitude;
    post.longitude = this.longitude;
    post.date = date;
    post.time_post = time;
    this.reportService
        .sendPost(post).subscribe(res => {
          this.map.forEach((value, key, map) => {
            this.reportService.sendImages({ post: res.id_post, code_person: user.code_person, img: value})
                .subscribe( ( response ) => {
                  console.log(response);
                });
          });
          this.showSendMessage().then();
    } );
  }

  async showSendMessage() {
    console.log('Se jue!');
    const toast = await this.toastCtrl.create({
      message: `Publicación registrada!
      ${this.time}`,
      duration: 3000,
      position: 'top',
      color: 'medium'
    });
    toast.present().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
