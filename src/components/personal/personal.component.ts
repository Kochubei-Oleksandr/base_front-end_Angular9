import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServerValidationFormService} from '../../shared/services/server-validation-form.service';
import {CountryService} from '../../shared/services/components/location/country.service';
import {RegionService} from '../../shared/services/components/location/region.service';
import {CityService} from '../../shared/services/components/location/city.service';
import {UserService} from '../../shared/services/components/user.service';
import {AuthService} from '../../shared/services/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public isRequestComplete: boolean = true;
  public personalForm: FormGroup;
  public countries: any = [];
  public regions: any = [];
  public cities: any = [];

  constructor(
    private _fb: FormBuilder,
    private _countryService: CountryService,
    private _regionService: RegionService,
    private _cityService: CityService,
    private _userService: UserService,
    private _authService: AuthService,
    private _translateService: TranslateService,
    public serverValidationForm: ServerValidationFormService,
  ) { }

  ngOnInit() {
    this.createPersonalForm();
    this.getUserData();
    this.getCountries();
  }
  createPersonalForm(): void {
    this.personalForm = this._fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      mobile: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      region_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      delivery_address: [''],
    });
  }
  getCountries() {
    this._countryService.get().subscribe((res) => {
      this.countries = res;
    });
  }
  getRegions(item) {
    this.regions = [];
    this.cities = [];
    this.personalForm.controls['region_id'].setValue('');
    this.personalForm.controls['city_id'].setValue('');

    this._regionService.get({'country_id': item.option.value.id}).subscribe((res) => {
      this.regions = res;
    });
  }
  getCities(item) {
    this.cities = [];
    this.personalForm.controls['city_id'].setValue('');

    this._cityService.get({'region_id': item.option.value.id}).subscribe((res) => {
      this.cities = res;
    });
  }
  getUserData() {
    this._userService.view().subscribe((res) => {
      this.personalForm.patchValue(res);
    });
  }
  isShowRegion(): boolean {
    return this.regions.length !== 0 || this.personalForm.get('region_id').value !== '';
  }
  isShowCity(): boolean {
    return this.cities.length !== 0 || this.personalForm.get('city_id').value !== '';
  }
  isCitySelected(): boolean {
    return this.personalForm.get('city_id').value !== '';
  }
  displayFn(item): string {
    return item.name;
  }
  /**
   * @from {id: 1, name: 'test', city_id: {id: 2, name: 'cityName'}}
   * @to {id: 1, name: 'test', city_id: 2}
   * @return finished object to be sent to the server
   */
  extractIdFromFormObjects(): object {
    let obj = this.personalForm.value;
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        obj[key] = obj[key]['id'];
      }
    }
    return obj;
  }
  logout() {
    if (confirm(
      this._translateService.instant('Are you sure you want to go out?')
    )) {
      this._authService.doLogout();
    }
  }
  saveUserData() {
    this.extractIdFromFormObjects();
    this.isRequestComplete = false;

    this._userService.update(this.personalForm.get('id').value, this.personalForm.value).subscribe(
      (res) => {
        this.isRequestComplete = true;
      },
      () => {
        this.isRequestComplete = true;
      }
    );
  }
}
