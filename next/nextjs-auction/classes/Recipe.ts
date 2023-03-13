export class Recipe {
  name: string;
  key: { href: string };

  constructor(name: string, href: string) {
    this.name = name;
    this.key = { href: href };
  }
}
