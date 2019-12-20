import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'landing',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  constructor(private _fb: FormBuilder) {}

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
    // console.log('form', this.loginFormGroup.get('password').hasError('required'));
    console.log('form', this.loginFormGroup.get('password').hasError('require'));
    console.log('all', this.loginFormGroup);
  }
}