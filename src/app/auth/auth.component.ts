import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterfaceService } from '../services/user-interface.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  public hide = true;
  public form: FormGroup;
  public forgotPassForm: FormGroup;
  public forgotPassword = false;
  public targetPath: string;
  public isSending = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userInterfaceService: UserInterfaceService
    ) {
    this.createForm();
    this.createForgotPassForm();
    this.subscription.add(
      this.activatedRoute.params.subscribe(params => this.targetPath = params.target)
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onToggleForgotPassword(): void {
    this.form.reset();
    this.forgotPassForm.reset();
    this.forgotPassword = !this.forgotPassword;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.isSending = true;
    const subscription = this.authService.login(this.form.value, this.targetPath).subscribe(
      ok => console.log('Success? ' + ok),
      err => console.log(err),
      () => this.isSending = false
    );
    this.subscription.add(subscription);
  }

  public onSubmitForgotPassword(): void {
    if (this.forgotPassForm.invalid) {
      return;
    }
    this.isSending = true;
    const subscription = this.authService.forgotPassword({type: 'email', email: this.forgotPassForm.value.email})
      .subscribe(
        res => {
          this.userInterfaceService.success('Un nouveau mot de passe vient de vous être envoyer par email');
          this.forgotPassword = false;
        },
        err => this.userInterfaceService.error(`Echec. Vérifiez vos identifiants ou contactez nous`),
        () => this.isSending = false
      );
    this.subscription.add(subscription);
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private createForgotPassForm(): void {
    this.forgotPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

}
