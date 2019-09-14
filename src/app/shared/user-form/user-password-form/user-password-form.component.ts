import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { checkPasswords } from '../../../utils/validators/check-passwords';
import { IUser } from 'src/app/models/user';
import { UserInterfaceService } from 'src/app/services/user-interface.service';

@Component({
  selector: 'app-user-password-form',
  templateUrl: './user-password-form.component.html',
  styleUrls: ['./user-password-form.component.scss', '../user-form.component.scss']
})
export class UserPasswordFormComponent implements OnInit {
  public form: FormGroup;
  public isEditMode = false;
  private currentUser: IUser;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userInterfaceService: UserInterfaceService
    ) {
    this.currentUser = this.authService.getCurrentUser();
    this.createForm();
  }

  ngOnInit() {
  }

  public onToggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.form) {
      this.isEditMode ? this.form.enable() : this.form.disable();
    }
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const comfirmResponse = confirm(`Êtes vous certain de vouloir changer votre mot de pass?`);
    if (comfirmResponse) {
      this.processRequest();
    } else {
      this.isEditMode = false;
        this.form.reset();
        this.form.disable();
    }
  }

  private processRequest(): void {
    const oldPassword: string = this.form.value.currentPassword;
    const newPassword: string = this.form.value.newPassword;
    this.authService.updatePassword(this.currentUser.id, oldPassword, newPassword).subscribe(
      () => {
        this.form.reset();
        this.userInterfaceService.success('Nouveau password enregistré avec succès!');
        this.authService.doLogoutUser('pharmacies');
        this.isEditMode = false;
      },
      () => {
        this.userInterfaceService.success(`Hummm le mot de passe n'a pas pu être enregistré...`);
        this.form.get('currentPassword').setErrors({ passwordNotValid: true });
      }
    );
  }

  private createForm(): void {
    this.form = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, checkPasswords]],
      confirmPassword: ['', [Validators.required, checkPasswords]]
    });
    this.form.disable();
    this.hanldePassChangesAfterConfirm();
  }

  private hanldePassChangesAfterConfirm(): void {
    this.form.get('newPassword').valueChanges.subscribe(
      (value: string) => {
        if (this.form.get('confirmPassword').value === value) {
          this.form.get('confirmPassword').setErrors(null);
        } else {
          this.form.get('confirmPassword').setErrors({notSame: true});
        }
      }
    );
  }

}
