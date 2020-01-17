import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import {UserParams} from '../../models/user-params.class';

@Injectable({
  providedIn: 'root'
})
export class UserParamsService extends CrudService {
  protected namespace = 'user-params';
  protected namespaceSingular = 'user-params';
  protected ModelClass = UserParams;
}
