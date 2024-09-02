import { POSDevice } from "./pos-device.interface";


export interface DevicePOSDevice{
    devicePOSPaymentDeviceUUID?: string;
    posDeviceUUID?:              string;
    deviceUUID?:                 string;
    isDefaultPOSDevice?:         boolean;
    posDevice?:                  POSDevice;
}