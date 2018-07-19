import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  stateSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<any>) {
  }

  ngOnInit(): void {
    this.stateSub = this.store.pipe(select('user')).subscribe(user => {
      if (user) {
        this.maskUserName = user.maskUserName;
      }
    });
  }

  ngOnDestroy(): void {
    this.stateSub.unsubscribe();
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_MASK_USERNAME',
      value: value
    });
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
