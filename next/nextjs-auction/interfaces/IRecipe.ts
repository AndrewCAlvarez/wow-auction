export interface Recipe {
  _links: {
    self: {
      href: string;
    };
  };
  id: number;
  name: string;
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
  modified_crafting_slots: {
    slot_type: {
      key: {
        href: string;
      };
      name: string;
      id: number;
    };
    display_order: number;
  }[];
}
