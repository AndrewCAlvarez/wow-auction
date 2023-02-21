// this file should be dedicated to getting a list of profession items
// and materials used to craft those items
// get recipes from skill tier with profession id + skill tier id
// Iterate through all recipes and add all unique items required to db
// Hard-code blacksmithing and dragonflight skill tier

// A skill tier is the id of a profession for a specific expansion.
export async function getSkillTiers(accessToken, professionId) {
  const url = `https://${process.env.HOST_NAME}/data/wow/profession/${professionId}?${process.env.NAMESPACE_STATIC}&access_token=${accessToken.access_token}`;

  try {
    let skillTiers;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        skillTiers = data;
      });

    return skillTiers;
  } catch (error) {
    console.error(error);
  }
}

// Skill tier recipes include all recipes for an expansion
export async function getSkillTier(accessToken, skillTierId, professionId) {
  // Blacksmithing id is 164
  const url = `https://${process.env.HOST_NAME}/data/wow/profession/${professionId}/skill-tier/${skillTierId}?${process.env.NAMESPACE_STATIC}&access_token=${accessToken.access_token}`;

  try {
    let skillTier;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        skillTier = data;
      });

    return skillTier;
  } catch (error) {
    console.error(error);
  }
}
