import { Component, Inject, ViewEncapsulation, OnDestroy } from '@angular/core';
// import { MAT_SNACK_BAR_DATA } from '@angular/material';
// import { UserInterfaceService } from 'src/app/services/user-interface.service';
// import { Subscription } from 'rxjs';
// import { INotification } from 'src/app/models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnDestroy {
  // public notificationData: INotification;
  // private subscription = new Subscription();

  // constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private userInterfaceService: UserInterfaceService) {
  //   const subscription = this.userInterfaceService.notificationEvent$.subscribe(
  //     (notifData: INotification) => {
  //         this.notificationData = notifData;
  //     }
  //   );
  //   this.subscription.add(subscription);
  // }

  public ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
