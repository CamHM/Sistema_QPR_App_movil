import { Injectable } from '@angular/core';
import {Person} from '../entity/person';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../entity/post';
import {HTTP_URL, IMG_SERVER_A} from '../config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private user: Person;

  constructor(private http: HttpClient) { }

  setUser(person: Person) {
    this.user = person;
  }

  getUser() {
    return this.user;
  }

  public sendPost(post): Observable<Post> {
    return this.http.post<Post>(`${HTTP_URL}/post`, post);
  }

  public sendImages(data): Observable<any> {
    return this.http.post<any>(`${HTTP_URL}/photopost/`, data);
  }
  getUserPost(): Observable<Post[]> {
    return this.http.post<Post[]>(`${HTTP_URL}/post/posts`, {code_person: this.user.code_person});
  }
  getPostReferencePhotos(postId): Observable<any[]> {
    return this.http.post<any[]>(`${HTTP_URL}/photopost/post`, {id_post: postId});
  }

  getPostPhotos(imgPath): Observable<any[]> {
    return this.http.post<any[]>(`${IMG_SERVER_A}/download`, {path_img: imgPath });
  }

  getAllPosts(offset): Observable<Post[]> {
    return this.http.post<Post[]>(`${HTTP_URL}/post/allpost`, {offset, code_person: this.user.code_person});
  }
}
