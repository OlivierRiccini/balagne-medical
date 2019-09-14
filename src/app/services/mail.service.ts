import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmail } from '../models/mail';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  public send(email: IEmail): Observable<any> {
    return this.http.post('http://localhost:3000/messages/email', email);
  }
}
