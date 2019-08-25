import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  public hide = true;
  public form: FormGroup;
  private subscription: Subscription = new Subscription();
  private previousUrl: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  public ngOnInit(): void {
    // this.previousUrl = this.router.routerState.snapshot.url;
    // console.log(this.previousUrl);
    // this.subscription.add(this.router.events
    //   .subscribe(event => {
    //     console.log(event)
    //     if (event instanceof NavigationStart) {
    //       this.previousUrl = event.url;
    //     }
    // }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSubmit(): void {
    this.authService.login(this.form.value).subscribe(
      resp => console.log(resp)
    )
    // console.log(this.form.value);
  }

}
