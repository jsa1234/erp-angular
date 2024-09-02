import { ColumnDisplaySettings } from "@core/domain-classes/column-display-settings";
import { ColumnVisibility } from "@core/domain-classes/column-visibility.interface";

export function UpdateTableColumnVisibility(tableColumns:ColumnDisplaySettings[],columnVisibility:ColumnVisibility):ColumnDisplaySettings[]{
     const updatedTableColumns:ColumnDisplaySettings[] = tableColumns.map(column => ({
    ...column,
    visibleTableColumns: columnVisibility[column.key] 
  }));

  return updatedTableColumns
}