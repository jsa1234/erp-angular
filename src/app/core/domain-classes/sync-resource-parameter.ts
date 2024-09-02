import { ResourceParameter } from "./resource-parameter";
export class SyncResourceParameter extends ResourceParameter {
  FromDate?:Date
  ToDate?:Date
  DeviceUUID?:string = ''
}
