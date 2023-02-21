import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";

// pages/p/[id].tsx
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  console.log(post);
  return {
    props: post,
  };
};

export default function Post(post) {
  console.log(post);
  return (
    <ul>
      <li>{post.title}</li>
      <li>Author: {post.author.name}</li>
      <li>{post.content}</li>
    </ul>
  );
}
