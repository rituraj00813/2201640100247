import { useState } from "react";
import { getData, saveData } from "../lib/storage";
import { Log } from "../../../Logging Middleware/logging";

export default function Shortener() {
  const [inputs, setInputs] = useState(
    Array(5).fill({ url: "", validity: "", shortcode: "" })
  );
  const [token, setToken] = useState(localStorage.getItem("bearer") || "");
  const [results, setResults] = useState(getData());

  const handleChange = (i, field, value) => {
    const updated = [...inputs];
    updated[i] = { ...updated[i], [field]: value };
    setInputs(updated);
  };

  const validateUrl = (url) =>
    /^(http|https):\/\/[^ "]+$/.test(url.trim());

  const handleShorten = async () => {
    const newResults = [];

    for (let { url, validity, shortcode } of inputs) {
      if (!url) continue;
      if (!validateUrl(url)) {
        alert(`Invalid URL: ${url}`);
        continue;
      }

      const minutes = validity ? parseInt(validity) : 30;
      if (isNaN(minutes) || minutes <= 0) {
        alert("Validity must be a positive integer");
        continue;
      }

      const code =
        shortcode && /^[a-zA-Z0-9_-]{3,20}$/.test(shortcode)
          ? shortcode
          : Math.random().toString(36).slice(2, 8);

      const now = new Date();
      const expiry = new Date(now.getTime() + minutes * 60000);

      const entry = {
        url,
        code,
        createdAt: now.toISOString(),
        expiresAt: expiry.toISOString(),
        clicks: [],
      };

      newResults.push(entry);

      // log action
      await Log("frontend", "info", "utils", `Shortened URL: ${url}`, token);
    }

    const all = [...results, ...newResults];
    setResults(all);
    saveData(all);
  };

  const handleSaveToken = () => {
    localStorage.setItem("bearer", token);
    alert("Bearer token saved!");
  };

  return (
    <div className="page">
      <h1>URL Shortener</h1>

      <div>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste Bearer token"
        />
        <button onClick={handleSaveToken}>Save Token</button>
      </div>

      {inputs.map((inp, i) => (
        <div key={i}>
          <input
            placeholder="Original URL"
            value={inp.url}
            onChange={(e) => handleChange(i, "url", e.target.value)}
          />
          <input
            placeholder="Validity (minutes)"
            value={inp.validity}
            onChange={(e) => handleChange(i, "validity", e.target.value)}
          />
          <input
            placeholder="Preferred Shortcode"
            value={inp.shortcode}
            onChange={(e) => handleChange(i, "shortcode", e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleShorten}>Shorten URLs</button>

      <h2>Shortened Links</h2>
      <ul>
        {results.map((r) => (
          <li key={r.code}>
            <a href={`/r/${r.code}`} target="_blank">
              {window.location.origin}/r/{r.code}
            </a>{" "}
            (expires: {new Date(r.expiresAt).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
