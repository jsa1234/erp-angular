export enum DeviceActivationStatus{
    PENDING,
    ACTIVATED,
    DEACTIVATED,
    READYFORACTIVATE,
    TRANSFER,
    FYPROCESSBLOCKED
}

export const DeviceActivationStatusText = {
    [DeviceActivationStatus.PENDING]: 'Pending',
    [DeviceActivationStatus.ACTIVATED]: 'Activated',
    [DeviceActivationStatus.DEACTIVATED]: 'Deactivated',
    [DeviceActivationStatus.READYFORACTIVATE]: 'ReadyForActivate',
    [DeviceActivationStatus.TRANSFER]: 'Transfer',
    [DeviceActivationStatus.FYPROCESSBLOCKED]: 'FY Process Blocked',
  };