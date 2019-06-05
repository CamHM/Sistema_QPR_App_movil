import { Injectable } from '@angular/core';
import {Person} from '../entity/person';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private users: Person[] = [
    {
      code_person: 201612173,
      first_name: 'María',
      last_name: 'Mendez',
      path_photo: 'https://www.arminreinhardt.com/wp-content/uploads/2017/04/gleicia.jpg',
      type_person: 'E',
      email: 'maria.mendez@uptc.edu.co',
      password: 'mame123'
    }
  ];

  constructor() { }

  getUser() {
    return this.users[0];
  }
}
