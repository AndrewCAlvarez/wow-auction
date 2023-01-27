function getRealmList() {
  fetch("http://127.0.0.1:3000/api/realm-list")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.realms[0].name.en_US);
      data.realms.forEach((realm) => {
        console.log(realm.name.en_US);
        let para = document.createElement("p");
        para.textContent = realm.name.en_US;
        document.body.appendChild(para);
      });
    });
}

function createRealmList() {
  const realmData = getRealmList();
  console.log(realmData);
}

createRealmList();
