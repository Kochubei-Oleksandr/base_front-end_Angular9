import { Injectable } from '@angular/core';
import {CrudService} from '../../crud.service';
import {Lifestyle} from '../../../models/user-options/lifestyle.class';

@Injectable({
  providedIn: 'root'
})
export class LifestyleService extends CrudService {
  protected namespace = 'lifestyles';
  protected ModelClass = Lifestyle;
}
