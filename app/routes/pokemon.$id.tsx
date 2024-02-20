import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Pokemon, POKEMON_API_URL } from "scripts/api";

export async function loader({ params }: LoaderFunctionArgs) {
  const pokemon = (await fetch(POKEMON_API_URL + `/pokemon/${params.id}`).then(
    (res) => res.json()
  )) as Pokemon;

  console.log(pokemon);

  return { pokemon };
}

export async function action({ params }: LoaderFunctionArgs) {
  await fetch(POKEMON_API_URL + `/pokemon/${params.id}/favourite`, {
    method: "POST",
  });

  return null;
}

export default function SelectedPokemon() {
  const { pokemon } = useLoaderData<typeof loader>();

  return (
    <div className="text-center">
      <h1 className="text-center p-8 text-yellow-500 text-4xl">PokèCRApp</h1>

      <div className="relative p-16 rounded-3xl bg-cyan-800">
        <h2 className="text-6xl">{pokemon.name}</h2>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-56 mx-auto aspect-square"
        />

        <div className="p-6 mx-auto bg-cyan-700 rounded-xl shadow-md flex items-center space-x-4">
          <div className="mx-auto">
            <p className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {pokemon.type}
            </p>
            <p className="text-center mx-auto">
              {pokemon.abilities.map((ability, index) => (
                <span
                  key={index}
                  className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {ability}
                </span>
              ))}
            </p>
            <ul className="list-disc list-inside text-start mt-8">
              <p className="">Stats:</p>
              <li>
                HP: <span className="font-bold">{pokemon.stats.hp}</span>
              </li>
              <li>
                Attack:{" "}
                <span className="font-bold">{pokemon.stats.attack}</span>
              </li>
              <li>
                Defense:{" "}
                <span className="font-bold">{pokemon.stats.defense}</span>
              </li>
              <li>
                Favourite:{" "}
                <span className="font-bold">
                  {pokemon.favourite ? "Yes" : "No"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Link
          to="/pokemon"
          className="mt-8 py-2 px-8 border-2 border-cyan-100 rounded-xl text-lg absolute top-2 left-8"
        >
          Back
        </Link>

        <Form method="post" className="absolute top-8 right-8">
          <button type="submit">
            <span
              className="text-5xl"
              style={{ color: pokemon.favourite ? "yellow" : "white" }}
            >
              ★
            </span>
          </button>
        </Form>
      </div>
    </div>
  );
}
