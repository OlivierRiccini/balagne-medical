import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  public form: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', []],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public onSubmit(): void {
    this.authService.login(this.form.value).subscribe(
      resp => console.log(resp)
    );
  }

}
