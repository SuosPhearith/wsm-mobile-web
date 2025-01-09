import { Popup } from "antd-mobile";
import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { LocationInterface } from "../../mock/type";

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  setLocation: ({ lat, lng }: LocationInterface) => void;
}

const CustomerLocationPopup = ({ visible, setVisible, setLocation }: Props) => {
  // State for selected coordinates
  const [selectedLat, setSelectedLat] = useState<number | null>(null);
  const [selectedLng, setSelectedLng] = useState<number | null>(null);

  // Load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB-8483BsCJfJ9mGR9NP7Q6XfdY0yOEt-8",
  });

  // Map container style
  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  // Default center position
  const center = {
    lat: 11.5564, // Example: Phnom Penh, Cambodia
    lng: 104.9282,
  };

  // Handle map click to select coordinates
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    setSelectedLat(e.latLng?.lat() ?? null);
    setSelectedLng(e.latLng?.lng() ?? null);
  };

  // Get current location
  const handleSelectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLat(position.coords.latitude);
          setSelectedLng(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to fetch current location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleClose = () => {
    setVisible(false);
    setSelectedLat(null);
    setSelectedLng(null);
  };

  const handleConfirm = () => {
    if (selectedLat && selectedLng) {
      setLocation({ lat: selectedLat, lng: selectedLng });
      setVisible(false);
      setSelectedLat(null)
      setSelectedLng(null)
    } else {
      alert("Please Select location.");
    }
  };

  return (
    <Popup
      visible={visible}
      onMaskClick={() => handleClose()}
      bodyStyle={{
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        minHeight: "50vh",
      }}
    >
      <div className="p-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Select Location</h3>
          <button
            onClick={() => handleClose()}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>

        {/* Map Section */}
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              selectedLat && selectedLng
                ? { lat: selectedLat, lng: selectedLng }
                : center
            }
            zoom={12}
            onClick={handleMapClick}
            options={{
              gestureHandling: "greedy",
            }}
          >
            {selectedLat && selectedLng && (
              <Marker position={{ lat: selectedLat, lng: selectedLng }} />
            )}
          </GoogleMap>
        ) : (
          <div>Loading map...</div>
        )}

        {/* Display Selected Coordinates */}
        <div className="bg-gray-100 p-3 rounded-lg mt-4">
          <div className="text-sm">
            <strong>Latitude:</strong> {selectedLat ?? "Not selected"}
          </div>
          <div className="text-sm">
            <strong>Longitude:</strong> {selectedLng ?? "Not selected"}
          </div>
        </div>

        {/* Select Current Location Button */}
        <button
          onClick={handleSelectCurrentLocation}
          className="bg-blue-500 text-white w-full py-2 rounded-lg font-semibold mt-4"
        >
          Select Current Location
        </button>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="bg-primary text-white w-full py-2 rounded-lg font-semibold mt-4"
        >
          Confirm Location
        </button>
      </div>
    </Popup>
  );
};

export default CustomerLocationPopup;
