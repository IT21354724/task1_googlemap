import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const mapContainerStyle = { width: "100%", height: "500px" }; // Reduced height
const center = { lat: 37.7749, lng: -122.4194 };

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSignOut = () => {
    // Perform any sign-out logic here (e.g., clearing localStorage, authentication state)
    navigate("/signin"); // Navigate to Sign In page
  };

  return (
    <div>
      <div className="p-4 bg-gray-100 w-full flex justify-end shadow-md">
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      <div className="mt-4 p-5">
        <h2 className="text-xl font-semibold mb-2">User Locations</h2>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={11}
          >
            {users.map((user, index) => (
              <Marker key={index} position={user.location} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Home;
