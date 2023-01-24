function getRealmList() {
  fetch("http://127.0.0.1:3000/api/realm-list")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function createRealmList() {
  const realmData = getRealmList();
  console.log(realmData);
}

createRealmList();
