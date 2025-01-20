import { Status } from './status.model';

export interface Component {
  id: number;
  name: string;
  description: string;
  statusResponse: Status;
}
