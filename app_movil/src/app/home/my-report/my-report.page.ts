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
    initialSlide: 0,
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
    this.reportService.getUserPost()
      .subscribe(res => {
        this.posts = res;
        for (const i of res) {
          i.photos = [];
          this.reportService.getPostReferencePhotos(i.id_post)
            .subscribe(photos => {
              for (const j of photos) {
                this.reportService.getPostPhotos(j.img)
                    .subscribe(img => {
                      i.photos.push(img);
                    });
              }
            });
          console.log('Array de photos');
          console.log(i.photos);
      }
    });
  }
}
