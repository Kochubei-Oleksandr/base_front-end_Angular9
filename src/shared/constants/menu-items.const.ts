import {IMenuItems} from '../interfaces/menu-items.interface';
import {ROUTING_NAMES} from './routing-names.const';

export const MENU_ITEMS: IMenuItems = {
  plans: {
    id: 1,
    url: ROUTING_NAMES.plans,
    name: 'Food plans',
    icon: 'restaurant',
    isActive: false,
  },
  history: {
    id: 2,
    url: ROUTING_NAMES.history,
    name: 'Orders history',
    icon: 'playlist_add_check',
    isActive: false,
  },
  diary: {
    id: 3,
    url: ROUTING_NAMES.diary,
    name: 'Diary',
    icon: 'book',
    isActive: false,
  },
  progress: {
    id: 4,
    url: ROUTING_NAMES.progress,
    name: 'Progress',
    icon: 'timeline',
    isActive: false,
  },
  personal: {
    id: 5,
    url: ROUTING_NAMES.personal,
    name: 'Personal',
    icon: 'person',
    isActive: false,
  },
};