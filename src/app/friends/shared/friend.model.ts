
import GeoPoint = firestore.GeoPoint;
import {firestore} from 'firebase';

export interface Friend {
  id?: string;
  name: string;
  picture?: string;
  address: string;
  mail: string;
  phone: string;
  location?: GeoPoint;
  url?: string;
}
