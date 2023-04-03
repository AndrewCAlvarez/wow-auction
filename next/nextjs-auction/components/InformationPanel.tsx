import React from "react";

export default function InformationPanel(props: any) {
  return (
    <main>
      {props.auctions.map((auction: any) => {
        if (props.selectedRecipe === undefined) return <li>Empty</li>;
        if (auction.itemId === props.selectedRecipe.itemId) {
          return (
            <li>
              {props.selectedRecipe.name} buyout: {auction.buyout}
            </li>
          );
        }
      })}
    </main>
  );
}
