import { Hono } from "hono";
import { cors } from "hono/cors";

// Pokemon API
export type Pokemon = {
  id: number;
  favourite: boolean;
  name: string;
  image: string;
  type: string;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
};

const ALL_POKEMON: Pokemon[] = [
  {
    id: 1,
    favourite: false,
    name: "Bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    type: "grass",
    abilities: ["overgrow", "chlorophyll"],
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
    },
  },
  {
    id: 2,
    favourite: false,
    name: "Ivysaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    type: "grass",
    abilities: ["overgrow", "chlorophyll"],
    stats: {
      hp: 60,
      attack: 62,
      defense: 63,
    },
  },
  // 3-10:
  {
    id: 3,
    favourite: false,
    name: "Venusaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    type: "grass",
    abilities: ["overgrow", "chlorophyll"],
    stats: {
      hp: 80,
      attack: 82,
      defense: 83,
    },
  },
  {
    id: 4,
    favourite: false,
    name: "Charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    type: "fire",
    abilities: ["blaze", "solar-power"],
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
    },
  },
  {
    id: 5,
    favourite: false,
    name: "Charmeleon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    type: "fire",
    abilities: ["blaze", "solar-power"],
    stats: {
      hp: 58,
      attack: 64,
      defense: 58,
    },
  },
  {
    id: 6,
    favourite: false,
    name: "Charizard",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    type: "fire",
    abilities: ["blaze", "solar-power"],
    stats: {
      hp: 78,
      attack: 84,
      defense: 78,
    },
  },
  {
    id: 7,
    favourite: false,
    name: "Squirtle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    type: "water",
    abilities: ["torrent", "rain-dish"],
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
    },
  },
  {
    id: 8,
    favourite: false,
    name: "Wartortle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    type: "water",
    abilities: ["torrent", "rain-dish"],
    stats: {
      hp: 59,
      attack: 63,
      defense: 80,
    },
  },
  {
    id: 9,
    favourite: false,
    name: "Blastoise",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    type: "water",
    abilities: ["torrent", "rain-dish"],
    stats: {
      hp: 79,
      attack: 83,
      defense: 100,
    },
  },
  {
    id: 10,
    favourite: false,
    name: "Caterpie",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
    type: "bug",
    abilities: ["shield-dust", "run-away"],
    stats: {
      hp: 45,
      attack: 30,
      defense: 35,
    },
  },
];

const app = new Hono();

// disable cors
app.use(
  cors({
    origin: "*",
  })
);

app.all("*", (c, next) => {
  // Just console log the request
  console.log(c.req.method, c.req.url);
  return next();
});

// app.get /pokemons (should be paginable with just page)
// (Get params from the c.req.url)
app.get("/pokemon", (c) => {
  const { page } = c.req.query();

  if (!page) {
    return c.json(ALL_POKEMON.slice(0, 3));
  }

  const pokemons = ALL_POKEMON.slice((Number(page) - 1) * 3, Number(page) * 3);

  return c.json(pokemons);
});

// app.get /pokemons/:id
app.get("/pokemon/:id", (c) => {
  const { id } = c.req.param();
  const pokemon = ALL_POKEMON.find((p) => p.id === Number(id));

  if (!pokemon) {
    return c.json({ error: "Pokemon not found" }, 404);
  }

  return c.json(pokemon);
});

// app.post /pokemons/:id/favourite
app.post("/pokemon/:id/favourite", (c) => {
  const { id } = c.req.param();
  const pokemon = ALL_POKEMON.find((p) => p.id === Number(id));

  if (!pokemon) {
    return c.json({ error: "Pokemon not found" }, 404);
  }

  pokemon.favourite = !pokemon.favourite;

  return c.json(pokemon);
});

console.log(`API is running on http://localhost:3001`);

export const POKEMON_API_URL = "http://localhost:3001";

export default {
  ...app,
  port: 3001,
};
