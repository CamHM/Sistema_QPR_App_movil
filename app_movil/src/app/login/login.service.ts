import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import {Person} from '../entity/person';
import {User} from '../entity/user';
import { ReportService } from '../home/report.service';
import { HTTP_URL } from '../config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private reportService: ReportService
  ) { }

  register(user: User): Observable<Person> {
    return this.http.post<Person>(`${HTTP_URL}/person/login`, user).pipe(
        tap(async (res: Person ) => {

        })
    );
  }

  login(user: User): Observable<Person> {
    return this.http.post<Person>('http://192.168.1.6:3000/person/login', user);
  }
}
