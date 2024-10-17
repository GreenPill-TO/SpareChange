// components/main/StoreMap.tsx
import IconRetinaUrl from "leaflect/dist/image/marker-icon-2x.png";
import IconUrl from "leaflect/dist/image/marker-icon.png";
import ShadowUrl from "leaflect/dist/image/marker-shadow.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Directly set icon options without deleting _getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: IconRetinaUrl,
  iconUrl: IconUrl,
  shadowUrl: ShadowUrl,
});

// Define the types for your store data
interface Store {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

function StoreMap() {
  const [stores, setStores] = useState<Store[]>([]);

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
            <strong>{store.name}</strong>
            <br />
            {store.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default StoreMap;
