import { useState, useEffect } from "react";
import { type Pokemon, POKEMON_API_URL } from "scripts/api";

export default function AllPokemon({
  setSelectedPokemon,
}: {
  setSelectedPokemon: (p: Pokemon) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [allPokemon, setAllPokemon] = useState<Pokemon[] | null>(null);

  const [page, setPage] = useState(1);

  async function fetchPokemon(page: number) {
    const pokemon = await fetch(
      POKEMON_API_URL + "/pokemon" + `?page=${page}`
    ).then((res) => res.json());
    setAllPokemon(pokemon);
    setLoading(false);
  }

  useEffect(() => {
    fetchPokemon(page);
  }, [page]);

  if (loading || !allPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-center p-8 text-yellow-500 text-4xl">PokèCRApp</h1>

      <div className="flex justify-center items-center gap-8">
        <button
          onClick={() => {
            setPage((page) => Math.max(page - 1, 1));
          }}
          className="bg-cyan-700 text-center text-cyan-100 p-2 rounded-xl border border-cyan-200 w-36"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((page) => page + 1)}
          className="bg-cyan-700 text-center text-cyan-100 p-2 rounded-xl border border-cyan-200 w-36"
        >
          Next
        </button>
      </div>

      <ul className="flex flex-wrap p-8 gap-8 justify-center items-center">
        {allPokemon.map((pokemon) => (
          <li
            key={pokemon.id}
            className="relative bg-cyan-800 rounded-xl p-8 text-center"
          >
            <span
              className="absolute top-2 right-2 text-2xl"
              style={{ color: pokemon.favourite ? "yellow" : "white" }}
            >
              ★
            </span>

            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-64 aspect-square"
            />
            <h2 className="text-5xl">{pokemon.name}</h2>
            <div className="mt-8" />

            <button
              className="py-2 px-8 border-2 border-cyan-100 rounded-xl text-lg"
              onClick={() => setSelectedPokemon(pokemon)}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
