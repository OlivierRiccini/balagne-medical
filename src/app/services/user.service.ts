import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(`http://localhost:3000/users`);
  }

  public create(user: IUser): Observable<any> {
    return this.http.post(`http://localhost:3000/users/create`, user);
  }
}
