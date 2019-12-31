import {ActiveRecord} from '../active-record.class';
import {CityService} from '../../services/components/location/city.service';

export class City extends ActiveRecord {
  protected provider = CityService;

  public id: number;
  public name: string;

  protected fields() {
    return [
      'id',
      'name',
    ];
  }
}
