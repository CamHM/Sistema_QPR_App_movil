import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {Person} from '../entity/person';
import {ReportService} from './report.service';
import {PopoverController} from '@ionic/angular';
import {PopoverHomeComponent} from './popover-home/popover-home.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  user: Person;

  constructor(
      private router: Router,
      private reportService: ReportService,
      public popoverCtrl: PopoverController
  ) {
    this.user = reportService.getUser();
  }

  openReportPage() {
    this.router.navigate(['home/report']);
  }

  openMyReportsPage() {
    this.router.navigate(['home/my-reports']);
  }

  openReportsWallPage() {
    this.router.navigate(['home/reports-wall']);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverHomeComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
