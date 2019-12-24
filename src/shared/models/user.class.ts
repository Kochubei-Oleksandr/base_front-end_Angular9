import { ActiveRecord } from './active-record.class';
import { UserService } from '../services/user.service';

export class User extends ActiveRecord {
  protected provider = UserService;

  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public usage_policy: boolean;
  public language: string;
  public mobile: string;
  public delivery_address: string;
  public age: number;
  public city_id: number;
  public sex_id: number;
  public goal_id: number;
  public lifestyle_id: number;

  protected fields() {
    return [
      'id',
      'name',
      'email',
      'password',
      'usage_policy',
      'language',
      'mobile',
      'description',
      'delivery_address',
      'age',
      'city_id',
      'sex_id',
      'goal_id',
      'lifestyle_id',
    ];
  }
}
