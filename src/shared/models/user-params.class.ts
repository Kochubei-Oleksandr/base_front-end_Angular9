import { ActiveRecord } from './active-record.class';
import {UserParamsService} from '../services/components/user-params.service';

export class UserParams extends ActiveRecord {
  protected provider = UserParamsService;

  public id: number;
  public age: number;
  public weight: number;
  public height: number;
  public goal_id: number;
  public sex_id: number;
  public lifestyle_id: number;


  protected fields() {
    return [
      'id',
      'age',
      'weight',
      'height',
      'goal_id',
      'sex_id',
      'lifestyle_id',
    ];
  }
}
