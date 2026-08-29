import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapView({ stations }) {
  return (
    <MapContainer
      center={[12.5, 79.8]}
      zoom={7}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[
            station.latitude,
            station.longitude,
          ]}
        >
          <Popup>
            <div>
              <h3>🚉 {station.name}</h3>

              <p>
                <strong>Code:</strong> {station.code}
              </p>

              <p>
                <strong>City:</strong> {station.city}
              </p>

              <hr />

              <h4>🏢 Facilities</h4>

              {station.facilities &&
              station.facilities.length > 0 ? (
                <ul>
                  {station.facilities.map((facility) => (
                    <li key={facility.id}>
                      <strong>{facility.name}</strong>
                      <br />

                      Type: {facility.type}
                      <br />

                      Platform:{" "}
                      {facility.platform || "Not specified"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No facilities available.</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;