import { Component, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
import { IEmail } from 'src/app/models/mail';
import { Subscription } from 'rxjs';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnDestroy {
  public isLoggedIn = false;
  public form: FormGroup;
  public isSending = false;
  private subscription = new Subscription();
  private currentUser: IUser;

  constructor(
    private mailService: MailService,
    private fb: FormBuilder,
    private userInterfaceService: UserInterfaceService,
    private authService: AuthService,
    protected formDirective: FormGroupDirective
    ) {
      this.createForm();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSubmit(form: FormGroup, formDirective: FormGroupDirective): void {
    if (this.form.invalid) {
      return;
    }

    this.isSending = true;
    const email: IEmail = {
      from: environment.fromEmail,
      to: environment.toEmail,
      subject: `Message de ${this.form.value.name.toUpperCase()} à partir du site web`,
      html: `
        <strong>Nom du contact: </strong> <span>${this.form.value.name}</span>
        <br>
        <strong>Adresse email du contact: </strong> <span>${this.form.value.email}</span>
        <br>
        <strong>Message: </strong>
        <p>${this.form.value.message}</p>
      `
    };

    const subscription = this.mailService.send(email).subscribe(
      () => this.userInterfaceService.success(`Message envoyé! Nous vous reviendrons dès que possible`),
      (error) => this.userInterfaceService.error(`Ooops, le message n'a pas pu être envoyé...
        veuiilez essayer d'utiliser notre adresse email ci-dessus, merci!`),
      () => {
        formDirective.resetForm();
        form.reset();
        this.isSending = false;
      }
    );
    this.subscription.add(subscription);
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
    this.setCurrentUser();
  }

  private setCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.isLoggedIn = !!this.currentUser;
    if (this.isLoggedIn) {
      this.formValues();
    }
  }

  private formValues(): void {
    this.form.get('name').setValue(this.currentUser.username);
    this.form.get('email').setValue(this.currentUser.email);
  }

}
