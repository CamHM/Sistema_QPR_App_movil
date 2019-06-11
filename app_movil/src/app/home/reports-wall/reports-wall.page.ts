import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from '../report.service';
import {Post} from '../../entity/post';
import {IonContent} from '@ionic/angular';

@Component({
  selector: 'app-reports-wall',
  templateUrl: './reports-wall.page.html',
  styleUrls: ['./reports-wall.page.scss'],
})
export class ReportsWallPage implements OnInit {

  @ViewChild('ion-content') content: IonContent;

  posts: Post[] = [];
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
          for (const i of res) {
            this.posts.push(i);
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

  refresh(event) {
      setTimeout(() => {
          this.loadPosts();
          event.target.complete();
      }, 1500);
  }

  refreshPost() {
      setTimeout(() => {
         this.loadPosts();
         this.content.scrollToTop();
      }, 1000);
  }
}
