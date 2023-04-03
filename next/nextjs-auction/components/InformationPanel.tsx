import React from "react";

export default function InformationPanel(props: any) {
  function formatBuyoutToCoins(amount: number) {
    let formattedAmount = amount / 1000;
    return formattedAmount;
  }

  return (
    <main>
      <p>{props.selectedRecipe.name}</p>
      {props.auctions.map((auction: any) => {
        if (props.selectedRecipe === undefined) return <li>Empty</li>;
        if (auction.itemId === props.selectedRecipe.itemId) {
          return (
            <ul>
              <li>buyout: {formatBuyoutToCoins(auction.buyout)}g</li>
            </ul>
          );
        }
      })}
    </main>
  );
}
