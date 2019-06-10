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
    initialSlide: 0,
    speed: 400
  };

  offset = 0;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.reportService.getAllPosts(this.offset)
        .subscribe(res => {
          this.posts = res;
          for (const i of res) {
            this.offset++;
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
          }
        });
  }
}
