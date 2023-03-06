import { useRouter } from "next/router";
import prisma from "../../lib/prisma";

export async function getStaticPaths() {
  const staticPaths = [{ params: { rid: "1" } }, { params: { rid: "2" } }];
  return {
    paths: staticPaths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const auctions = await prisma.auction.findMany({
    where: {
      itemId: 171379,
    },
  });

  return {
    // Passed to the page component as props
    props: {
      auctions: auctions.map((auction) => ({
        id: auction.id,
        itemId: auction.itemId,
        quantity: auction.quantity,
        buyout: Number(auction.buyout),
      })),
    },
  };
}

export default function Recipe({ auctions }) {
  const router = useRouter();
  const { rid } = router.query;
  console.log(auctions);
  return <p>Recipe: {rid}</p>;
}
