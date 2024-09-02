export enum TableModule {
  MASTER,
  TRANSACTION,
  CONFIG,
}

export const TableModuleText = {
    [TableModule.MASTER]: 'Master',
    [TableModule.TRANSACTION]: 'Transaction',
    [TableModule.CONFIG]: 'Config',
  };