import {ActiveRecord} from '../active-record.class';
import {SexService} from '../../services/components/user-options/sex.service';

export class Sex extends ActiveRecord {
  protected provider = SexService;

  public id: number;
  public name: string;

  protected fields() {
    return [
      'id',
      'name',
    ];
  }
}
