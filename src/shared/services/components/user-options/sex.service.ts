import { Injectable } from '@angular/core';
import {CrudService} from '../../crud.service';
import {Sex} from '../../../models/user-options/sex.class';

@Injectable({
  providedIn: 'root'
})
export class SexService extends CrudService {
  protected namespace = 'sexes';
  protected ModelClass = Sex;
}
