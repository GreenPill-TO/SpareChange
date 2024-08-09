// components/main/StoreMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function StoreMap() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch store data from your API
    const fetchStores = async () => {
      const response = await fetch("/api/stores"); // Replace with your API endpoint
      const data = await response.json();
      setStores(data);
    };
    fetchStores();
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stores.map((store) => (
        <Marker key={store.id} position={[store.latitude, store.longitude]}>
          <Popup>
            <strong>{store.name}</strong><br />
            {store.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default StoreMap;
