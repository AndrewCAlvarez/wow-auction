import { useRouter } from "next/router";

export default function Item() {
  const router = useRouter();
  const id = router.query.id;
  console.log(router.query.id);
  return <p>Item: {id}</p>;
}
