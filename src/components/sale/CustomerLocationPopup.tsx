/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Popup, Radio, Space } from "antd-mobile";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useMutation } from "react-query";
import { createCustomerAddress } from "../../api/sale";
import { Address, Customer } from "../../api/type";
import { MdError } from "react-icons/md";

// Debounce function
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  setLocation: ({ lat, lng }: Address) => void;
}

const CustomerLocationPopup = ({ visible, setVisible, setLocation }: Props) => {
  const selectedLatRef = useRef<number>(11.5564); // Default center (Phnom Penh, Cambodia)
  const selectedLngRef = useRef<number>(104.9282);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<
    "Warehouse" | "Retail Store" | "Other"
  >("Warehouse");
  const [customer, setCustomer] = useState<Customer>();
  const [note, setNote] = useState("");

  // Create address mutation
  const { mutateAsync } = useMutation({
    mutationFn: createCustomerAddress,
    onError: (error) => {
      Dialog.alert({
        content: (
          <div className="text-red-500 flex items-center gap-1">
            <MdError size={24} /> Something went wrong.
          </div>
        ),
        confirmText: "Close",
      });
      console.error(error);
    },
  });

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Memoized center object
  const center = useMemo(
    () => ({
      lat: selectedLatRef.current,
      lng: selectedLngRef.current,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedLatRef.current, selectedLngRef.current]
  );

  // Handle map center change with debouncing
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCenterChanged = useCallback(
    debounce(async (map: google.maps.Map) => {
      const newCenter = map.getCenter();
      if (!newCenter) return;

      const lat = newCenter.lat();
      const lng = newCenter.lng();

      // Update only if different
      if (lat !== selectedLatRef.current || lng !== selectedLngRef.current) {
        selectedLatRef.current = lat;
        selectedLngRef.current = lng;

        // Get address using Geocoder
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat, lng };

        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            setSelectedAddress(results[0].formatted_address);
          }
        });
      }
    }, 600),
    []
  );

  // Load customer data from localStorage
  useEffect(() => {
    setCustomer(JSON.parse(localStorage.getItem("selectedCustomer") || "{}"));
  }, [visible]);

  // Get the user's current location
  const handleSelectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          selectedLatRef.current = latitude;
          selectedLngRef.current = longitude;
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

  // Confirm and save the selected location
  const handleConfirm = async () => {
    try {
      if (!customer?.id) return;

      const data: Address = {
        lat: selectedLatRef.current,
        lng: selectedLngRef.current,
        address_name: selectedAddress || "No Provide",
        label: selectedLabel,
        note: note,
        customer_id: customer.id,
      };
      const res = (await mutateAsync(data)) as { id: number };
      if (!res?.id) throw new Error("Invalid response from API");

      setLocation({ ...data, id: res.id });
      setNote("");
      setSelectedLabel("Warehouse");
      setSelectedAddress("");
      setCustomer(undefined);
      setVisible(false);
    } catch (error) {
      console.error("Mutation error:", error);
    }
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
          <button onClick={() => setVisible(false)} className="text-red-500 font-semibold">
            Close
          </button>
        </div>

        {/* Map Section */}
        {isLoaded ? (
          <div className="relative">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "300px" }}
              center={center}
              zoom={15}
              onLoad={(map) => {
                map.addListener("center_changed", () => handleCenterChanged(map));
              }}
              options={{ gestureHandling: "greedy", disableDefaultUI: true }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <img src="/pin.png" alt="Map Pin" className="w-6 h-10" />
            </div>
          </div>
        ) : (
          <div>Loading map...</div>
        )}

        {/* Location Info */}
        <div className="bg-gray-100 p-3 rounded-lg mt-4">
          <div className="text-sm">
            <strong>Latitude:</strong> {selectedLatRef.current.toFixed(6)}
            <strong className="ms-3">Longitude:</strong> {selectedLngRef.current.toFixed(6)}
          </div>
          <div className="text-sm mb-4 truncate">
            <strong>Address:</strong> {selectedAddress}
          </div>
          <Radio.Group value={selectedLabel} onChange={(val) => setSelectedLabel(val as any)}>
            <Space direction="horizontal">
              <Radio value="Warehouse">Warehouse</Radio>
              <Radio value="Retail Store">Retail Store</Radio>
              <Radio value="Other">Other</Radio>
            </Space>
          </Radio.Group>
          <input
            className="w-full p-2 border border-gray-300 rounded-md mt-4"
            placeholder="Enter note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <button onClick={handleSelectCurrentLocation} className="bg-blue-500 text-white w-full py-2 rounded-lg font-semibold mt-4">
          Select Current Location
        </button>
        <button onClick={handleConfirm} className="bg-primary text-white w-full py-2 rounded-lg font-semibold mt-4">
          Confirm Location
        </button>
      </div>
    </Popup>
  );
};

export default CustomerLocationPopup;
