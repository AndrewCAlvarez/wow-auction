async function getConnectedRealmIndex() {
  // console.log("FETCHING CONNECTED REALM INDEX FROM NODEJS APPLICATION");
  // const connectedRealmIndexURL = `http://127.0.0.1:3000/api/connected-realm/index`;
  // let realmList;
  // await fetch(connectedRealmIndexURL)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     realmList = data;
  //   });

  // return realmList;
  return state.connectedRealmData;
}

async function getRealmIndex() {
  const url = "http://127.0.0.1:3000/api/realm-index";
  await fetch(url)
    .then((response) => response.json())
    .then((realmIndex) => {
      console.log(realmIndex);
      let realmIndexArray = [];
      realmIndex.realms.forEach((realm) => {
        let realmData = {
          name: realm.name,
          id: realm.id,
        };
        realmIndexArray.push(realmData);
      });
      console.log(realmIndexArray);

      realmIndexArray.forEach((realm) => {
        // console.log(realm.name);
        // Create dropdown list to select realm by name
        console.log(!document.querySelector(`#realm${realm.id}`));
        if (!document.querySelector(`#realm${realm.id}`)) {
          let realmIndexSelectElement =
            document.querySelector(".realmIndexSelect");
          let realmIndexOptionElement = document.createElement("option");
          realmIndexOptionElement.id = "realm" + realm.id;
          realmIndexOptionElement.value = realm.id;
          realmIndexOptionElement.textContent = realm.name;
          realmIndexSelectElement.appendChild(realmIndexOptionElement);
        }
      });
    });
}
