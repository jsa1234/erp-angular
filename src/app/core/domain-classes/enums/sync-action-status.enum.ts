export enum SyncActionStatus {
  AUTHENTICATED,
  PENDING,
  INPROGRESS,
  COMPLETED,
  FAILED,
}

export const SyncActionStatusText = {
  [SyncActionStatus.AUTHENTICATED]: 'Authenticated',
  [SyncActionStatus.PENDING]: 'Pending',
  [SyncActionStatus.INPROGRESS]: 'In Progress',
  [SyncActionStatus.COMPLETED]: 'Completed',
  [SyncActionStatus.FAILED]: 'Failed',
};
