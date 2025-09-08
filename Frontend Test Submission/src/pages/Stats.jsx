import { getData } from "../lib/storage";

export default function Stats() {
  const data = getData();

  return (
    <div className="page">
      <h1>Shortened URL Stats</h1>
      {data.map((d) => (
        <div key={d.code} className="card">
          <p>
            <b>Short:</b>{" "}
            <a href={`/r/${d.code}`} target="_blank">
              {window.location.origin}/r/{d.code}
            </a>
          </p>
          <p>
            <b>Original:</b> {d.url}
          </p>
          <p>
            <b>Created:</b> {new Date(d.createdAt).toLocaleString()}
          </p>
          <p>
            <b>Expires:</b> {new Date(d.expiresAt).toLocaleString()}
          </p>
          <p>
            <b>Total Clicks:</b> {d.clicks.length}
          </p>

          <details>
            <summary>Click Details</summary>
            <ul>
              {d.clicks.map((c, i) => (
                <li key={i}>
                  {new Date(c.time).toLocaleString()} — {c.source} —{" "}
                  {c.location}
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
}
