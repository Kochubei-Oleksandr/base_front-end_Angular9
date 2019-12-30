import {ActiveRecord} from '../active-record.class';
import {RegionService} from '../../services/components/location/region.service';

export class Region extends ActiveRecord {
  protected provider = RegionService;

  public id: number;
  public name: string;

  protected fields() {
    return [
      'id',
      'name',
    ];
  }
}
