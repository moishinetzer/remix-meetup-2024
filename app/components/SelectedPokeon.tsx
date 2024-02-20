import { useState } from "react";
import { Pokemon, POKEMON_API_URL } from "scripts/api";

export default function SelectedPokemon({
  pokemon,
  clearSelectedPokemon,
}: {
  pokemon: Pokemon;
  clearSelectedPokemon: () => void;
}) {
  const [favourite, setFavourite] = useState(pokemon.favourite);

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
                <span className="font-bold">{favourite ? "Yes" : "No"}</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={clearSelectedPokemon}
          className="mt-8 py-2 px-8 border-2 border-cyan-100 rounded-xl text-lg absolute top-2 left-8"
        >
          Back
        </button>

        <form method="post" className="absolute top-8 right-8">
          <button
            type="submit"
            onClick={async (e) => {
              e.preventDefault();

              await fetch(
                POKEMON_API_URL + `/pokemon/${pokemon.id}/favourite`,
                {
                  method: "POST",
                }
              );
              setFavourite(!favourite);
            }}
          >
            <span
              className="text-5xl"
              style={{ color: favourite ? "yellow" : "white" }}
            >
              ★
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
