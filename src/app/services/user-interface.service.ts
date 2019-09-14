import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { INotification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {
  private notificationEvent: Subject<INotification>;
  public notificationEvent$: Observable<INotification>;

  constructor() {
    this.notificationEvent = new Subject();
    this.notificationEvent$ = this.notificationEvent.asObservable();
  }

  public success(message: string): void {
    this.notificationEvent.next({ message, type: 'succes' });
  }

  public error(message: string): void {
    this.notificationEvent.next({ message, type: 'error' });
  }

}
