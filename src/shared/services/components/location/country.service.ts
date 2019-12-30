import { Injectable } from '@angular/core';
import {CrudService} from '../../crud.service';
import {Country} from '../../../models/location/country.class';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends CrudService {
  protected namespace = 'countries';
  protected ModelClass = Country;
}
