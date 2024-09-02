export class InventorySource {
    id: number;
    name: string;
}

export const inventorySource: InventorySource[] = [
    {
        id: 0,
        name: 'Direct'
    }, {
        id: 1,
        name: 'Purchase Order'
    }, {
        id: 2,
        name: 'Sales Order'
    },
     {
      id: 3,
      name: 'Purchase Order Return'
    }, {
      id: 4,
      name: 'Sales Order Return'
  }
];