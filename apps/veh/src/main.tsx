import { StrictMode } from "react"
import { createRoot, Root } from "react-dom/client"

import "@workspace/ui/globals.css"
import { App } from "./App"

let root: Root | null = null;

function render() {
  root = createRoot(document.getElementById('veh')!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

if (window.__POWERED_BY_WUJIE__) {
  window.__WUJIE_MOUNT = () => {
    render();
  };
  window.__WUJIE_UNMOUNT = () => {
    if (root) {
      root.unmount();
      root = null;
    }
  };
} else {
  render();
}


