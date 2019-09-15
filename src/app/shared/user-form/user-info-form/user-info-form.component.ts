import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss', '../user-form.component.scss']
})
export class UserInfoFormComponent implements OnDestroy {
  private currentUser: IUser;
  private subscription = new Subscription();
  public form: FormGroup;
  public isEditMode = false;
  public isSending = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userInterfaceService: UserInterfaceService
    ) {
    this.currentUser = this.authService.getCurrentUser();
    this.createForm();
  }

  public onToggleEditMode(): void {
    if (this.form) {
      this.isEditMode = !this.isEditMode;
      this.isEditMode ? this.form.enable() : this.form.disable();
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSubmit() {
    if (this.form.valid) {
      this.isSending = true;
      const user = this.form.value;
      const subscription = this.authService.updateProfile(user, this.currentUser.id).subscribe(
        () => {
          this.userInterfaceService.success(`Changements enregistrés avec succès`);
          this.form.disable();
          this.isEditMode = false;
        },
        () => this.userInterfaceService.error(`Un probèleme est survenu lors de l'enregistrement des modifications`),
        () => this.isSending = false
      );
      this.subscription.add(subscription);
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: [this.currentUser ? this.currentUser.username : '', [Validators.required]],
      organizationName: [this.currentUser ? this.currentUser.organizationName : '', []],
      email: [this.currentUser ? this.currentUser.email : '', [Validators.required]]
    });
    this.form.disable();
  }

}
