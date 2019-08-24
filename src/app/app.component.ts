import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'balagne-medical';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef: MatDialogRef<AuthComponent> = this.dialog.open(AuthComponent, {
      width: '250px',
      hasBackdrop: true
    });
    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    })    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
