import { UserSystemFlag } from "./user-system-flags";

export class DeviceUser {
    id:           string;
    userName:     string;
    firstName:    string;
    lastName:     string;
    profilePhoto: string;
    deviceUUID:   string;
    branchUUID:   string;
    loginPin?:     string ='';
    userSystemFlags: UserSystemFlag[];
}