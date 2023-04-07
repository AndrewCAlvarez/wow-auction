import React, { useEffect, useState } from "react";

export default function InformationPanel(props: any) {
  const [sortPreference, setSortPreference] = useState({ icon: "min" });
  const [sortedAuctions, setSortedAuctions] = useState([]);

  // function formatBuyoutToCoins(amount: number) {
  //   let formattedAmount = amount / 1000;
  //   return formattedAmount;
  // }

  // // CompareSortMin/Max are used for array.sort()
  // function compareSortMin(a: any, b: any) {
  //   if (a.buyout < b.buyout) return -1;
  //   if (a.buyout === b.buyout) return 0;
  //   if (a.buyout > b.buyout) return 1;
  // }

  // function compareSortMax(a: any, b: any) {
  //   if (a.buyout < b.buyout) return 1;
  //   if (a.buyout === b.buyout) return 0;
  //   if (a.buyout > b.buyout) return -1;
  // }

  // function getAuctionsByRecipe() {
  //   console.log(props.auctions);
  //   let recipeAuctions = props.auctions.filter(
  //     (auction: any) => auction.itemId === props.selectedRecipe.itemId
  //   );
  //   recipeAuctions.sort(compareSortMin);
  //   return recipeAuctions;
  // }

  // function changeSortPreference() {
  //   if (sortPreference.icon === "min") {
  //     setSortPreference({ icon: "max" });
  //     setSortedAuctions(sortedAuctions.sort(compareSortMax));
  //     console.log(sortedAuctions); // add this to check if the array is sorted correctly
  //   }
  //   if (sortPreference.icon === "max") {
  //     setSortPreference({ icon: "min" });
  //     setSortedAuctions(sortedAuctions.sort(compareSortMin));
  //     console.log(sortedAuctions); // add this to check if the array is sorted correctly
  //   }
  // }

  // useEffect(() => {
  //   if (props.selectedRecipe) {
  //     setSortedAuctions(getAuctionsByRecipe());
  //     // setSortedAuctions(sortedAuctions.sort(compareSortMin));
  //   }
  // }, [props.selectedRecipe]);

  return (
    <main>
      <p>{props.selectedRecipe.name}</p>
      {/* <button onClick={changeSortPreference}>{sortPreference.icon}</button> */}
      <ul>
        {/* {sortedAuctions.length > 0 ? (
          sortedAuctions.map((auction: any) => (
            <li key={auction.id}>
              buyout: {formatBuyoutToCoins(auction.buyout)}g
            </li>
          ))
        ) : (
          <li>No auctions available</li>
        )} */}
      </ul>
    </main>
  );
}
