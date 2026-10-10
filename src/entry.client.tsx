import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

// No <StrictMode>: the GSAP text-splitting effects mutate the DOM and are not
// safe to run twice, and the app has never been rendered under StrictMode.
startTransition(() => {
  hydrateRoot(document, <HydratedRouter />);
});
