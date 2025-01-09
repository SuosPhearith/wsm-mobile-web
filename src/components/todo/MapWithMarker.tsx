import React from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

// Set default map options
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

interface Props {
  latitude: number;
  longitude: number;
}

const MapWithMarker: React.FC<Props> = ({ latitude, longitude }) => {
  // Load Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB-8483BsCJfJ9mGR9NP7Q6XfdY0yOEt-8", // Use your API key
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat: latitude, lng: longitude }}
      options={{
        gestureHandling: "greedy",
      }}
      zoom={15}
    >
      <MarkerF position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

export default MapWithMarker;
