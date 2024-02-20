# Pokèmon API Documentation

## Overview

The Pokemon API allows access to a collection of Pokemon data, including retrieval of Pokemon details, listing of Pokemon, and toggling their 'favourite' status.

## Base URL

`http://localhost:3001`

## Endpoints

### 1. List Pokemon

- **URL:** `/pokemon`
- **Method:** `GET`
- **Description:** Retrieves a paginated list of Pokemon. Optional `page` query for pagination (3 per page).

### 2. Get Pokemon Details

- **URL:** `/pokemon/:id`
- **Method:** `GET`
- **Description:** Fetches details of a specific Pokemon by ID.
- **URL Parameters:** `id` - ID of the Pokemon.

### 3. Toggle Favourite Status

- **URL:** `/pokemon/:id/favourite`
- **Method:** `POST`
- **Description:** Toggles the 'favourite' status of a specified Pokemon.
- **URL Parameters:** `id` - ID of the Pokemon to toggle.

## Data Model

### `Pokemon`

- `id`: number - Unique identifier.
- `favourite`: boolean - Favourite status.
- `name`: string - Name.
- `image`: string - Image URL.
- `type`: string - Type.
- `abilities`: string[] - Abilities.
- `stats`: Object - Contains `hp`, `attack`, `defense`.

<!-- # Welcome to Remix + Vite

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Development

```env
POKEMON_API_URL="http://localhost:3001"
```

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client` -->
