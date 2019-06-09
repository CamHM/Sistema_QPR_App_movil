import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import {Person} from '../entity/person';
import {User} from '../entity/user';
import { ReportService } from '../home/report.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  LOGIN_ADDRESS: 'http://192.168.1.35:3000';

  constructor(
    private http: HttpClient,
    private reportService: ReportService
  ) { }

  register(user: User): Observable<Person> {
    return this.http.post<Person>(this.LOGIN_ADDRESS, user).pipe(
        tap(async (res: Person ) => {

        })
    );
  }

  login(user: User): Observable<Person> {
    /*return this.http.post<Person>('http://192.168.1.3:3000/person/login', JSON.stringify(user)).pipe(
        tap(async (res: Person) => {
          console.log('Pipe ' + res);
          this.reportService.setUser(res);
        })
    );*/
    return this.http.post<Person>('http://192.168.1.3:3000/person/login', user);
  }
}
