// export interface Profession {
//   id: number;
//   name: string;
//   key: { href: string };
//   skillTiers: [
//     {
//       skillTier: {
//         id: number;
//         categories: [
//           {
//             name: string;
//             recipes: [
//               {
//                 name: string;
//                 key: { href: string };
//               }
//             ];
//           }
//         ];
//       };
//     }
//   ];
// }

export interface Profession {
  _links: {
    self: {
      href: string;
    };
  };
  id: number;
  name: string;
  description: string;
  type: {
    type: string;
    name: string;
  };
  media: {
    key: {
      href: string;
    };
    id: number;
  };
  skill_tiers: [
    {
      key: {
        href: string;
      };
      name: string;
      id: number;
    }
  ];
}
