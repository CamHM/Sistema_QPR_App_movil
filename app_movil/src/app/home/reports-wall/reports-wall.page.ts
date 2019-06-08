import { Component, OnInit } from '@angular/core';
import {ReportService} from '../report.service';
import {Post} from '../../entity/post';

@Component({
  selector: 'app-reports-wall',
  templateUrl: './reports-wall.page.html',
  styleUrls: ['./reports-wall.page.scss'],
})
export class ReportsWallPage implements OnInit {

  posts: Post[];
  slideOptions = {
    loop: true,
    initialSlide: 1,
    speed: 400
  };


  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.posts = this.reportService.getPosts();
  }
}
