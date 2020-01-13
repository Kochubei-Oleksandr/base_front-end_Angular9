import { Injectable } from '@angular/core';
import {CrudService} from '../../crud.service';
import {Goal} from '../../../models/user-options/goal.class';

@Injectable({
  providedIn: 'root'
})
export class GoalService extends CrudService {
  protected namespace = 'goals';
  protected ModelClass = Goal;
}
