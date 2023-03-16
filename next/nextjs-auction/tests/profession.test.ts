import { getProfessionIndex, testFunction } from "../lib/blizzard/profession";

test("gets a simple index of professions in WoW", async () => {
  const data = await getProfessionIndex();
  expect(data).toBe({ index: [] });
});
