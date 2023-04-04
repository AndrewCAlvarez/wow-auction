import React, { useEffect, useState } from "react";

export default function InformationPanel(props: any) {
  const [sortPreference, setSortPreference] = useState({ icon: "min" });
  const [sortedAuctions, setSortedAuctions] = useState(props.auctions);

  function formatBuyoutToCoins(amount: number) {
    let formattedAmount = amount / 1000;
    return formattedAmount;
  }

  // CompareSortMin/Max are used for array.sort()
  function compareSortMin(a: any, b: any) {
    if (a.buyout < b.buyout) return -1;
    if (a.buyout === b.buyout) return 0;
    if (a.buyout > b.buyout) return 1;
  }

  function compareSortMax(a: any, b: any) {
    if (a.buyout < b.buyout) return 1;
    if (a.buyout === b.buyout) return 0;
    if (a.buyout > b.buyout) return -1;
  }

  function getAuctionsByRecipe() {
    let recipeAuctions = props.auctions.filter(
      (auction) => auction.itemId === props.selectedRecipe.itemId
    );
    recipeAuctions.sort(compareSortMin);
    return recipeAuctions;
  }
  getAuctionsByRecipe();

  function changeSortPreference() {
    sortPreference.icon === "min"
      ? setSortPreference({ icon: "max" })
      : setSortPreference({ icon: "min" });

    if (sortPreference.icon === "min") {
      setSortedAuctions(sortedAuctions.sort(compareSortMax));
    }
    if (sortPreference.icon === "max") {
      setSortedAuctions(sortedAuctions.sort(compareSortMin));
    }
  }

  useEffect(() => {
    setSortedAuctions(getAuctionsByRecipe().sort(compareSortMax));
  }, [sortedAuctions]);

  return (
    <main>
      <p>{props.selectedRecipe.name}</p>
      <button onClick={changeSortPreference}>{sortPreference.icon}</button>
      <ul>
        {sortedAuctions.map((auction: any) => {
          if (props.selectedRecipe === undefined) return <li>Empty</li>;
          if (auction.itemId === props.selectedRecipe.itemId) {
            return <li>buyout: {formatBuyoutToCoins(auction.buyout)}g</li>;
          }
        })}
      </ul>
    </main>
  );
}
