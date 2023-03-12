export class Profession {
  id: number;
  name: string;
  // skillTiers: [
  //   {
  //     skillTier: {
  //       id: number;
  //       categories: [
  //         {
  //           name: string;
  //           recipes: [
  //             {
  //               name: string;
  //               key: { href: string };
  //             }
  //           ];
  //         }
  //       ];
  //     };
  //   }
  // ];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
