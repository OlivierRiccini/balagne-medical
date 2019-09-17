import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users`);
  }

  public create(user: IUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/create`, user);
  }
}
