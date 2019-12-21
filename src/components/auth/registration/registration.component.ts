import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {LINKS_FOR_DOCUMENTS} from '../../../shared/constants/links-for-documents.const';
import {PdfModalDialogComponent} from '../../../shared-components/pdf-modal-dialog/pdf-modal-dialog.component';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registerFormGroup: FormGroup;
  public privacyPDFSrc: string = LINKS_FOR_DOCUMENTS.privacyPDFSrc;
  public agreementPDFSrc: string = LINKS_FOR_DOCUMENTS.agreementPDFSrc;

  constructor(
    private _fb: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm(): void {
    this.registerFormGroup = this._fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
      usagePolicy: [false, [Validators.required]],
    }, {validator: [this.checkPasswords, this.checkUsagePolicy]});
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'];
    let confirmPass = group.controls['confirmPassword'];

    return pass.value === confirmPass.value
      ? confirmPass.setErrors(null)
      : confirmPass.setErrors({ notSame: true })
  }
  checkUsagePolicy(group: FormGroup) {
    let usagePolicy = group.controls['usagePolicy'];

    return usagePolicy.value
      ? usagePolicy.setErrors(null)
      : usagePolicy.setErrors({ notUsagePolicy: true })
  }
  openIframePDFDialog(linkToPdf) {
    let dialogRef = this.dialog.open(PdfModalDialogComponent, {
      width: '800px',
      height: '600px',
      data: {
        linkToPdf: linkToPdf,
      }
    });
    dialogRef.afterClosed().subscribe(() => {});
  }
  submit() {
    console.log('form', this.registerFormGroup.get('confirmPassword').hasError('notSame'));
    console.log('all', this.registerFormGroup);
  }
}