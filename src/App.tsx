import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Index from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    Component() {
      return <Index />;
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
