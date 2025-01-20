import { Device } from './device.model';
import { Status } from './status.model';

export interface Maintenance {
  id: number;
  name: string;
  description: string;
  deviceResponse: Device;
  statusResponse: Status;
}
