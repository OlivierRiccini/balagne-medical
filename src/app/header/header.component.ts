import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInterfaceService } from '../services/user-interface.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  public isLoggedIn: boolean;
  private subscription = new Subscription();

  constructor(private authService: AuthService, private userInterfaceService: UserInterfaceService) {
    this.listenCurrentUser();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onLogout(): void {
    this.authService.doLogoutUser('pharmacies');
    this.userInterfaceService.success('Déconnecté!');
  }

  private listenCurrentUser(): void {
    const subscription = this.authService.currentUserChange$.subscribe(
      user => {
        this.isLoggedIn = !!user && this.authService.isLoggedIn();
      }
    );
    this.subscription.add(subscription);
  }

}
