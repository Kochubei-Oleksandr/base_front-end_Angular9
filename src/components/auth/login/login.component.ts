import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isRequestComplete: boolean = true;
  public loginFormGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm(): void {
    this.loginFormGroup = this._fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  submit() {
    this.isRequestComplete = false;
    this._authService.login(this.loginFormGroup.value).subscribe(
      () => {
        this._dialog.closeAll();
        this.isRequestComplete = true;
      },
      () => {
        this.isRequestComplete = true;
      }
    );
  }
}