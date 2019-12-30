import { Injectable } from '@angular/core';
import {CrudService} from '../../crud.service';
import {City} from '../../../models/location/city.class';

@Injectable({
  providedIn: 'root'
})
export class CityService extends CrudService {
  protected namespace = 'cities';
  protected ModelClass = City;
}
