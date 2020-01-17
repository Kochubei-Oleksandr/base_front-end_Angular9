import {ActiveRecord} from '../active-record.class';
import {LifestyleService} from '../../services/components/user-options/lifestyle.service';

export class Lifestyle extends ActiveRecord {
  protected provider = LifestyleService;

  public id: number;
  public name: string;

  protected fields() {
    return [
      'id',
      'name',
    ];
  }
}
