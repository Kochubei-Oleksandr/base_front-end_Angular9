import { ActiveRecord } from './active-record.class';
import { UserService } from '../services/components/user.service';

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
  public sex_id: number;
  public goal_id: number;
  public lifestyle_id: number;

  //calculated & modified parameters that are not in the database
  public city_id: object;
  public region_id: object;
  public country_id: object;


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
      'sex_id',
      'goal_id',
      'lifestyle_id',

      'city_id',
      'region_id',
      'country_id'
    ];
  }
}
