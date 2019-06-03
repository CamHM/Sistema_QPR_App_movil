import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {User} from '../entity/user';
import {ReportService} from './report.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  user: User;

  constructor(
      private router: Router,
      private reportService: ReportService
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
}
