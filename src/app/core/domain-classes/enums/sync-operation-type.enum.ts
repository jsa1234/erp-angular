export enum SyncOperationType
{
    CREATE,
    UPDATE,
    DELETE,
    READ,
}


export const SyncOperationTypeText = {
    [SyncOperationType.CREATE]: 'Create',
    [SyncOperationType.DELETE]: 'Delete',
    [SyncOperationType.READ]: 'Read',
    [SyncOperationType.UPDATE]: 'Update',
  };