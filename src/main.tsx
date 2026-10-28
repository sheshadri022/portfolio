import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/caveat/600.css";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
