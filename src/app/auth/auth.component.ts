import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  public hide = true;
  public form: FormGroup;
  public targetPath: string;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.subscription.add(
      this.activatedRoute.params.subscribe(params => this.targetPath = params.target)
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSubmit(): void {
    this.authService.login(this.form.value).subscribe(
      resp => console.log(resp)
    )
  }

}
