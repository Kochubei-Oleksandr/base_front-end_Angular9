import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/components/user.service';
import {AuthService} from '../../shared/services/auth/auth.service';
import {ServerValidationFormService} from '../../shared/services/server-validation-form.service';
import {User} from '../../shared/models/user.class';
import {SexService} from '../../shared/services/components/user-options/sex.service';
import {GoalService} from '../../shared/services/components/user-options/goal.service';
import {LifestyleService} from '../../shared/services/components/user-options/lifestyle.service';
import {Sex} from '../../shared/models/user-options/sex.class';
import {TranslateService} from '@ngx-translate/core';
import {Lifestyle} from '../../shared/models/user-options/lifestyle.class';
import {Goal} from '../../shared/models/user-options/goal.class';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'calorie-calculator',
  templateUrl: './calorie-calculator.component.html',
  styleUrls: ['./calorie-calculator.component.scss']
})
export class CalorieCalculatorComponent implements OnInit {
  public calculatorForm: FormGroup;
  public goals: Goal[] = [];
  public sexes: Sex[] = [];
  public lifestyles: Lifestyle[] = [];
  public maxAge = 150;
  public maxWeight = 300;
  public maxHeight = 300;
  public minValue = 1;

  constructor(
    private _fb: FormBuilder,
    private _sexService: SexService,
    private _goalService: GoalService,
    private _lifestyleService: LifestyleService,
    private _userService: UserService,
    private _authService: AuthService,
    private _translateService: TranslateService,
    public serverValidationForm: ServerValidationFormService
  ) { }

  ngOnInit() {
    this.createCalculatorForm();
    this.getSexes();
    this.getGoals();
    this.getLifestyles();
    this.getUserData();
    this._translateService.onLangChange.subscribe(() => {
      this.getSexes();
      this.getGoals();
      this.getLifestyles();
    });
    this.calculatorForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged((oldValue, newValue) => JSON.stringify(oldValue) === JSON.stringify(newValue))
    ).subscribe(formData => {
      console.log('TODO - отправка и обработка ответа', formData);
    })
  }
  createCalculatorForm(): void {
    this.calculatorForm = this._fb.group({
      goal_id: [this.minValue, [Validators.required]],
      sex_id: [this.minValue, [Validators.required]],
      lifestyle_id: [this.minValue, [Validators.required]],
      age: [18, [Validators.required, Validators.min(this.minValue), Validators.max(this.maxAge)]],
      height: [170, [Validators.required,  Validators.min(this.minValue), Validators.max(this.maxHeight)]],
      weight: [50, [Validators.required,  Validators.min(this.minValue), Validators.max(this.maxWeight)]],
    });
  }
  getSexes() {
    this._sexService.get().subscribe((res) => {
      this.sexes = res;
      this.calculatorForm.controls['sex_id'].setValue(this.minValue);
    });
  }
  getGoals(): void {
    this._goalService.get().subscribe((res) => {
      this.goals = res;
      this.calculatorForm.controls['goal_id'].setValue(this.minValue);
    });
  }
  getLifestyles(): void {
    this._lifestyleService.get().subscribe((res) => {
      this.lifestyles = res;
      this.calculatorForm.controls['lifestyle_id'].setValue(this.minValue);
    });
  }
  getUserData(): void {
    this._userService.view().subscribe((res: User) => {
      this.calculatorForm.patchValue(res);
    });
  }
  getGoalName(id: number): string {
    if (!id) return '';

    let index = this.goals.findIndex(item => item.id === id);
    return this.goals.length !== 0 ? this.goals[index].name : '';
  }
  getSexName(id: number): string {
    if (!id) return '';

    let index = this.sexes.findIndex(item => item.id === id);
    return this.sexes.length !== 0 ? this.sexes[index].name : '';
  }
  getLifestyleName(id: number): string {
    if (!id) return '';

    let index = this.lifestyles.findIndex(item => item.id === id);
    return this.lifestyles.length !== 0 ? this.lifestyles[index].name : '';
  }
  isRequestComplete(): boolean {
    return this._userService.getRequestStatus()
      && this._sexService.getRequestStatus()
      && this._goalService.getRequestStatus()
      && this._lifestyleService.getRequestStatus();
  }
}
