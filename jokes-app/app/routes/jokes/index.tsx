import React from "react";
import type { Joke } from "@prisma/client";
import { db } from "../../utils/db.server";
import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

type LoaderData = { randomJoke: Joke };
export const loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });
  const data: LoaderData = { randomJoke };
  return data;
};

export default function JokesIndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here&lsquo;s a random joke:</p>
      <p>{data.randomJoke.content}</p>
      <Link to={data.randomJoke.id}>
        &quot;{data.randomJoke.name}&quot; Permalink
      </Link>
    </div>
  );
}
