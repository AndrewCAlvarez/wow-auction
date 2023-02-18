import { miningItems } from "./miningItems";

// export function getAllItemIds() {
//   const params = miningItems.map((item) => {
//     return {
//       params: { id: item.id },
//     };
//   });
//   console.log(params);
//   return params;
// }

// export function getItemData(id) {
//   const itemData = { name: "testing" };

//   return {
//     id,
//     ...itemData,
//   };
// }

export async function getItemById(accessToken, itemId) {
  // I don't know why but the namespace is different for items. Static is used instead.
  const url = `https://${process.env.HOST_NAME}/data/wow/item/${itemId}?${process.env.NAMESPACE_STATIC}&access_token=${accessToken}`;
  try {
    let item;

    await fetch(url)
      .then((response) => response.json())
      .then((itemData) => {
        console.log(itemData);
        item = itemData;
      });

    return item;
  } catch (error) {
    console.error(error);
  }
}

export async function getItemMedia(accessToken, itemId) {
  // https://us.api.blizzard.com/data/wow/media/item/19019?namespace=static-us&locale=en_US&access_token=US9BXh300LGvJx4hGvFB5sff6oqixxsKey
  const url = `https://${process.env.HOST_NAME}/data/wow/media/item/${itemId}?${process.env.NAMESPACE_STATIC}&access_token=${accessToken}`;
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
