import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServerValidationFormService} from '../../shared/services/server-validation-form.service';
import {CountryService} from '../../shared/services/components/location/country.service';
import {RegionService} from '../../shared/services/components/location/region.service';
import {CityService} from '../../shared/services/components/location/city.service';
import {UserService} from '../../shared/services/components/user.service';
import {AuthService} from '../../shared/services/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../shared/models/user.class';

@Component({
  selector: 'personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
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
    this.getCountries();
    this.getUserData();
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
  getRegions(id: number): void {
    this._regionService.get({'country_id': id}).subscribe((res) => {
      this.regions = res;
    });
  }
  getCities(id: number): void {
    this._cityService.get({'region_id': id}).subscribe((res) => {
      this.cities = res;
    });
  }
  getUserData(): void {
    this._userService.view().subscribe((res: User) => {
      this.getLocationsForUserData(res);
    });
  }
  getLocationsForUserData(userData: User) {
    if (userData.country_id) {
      this._regionService.get({'country_id': userData.country_id}).subscribe((res) => {
        this.regions = res;

        this._cityService.get({'region_id': userData.region_id}).subscribe((res) => {
          this.cities = res;
          this.updateUserData(userData);
        });
      });
    } else {
      this.updateUserData(userData);
    }
  }
  updateUserData(userData): void {
    this.personalForm.patchValue(userData);
  }
  onCountrySelected(item): void {
    this.regions = [];
    this.cities = [];
    this.personalForm.controls['region_id'].setValue('');
    this.personalForm.controls['city_id'].setValue('');

    this.getRegions(item.option.value);
  }
  onRegionSelected(item): void {
    this.cities = [];
    this.personalForm.controls['city_id'].setValue('');

    this.getCities(item.option.value);
  }
  isCountrySelected(): boolean {
    return this.personalForm.get('country_id').value !== '';
  }
  isRegionSelected(): boolean {
    return this.personalForm.get('region_id').value !== '';
  }
  isCitySelected(): boolean {
    return this.personalForm.get('city_id').value !== '';
  }
  getCountryName(id: number): string {
    if (!id) return '';

    let index = this.countries.findIndex(item => item.id === id);
    return this.countries[index].name;
  }
  getRegionName(id: number): string {
    if (!id) return '';

    let index = this.regions.findIndex(item => item.id === id);
    return this.regions[index].name;
  }
  getCityName(id: number): string {
    if (!id) return '';

    let index = this.cities.findIndex(item => item.id === id);
    return this.cities[index].name;
  }
  logout(): void {
    if (confirm(
      this._translateService.instant('Are you sure you want to go out?')
    )) {
      this._authService.backendLogout();
    }
  }
  isRequestComplete(): boolean {
    return this._userService.getRequestStatus()
      && this._countryService.getRequestStatus()
      && this._regionService.getRequestStatus()
      && this._cityService.getRequestStatus();
  }
  saveUserData(): void {
    this._userService.update(this.personalForm.get('id').value, this.personalForm.value).subscribe();
  }
}
