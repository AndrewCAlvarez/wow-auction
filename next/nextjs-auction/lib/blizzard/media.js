import { getAccessToken } from "../data-retrieval";

export async function getItemMedia(itemId) {
  // https://us.api.blizzard.com/data/wow/media/item/19019?namespace=static-us&locale=en_US&access_token=US9BXh300LGvJx4hGvFB5sff6oqixxsKey

  let accessToken = await getAccessToken();

  const url = `https://${process.env.HOST_NAME}/data/wow/media/item/${itemId}?${process.env.NAMESPACE_STATIC}&access_token=${accessToken.access_token}`;
  let media;
  try {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        media = data;
      });
  } catch (error) {
    console.error(error);
  }
  return media;
}
