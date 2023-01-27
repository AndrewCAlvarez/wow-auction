async function getRealmIndex() {
  const url = "http://127.0.0.1:3000/api/realm-index";
  await fetch(url)
    .then((response) => response.json())
    .then((realmIndex) => {
      console.log(realmIndex);
      realmIndex.realms.forEach((realm) => {
        console.log(realm.name);
      });
    });
}

async function getCommodities() {
  const url = "http://127.0.0.1:3000/api/commodities";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

async function getAuctions() {
  const url = "http://127.0.0.1:3000/api/auctions?realmid=54";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
