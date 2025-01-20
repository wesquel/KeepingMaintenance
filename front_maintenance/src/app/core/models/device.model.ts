import { DeviceType } from './device-type.model';
import { Component } from './component.model';

export interface Device {
  id: number;
  name: string;
  description: string;
  deviceTypeResponse: DeviceType;
  componentResponseList: Component[];
}
