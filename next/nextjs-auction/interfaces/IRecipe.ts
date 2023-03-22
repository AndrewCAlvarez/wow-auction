export interface Recipe {
  _links: {
    self: {
      href: string;
    };
  };
  id: number;
  itemId?: number;
  alliance_itemId?: number;
  horde_itemId?: number;
  name: string;
  professionId: number;
  skillTierId: number;
  skillTierName: string;
  category: string;
  media: {
    key: {
      href: string;
    };
    id: number;
  };
  reagents: {
    reagent: {
      key: {
        href: string;
      };
      name: string;
      id: number;
    };
    quantity: number;
  }[];
  modified_crafting_slots?: {
    slot_type: {
      key: {
        href: string;
      };
      name: string;
      id: number;
    };
    display_order: number;
  }[];
  crafted_item?: {
    key: {
      href: string;
    };
    name: string;
    id: number;
  };
  alliance_crafted_item?: {
    key: {
      href: string;
    };
    name: string;
    id: number;
  };
  horde_crafted_item?: {
    key: {
      href: string;
    };
    name: string;
    id: number;
  };
}
