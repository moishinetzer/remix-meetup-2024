import { redirect } from "@remix-run/node";
import { useEffect, useState } from "react";
import { type Pokemon } from "scripts/api";
import AllPokemon from "~/components/AllPokemon";
import SelectedPokemon from "~/components/SelectedPokeon";

export function loader() {
  return redirect("/pokemon");
}

export default function Index() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    document.title = "PokèCRApp";
  }, []);

  return selectedPokemon ? (
    <SelectedPokemon
      pokemon={selectedPokemon}
      clearSelectedPokemon={() => setSelectedPokemon(null)}
    />
  ) : (
    <AllPokemon setSelectedPokemon={setSelectedPokemon} />
  );
}
