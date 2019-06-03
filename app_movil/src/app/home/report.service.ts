import { Injectable } from '@angular/core';
import {User} from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private users: User[] = [
    {
      id: '201612173',
      name: 'María',
      lastName: 'Mendez',
      imgUrl: 'https://www.arminreinhardt.com/wp-content/uploads/2017/04/gleicia.jpg'
    }
  ];

  constructor() { }

  getUser() {
    return this.users[0];
  }
}
