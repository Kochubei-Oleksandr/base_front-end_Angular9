import {Component, Input} from '@angular/core';
import {SERVICE_LANGUAGES} from '../../../shared/constants/service-languages.const';
import {LanguageService} from '../../../shared/services/language.service';

@Component({
  selector: 'language-switching',
  templateUrl: './language-switching.component.html',
  styleUrls: ['./language-switching.component.scss']
})
export class LanguageSwitchingComponent {
  @Input() classDecorator: string;
  public serviceLanguages = SERVICE_LANGUAGES;

  constructor (
    public languageService: LanguageService,
  ) {
  }

  setServiceLanguage(lang: string): void {
    this.languageService.currentLanguage = lang;
  }
}