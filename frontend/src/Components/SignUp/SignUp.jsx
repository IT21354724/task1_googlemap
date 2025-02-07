import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const mapContainerStyle = { width: "100%", height: "400px" };
const center = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: { lat: null, lng: null },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMapClick = (e) => {
    setFormData({
      ...formData,
      location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.location.lat || !formData.location.lng) {
      alert("Please select a location on the map.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      alert(response.data.message);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Error Registering User. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign up for your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Select Your Location
              </label>
              <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={10}
                  onClick={handleMapClick}
                >
                  {formData.location.lat && (
                    <Marker
                      position={{
                        lat: formData.location.lat,
                        lng: formData.location.lng,
                      }}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
