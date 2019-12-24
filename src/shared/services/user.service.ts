import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { User } from '../models/user.class';


@Injectable()
export class UserService extends CrudService {
  protected namespace = 'users';
  protected namespaceSingular = 'user';
  protected ModelClass = User;
}
