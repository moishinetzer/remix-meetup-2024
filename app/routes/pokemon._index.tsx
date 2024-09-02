import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Pokemon, POKEMON_API_URL } from "scripts/api";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const page = url.searchParams.has("page")
    ? Number(url.searchParams.get("page"))
    : 1;

  const pokemon = (await fetch(
    POKEMON_API_URL + "/pokemon" + `?page=${page}`
  ).then((res) => res.json())) as Pokemon[];

  return { pokemon, page };
}

export default function AllPokemon() {
  const { pokemon, page } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-center p-8 text-yellow-500 text-4xl">PokèCRApp</h1>

      <div className="flex text-center justify-center items-center gap-8">
        <Link
          to={`/pokemon?page=${Math.max(page - 1, 1)}`}
          className="bg-cyan-700 text-cyan-100 p-2 rounded-xl border border-cyan-200 w-36"
        >
          Previous
        </Link>
        <Link
          to={`/pokemon?page=${page + 1}`}
          className="bg-cyan-700 text-cyan-100 p-2 rounded-xl border border-cyan-200 w-36"
        >
          Next
        </Link>
      </div>

      <ul className="flex flex-wrap p-8 gap-8 justify-center items-center">
        {pokemon.map((p) => (
          <li
            key={p.id}
            className="relative bg-cyan-800 rounded-xl p-8 text-center"
          >
            <span
              className="absolute top-2 right-2 text-2xl"
              style={{ color: p.favourite ? "yellow" : "white" }}
            >
              ★
            </span>

            <img src={p.image} alt={p.name} className="w-64 aspect-square" />
            <h2 className="text-5xl">{p.name}</h2>

            <div className="mt-8" />

            <Link
              className="py-2 px-8 border-2 border-cyan-100 rounded-xl text-lg"
              to={`/pokemon/${p.id}`}
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
