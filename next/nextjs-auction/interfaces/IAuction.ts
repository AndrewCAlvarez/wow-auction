export interface Auction {
  id: number;
  item: {
    id: number;
    context: number;
    bonus_lists: [number];
    modifiers: [
      {
        type: number;
        value: number;
      },
      {
        type: number;
        value: number;
      }
    ];
  };
  buyout: number;
  quantity: number;
  time_left: string;
}
