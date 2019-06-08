import { Component, OnInit } from '@angular/core';
import {ReportService} from '../report.service';
import {Post} from '../../entity/post';

@Component({
  selector: 'app-my-report',
  templateUrl: './my-report.page.html',
  styleUrls: ['./my-report.page.scss'],
})
export class MyReportPage implements OnInit {

  slideOptions = {
    loop: true,
    initialSlide: 1,
    speed: 400
  };
  posts: Post[];

  constructor(
      private reportService: ReportService
  ) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.posts = this.reportService.getMyPost();
  }
}
