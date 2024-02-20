import { useEffect, useState } from "react";
import { POKEMON_API_URL, Pokemon } from "scripts/api";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [allPokemon, setAllPokemon] = useState<Pokemon[] | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      const pokemon = await fetch(POKEMON_API_URL + "/pokemon").then((res) =>
        res.json()
      );
      setAllPokemon(pokemon);
      setLoading(false);
    }

    fetchPokemon();
  }, []);

  useEffect(() => {
    document.title = "PokèCr-app";
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return selectedPokemon ? (
    <SelectedPokemon
      pokemon={selectedPokemon}
      clearSelectedPokemon={() => setSelectedPokemon(null)}
    />
  ) : (
    <AllPokemon setSelectedPokemon={setSelectedPokemon} pokemon={allPokemon!} />
  );
}

function AllPokemon({
  pokemon,
  setSelectedPokemon,
}: {
  pokemon: Pokemon[];
  setSelectedPokemon: (p: Pokemon) => void;
}) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to PokèCr-app</h1>
      <ul>
        {pokemon.map((p) => (
          <li key={p.id}>
            <img src={p.image} alt={p.name} style={{ width: "100px" }} />
            <h2>{p.name}</h2>
            <p>Favourite: {p.favourite ? "Yes" : "No"}</p>
            <button onClick={() => setSelectedPokemon(p)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// SelectedPokemon component (you can favorite a pokemon here)
function SelectedPokemon({
  pokemon,
  clearSelectedPokemon,
}: {
  pokemon: Pokemon;
  clearSelectedPokemon: () => void;
}) {
  const [favourite, setFavourite] = useState(pokemon.favourite);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to PokèCr-app</h1>
      <img src={pokemon.image} alt={pokemon.name} style={{ width: "100px" }} />
      <h2>{pokemon.name}</h2>
      <p>Type: {pokemon.type}</p>
      <p>Abilities: {pokemon.abilities.join(", ")}</p>
      <p>Stats:</p>
      <ul>
        <li>HP: {pokemon.stats.hp}</li>
        <li>Attack: {pokemon.stats.attack}</li>
        <li>Defense: {pokemon.stats.defense}</li>
        <li>Favourite: {favourite ? "Yes" : "No"}</li>
      </ul>
      <form method="post">
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();

            await fetch(POKEMON_API_URL + `/pokemon/${pokemon.id}/favourite`, {
              method: "POST",
            });
            setFavourite(!favourite);
          }}
        >
          Favourite Pokemon
        </button>
      </form>
      <button onClick={clearSelectedPokemon}>Back</button>
    </div>
  );
}
