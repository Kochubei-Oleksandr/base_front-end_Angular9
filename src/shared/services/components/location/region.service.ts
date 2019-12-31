import { Injectable } from '@angular/core';
import {CrudService} from '../../crud.service';
import {Region} from '../../../models/location/region.class';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends CrudService {
  protected namespace = 'regions';
  protected ModelClass = Region;
}
