import { createContext } from "react";

const PortalContext = createContext({
  container: document.body,
} as {
  container: HTMLElement;
});

const { Provider, Consumer } = PortalContext;

export { Provider as PortalProvider, Consumer as PortalConsumer, PortalContext };
