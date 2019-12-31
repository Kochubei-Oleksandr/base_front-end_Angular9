import {ActiveRecord} from '../active-record.class';
import {CountryService} from '../../services/components/location/country.service';

export class Country extends ActiveRecord {
  protected provider = CountryService;

  public id: number;
  public name: string;

  protected fields() {
    return [
      'id',
      'name',
    ];
  }
}
