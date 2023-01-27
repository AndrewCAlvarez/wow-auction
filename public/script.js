function getRealmIndex() {
  fetch("http://127.0.0.1:3000/api/realm-index")
    .then((response) => response.json())
    .then((realmIndex) => {
      console.log(realmIndex);
      realmIndex.realms.forEach((realm) => {
        console.log(realm.name);
      });
    });
}

function createRealmList() {
  const realmData = getRealmList();
  console.log(realmData);
}

createRealmList();
