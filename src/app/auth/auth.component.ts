import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(public dialogRef: MatDialogRef<AuthComponent>) { }

  public onCloseDialog() {
    this.dialogRef.close('Pizza!');
  }

}
