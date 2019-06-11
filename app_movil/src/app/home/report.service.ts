import { Injectable } from '@angular/core';
import {Person} from '../entity/person';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../entity/post';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private httpUrl = 'http://192.168.1.6:8001';
  private user: Person;

  constructor(private http: HttpClient) { }

  setURL(url) {
    this.httpUrl = `http://${url}`;
    console.log(this.httpUrl);
  }

  getURL(): string {
    return this.httpUrl;
  }

  setUser(person: Person) {
    this.user = person;
  }

  getUser() {
    return this.user;
  }

  public sendPost(post): Observable<Post> {
    return this.http.post<Post>(`${this.httpUrl}/post`, post);
  }

  public sendImages(data): Observable<any> {
    return this.http.post<any>(`${this.httpUrl}/photopost/`, data);
  }
  getUserPost(): Observable<Post[]> {
    return this.http.post<Post[]>(`${this.httpUrl}/post/posts`, {code_person: this.user.code_person});
  }
  getPostReferencePhotos(postId): Observable<any[]> {
    return this.http.post<any[]>(`${this.httpUrl}/photopost/post`, {id_post: postId});
  }

  getPostPhotos(imgPath): Observable<any[]> {
    return this.http.post<any[]>(`${this.httpUrl}/download`, {path_img: imgPath });
  }

  getAllPosts(offset): Observable<Post[]> {
    return this.http.post<Post[]>(`${this.httpUrl}/post/allpost`, {offset, code_person: this.user.code_person});
  }
}
