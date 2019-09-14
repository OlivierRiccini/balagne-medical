import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss', '../user-form.component.scss']
})
export class UserInfoFormComponent implements OnInit {
  private currenUser: IUser;
  public form: FormGroup;
  public isEditMode = false;

  constructor(public authService: AuthService, public fb: FormBuilder) {
    this.currenUser = this.authService.getCurrentUser();
    this.createForm();
  }

  ngOnInit() {
  }

  public onToggleEditMode(): void {
    if (this.form) {
      this.isEditMode = !this.isEditMode;
      this.isEditMode ? this.form.enable() : this.form.disable();
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: [this.currenUser ? this.currenUser.username : '', [Validators.required]],
      email: [this.currenUser ? this.currenUser.email : '', [Validators.required]]
    });
    this.form.disable();
  }

}
