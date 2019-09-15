import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { checkPasswords } from '../../../utils/validators/check-passwords';
import { IUser } from 'src/app/models/user';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-password-form',
  templateUrl: './user-password-form.component.html',
  styleUrls: ['./user-password-form.component.scss', '../user-form.component.scss']
})
export class UserPasswordFormComponent implements OnDestroy {
  public form: FormGroup;
  public isEditMode = false;
  public isSending = false;
  private currentUser: IUser;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userInterfaceService: UserInterfaceService
    ) {
    this.currentUser = this.authService.getCurrentUser();
    this.createForm();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onToggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.form) {
      this.isEditMode ? this.form.enable() : this.form.disable();
    }
  }

  public onSubmit(form: FormGroup, formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }
    const comfirmResponse = confirm(`Êtes vous certain de vouloir changer votre mot de passe?
    Si oui vous allez être redirigé vers la page d'authentification une fois l'enregistrement réussit`);
    if (comfirmResponse) {
      this.processRequest();
    } else {
      this.isEditMode = false;
        this.form.reset();
        form.reset();
        this.form.disable();
    }
  }

  private processRequest(): void {
    this.isSending = true;
    const oldPassword: string = this.form.value.currentPassword;
    const newPassword: string = this.form.value.newPassword;
    const subscription = this.authService.updatePassword(this.currentUser.id, oldPassword, newPassword).subscribe(
      () => {
        this.form.reset();
        this.userInterfaceService.success('Nouveau mot de passe enregistré avec succès! Vous allez le recevoir par email...');
        this.authService.doLogoutUser('pharmacies');
        this.isEditMode = false;
      },
      () => {
        this.userInterfaceService.success(`Hummm le mot de passe n'a pas pu être enregistré...`);
        this.form.get('currentPassword').setErrors({ passwordNotValid: true });
      },
      () => this.isSending = false
    );
    this.subscription.add(subscription);
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
    const subscription = this.form.get('newPassword').valueChanges.subscribe(
      (value: string) => {
        if (this.form.get('confirmPassword').value === value) {
          this.form.get('confirmPassword').setErrors(null);
        } else {
          this.form.get('confirmPassword').setErrors({notSame: true});
        }
      }
    );
    this.subscription.add(subscription);
  }

}
