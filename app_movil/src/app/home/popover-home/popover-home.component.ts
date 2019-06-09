import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-popover-home',
  templateUrl: './popover-home.component.html',
  styleUrls: ['./popover-home.component.scss'],
})
export class PopoverHomeComponent implements OnInit {

  constructor(
      private router: Router,
      public popoverCtrl: PopoverController
      ) { }

  ngOnInit() {}

  getout() {
    this.popoverCtrl.dismiss();
    this.router.navigate(['login']);
  }
}
