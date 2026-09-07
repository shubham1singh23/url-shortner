import { useState } from "react";
import "./styles.css";
import ShortenForm from "./components/ShortenForm";
import ResultCard from "./components/ResultCard";
import SignalLog from "./components/SignalLog";
import { useLinkLog } from "./useLinkLog";
import { BASE_URL } from "./api";

export default function App() {
  const { entries, addEntry, clearLog } = useLinkLog();
  const [result, setResult] = useState(null);

  function handleCreated({ actualUrl, shortCode }) {
    setResult({ actualUrl, shortCode });
    addEntry({ actualUrl, shortCode });
  }

  return (
    <main className="page">
      <div className="container">
        <ShortenForm onCreated={handleCreated} />
        <ResultCard result={result} />
        <SignalLog entries={entries} onClear={clearLog} />

        <footer className="footer">
          <span>Talking to {BASE_URL}</span>
        </footer>
      </div>
    </main>
  );
}
