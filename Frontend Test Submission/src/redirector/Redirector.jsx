import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData, saveData } from "../lib/storage";
import { Log } from "../../../Logging Middleware/logging";

export default function Redirector() {
  const { code } = useParams();

  useEffect(() => {
    const all = getData();
    const entry = all.find((x) => x.code === code);

    if (!entry) {
      alert("Short link not found");
      return;
    }

    const now = new Date();
    if (now > new Date(entry.expiresAt)) {
      alert("This link has expired");
      return;
    }

    const click = {
      time: now.toISOString(),
      source: document.referrer || "direct",
      location: "unknown",
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          click.location = `${pos.coords.latitude.toFixed(
            2
          )},${pos.coords.longitude.toFixed(2)}`;
          entry.clicks.push(click);
          saveData(all);
          window.location.href = entry.url;
        },
        () => {
          click.location = "denied";
          entry.clicks.push(click);
          saveData(all);
          window.location.href = entry.url;
        }
      );
    } else {
      entry.clicks.push(click);
      saveData(all);
      window.location.href = entry.url;
    }

    Log("frontend", "info", "utils", `Redirected: ${code}`, localStorage.getItem("bearer"));
  }, [code]);

  return <p>Redirecting...</p>;
}
