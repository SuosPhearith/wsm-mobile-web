import { Popup } from "antd-mobile";
import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { LocationInterface } from "../../mock/type";

// Debounce function to reduce the frequency of map center updates
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  setLocation: ({ lat, lng }: LocationInterface) => void;
}

const CustomerLocationPopup = ({ visible, setVisible, setLocation }: Props) => {
  const [selectedLat, setSelectedLat] = useState<number>(11.5564); // Default center (Phnom Penh, Cambodia)
  const [selectedLng, setSelectedLng] = useState<number>(104.9282);

  // Load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB-8483BsCJfJ9mGR9NP7Q6XfdY0yOEt-8",
  });

  // Map container style
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  // Default center position
  const center = {
    lat: selectedLat,
    lng: selectedLng,
  };

  // Handle map center changes (debounced)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCenterChanged = useCallback(
    debounce((map: google.maps.Map) => {
      const newCenter = map.getCenter();
      if (newCenter) {
        setSelectedLat(newCenter.lat());
        setSelectedLng(newCenter.lng());
      }
    }, 600),
    []
  );

  // Get the current location of the user
  const handleSelectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLat(latitude);
          setSelectedLng(longitude);
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

  // Confirm the selected location
  const handleConfirm = () => {
    setLocation({ lat: selectedLat, lng: selectedLng });
    setVisible(false);
  };

  return (
    <Popup
      visible={visible}
      onMaskClick={() => setVisible(false)}
      bodyStyle={{
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        minHeight: "50vh",
      }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Select Location</h3>
          <button
            onClick={() => setVisible(false)}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>

        {/* Map Section */}
        {isLoaded ? (
          <div className="relative">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              onLoad={(map) => {
                map.addListener("center_changed", () => handleCenterChanged(map));
              }}
              options={{
                gestureHandling: "greedy",
                disableDefaultUI: true,
              }}
            />
            {/* Fixed Pin at the Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <img src="/pin.png" alt="Map Pin" className="w-6 h-10" />
            </div>
          </div>
        ) : (
          <div>Loading map...</div>
        )}

        {/* Display Selected Coordinates */}
        <div className="bg-gray-100 p-3 rounded-lg mt-4">
          <div className="text-sm">
            <strong>Latitude:</strong> {selectedLat.toFixed(6)}
          </div>
          <div className="text-sm">
            <strong>Longitude:</strong> {selectedLng.toFixed(6)}
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
