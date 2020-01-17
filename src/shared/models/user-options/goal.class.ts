import {ActiveRecord} from '../active-record.class';
import {GoalService} from '../../services/components/user-options/goal.service';

export class Goal extends ActiveRecord {
  protected provider = GoalService;

  public id: number;
  public name: string;

  protected fields() {
    return [
      'id',
      'name',
    ];
  }
}
