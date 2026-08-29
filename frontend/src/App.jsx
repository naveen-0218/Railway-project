import { useEffect, useState } from "react";
import "./App.css";
import MapView from "./MapView";

function App() {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [wheelchair, setWheelchair] = useState(false);
  const [lift, setLift] = useState(false);
  const [ramp, setRamp] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/stations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend error");
        }

        return response.json();
      })
      .then((data) => {
        setStations(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Backend is not connected.");
      });
  }, []);

  const handleSearch = async () => {
    if (search.trim() === "") {
      setFacilities([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/facilities/search?q=" +
          encodeURIComponent(search)
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      const filtered = data.filter((facility) => {
        if (
          wheelchair &&
          facility.wheelchairAccessible !== true
        ) {
          return false;
        }

        if (
          lift &&
          facility.liftAvailable !== true
        ) {
          return false;
        }

        if (
          ramp &&
          facility.rampAvailable !== true
        ) {
          return false;
        }

        return true;
      });

      setFacilities(filtered);
    } catch (err) {
      console.error(err);
      setError("Unable to search facilities.");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setWheelchair(false);
    setLift(false);
    setRamp(false);
    setFacilities([]);
  };

  return (
    <div className="app">

      <header className="header">
        <h1>🚉 Railway Station Navigation</h1>

        <p>
          Find railway stations and accessible facilities
        </p>
      </header>

      <main className="main-container">

        <section className="search-section">

          <h2>🔎 Search Facilities</h2>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search Lift, Ramp, Toilet..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button onClick={handleSearch}>
              🔍 Search
            </button>

          </div>

          <div className="filters">

            <h3>♿ Accessibility Filters</h3>

            <label>
              <input
                type="checkbox"
                checked={wheelchair}
                onChange={(event) =>
                  setWheelchair(event.target.checked)
                }
              />

              ♿ Wheelchair Accessible
            </label>

            <label>
              <input
                type="checkbox"
                checked={lift}
                onChange={(event) =>
                  setLift(event.target.checked)
                }
              />

              🛗 Lift Available
            </label>

            <label>
              <input
                type="checkbox"
                checked={ramp}
                onChange={(event) =>
                  setRamp(event.target.checked)
                }
              />

              🛣️ Ramp Available
            </label>

            <button onClick={clearFilters}>
              Clear Filters
            </button>

          </div>

        </section>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            🔄 Searching...
          </div>
        )}

        {facilities.length > 0 && (
          <section className="results-section">

            <h2>📍 Search Results</h2>

            <div className="results-grid">

              {facilities.map((facility) => (
                <div
                  className="facility-card"
                  key={facility.id}
                >

                  <h3>{facility.name}</h3>

                  <p>
                    🚉 <strong>Station:</strong>{" "}
                    {facility.station?.name || "Unknown"}
                  </p>

                  <p>
                    🏷️ <strong>Type:</strong>{" "}
                    {facility.type}
                  </p>

                  <p>
                    📍 <strong>Platform:</strong>{" "}
                    {facility.platform || "Not specified"}
                  </p>

                  <p>
                    🏢 <strong>Floor:</strong>{" "}
                    {facility.floor || "Not specified"}
                  </p>

                  <p>
                    ♿ Wheelchair:{" "}
                    {facility.wheelchairAccessible
                      ? "✅ Yes"
                      : "❌ No"}
                  </p>

                  <p>
                    🛗 Lift:{" "}
                    {facility.liftAvailable
                      ? "✅ Available"
                      : "❌ Not Available"}
                  </p>

                  <p>
                    🛣️ Ramp:{" "}
                    {facility.rampAvailable
                      ? "✅ Available"
                      : "❌ Not Available"}
                  </p>

                </div>
              ))}

            </div>

          </section>
        )}

        {search.trim() !== "" &&
          !loading &&
          facilities.length === 0 &&
          !error && (
            <div className="no-results">
              <h3>🔍 No facilities found</h3>

              <p>
                Try searching for Lift, Ramp, Toilet or Waiting Hall.
              </p>
            </div>
          )}

        <section className="map-section">

          <h2>🗺️ Interactive Railway Map</h2>

          <MapView stations={stations} />

        </section>

        <section className="stations-section">

          <h2>🚉 Railway Stations</h2>

          <div className="stations-grid">

            {stations.map((station) => (
              <div
                className="station-card"
                key={station.id}
              >

                <h3>
                  🚉 {station.name}
                </h3>

                <p>
                  <strong>Station Code:</strong>{" "}
                  {station.code}
                </p>

                <p>
                  <strong>City:</strong>{" "}
                  {station.city}
                </p>

                <p>
                  📍 {station.latitude},{" "}
                  {station.longitude}
                </p>

                <h4>
                  Available Facilities
                </h4>

                <ul>
                  {station.facilities?.map((facility) => (
                    <li key={facility.id}>
                      {facility.name}
                    </li>
                  ))}
                </ul>

              </div>
            ))}

          </div>

        </section>

      </main>

      <footer className="footer">

        <p>
          Railway Navigation System
        </p>

        <p>
          ♿ Accessible • 🛗 Lift • 🛣️ Ramp
        </p>

      </footer>

    </div>
  );
}

export default App;