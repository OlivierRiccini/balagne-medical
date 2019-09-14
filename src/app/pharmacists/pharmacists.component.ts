import { Component } from '@angular/core';
import { IUser } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pharmacists',
  templateUrl: './pharmacists.component.html',
  styleUrls: ['./pharmacists.component.scss']
})
export class PharmacistsComponent  {
  public currentUser: IUser;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }
}
