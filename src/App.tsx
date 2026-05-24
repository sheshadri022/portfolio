import { ThemeProvider } from "next-themes";
import Portfolio from "./components/Portfolio";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <Portfolio />
    </ThemeProvider>
  );
}

export default App;
