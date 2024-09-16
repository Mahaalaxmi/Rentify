import React, { useState, useEffect } from "react";

const SellerDashboard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [activeSection, setActiveSection] = useState("");
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null);

  useEffect(() => {
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(allProperties.filter((p) => p.seller === loggedInUser.email));
  }, [loggedInUser.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const property = {
      place: e.target.place.value,
      area: e.target.area.value,
      bedrooms: e.target.bedrooms.value,
      bathrooms: e.target.bathrooms.value,
      amenities: e.target.amenities.value,
      address: e.target.address.value,
      seller: loggedInUser.email,
    };

    let updatedProperties;
    if (editProperty !== null) {
      updatedProperties = properties.map((p, index) =>
        index === editProperty ? property : p
      );
      setEditProperty(null);
    } else {
      updatedProperties = [...properties, property];
    }

    setProperties(updatedProperties);
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];

    if (editProperty !== null) {
      const updatedAllProperties = allProperties.map((p) =>
        p.address === property.address && p.seller === loggedInUser.email
          ? property
          : p
      );
      localStorage.setItem("properties", JSON.stringify(updatedAllProperties));
    } else {
      localStorage.setItem(
        "properties",
        JSON.stringify([...allProperties, property])
      );
    }

    e.target.reset();
    setActiveSection("viewProperties");
  };

  const handleEdit = (index) => {
    setEditProperty(index);
    setActiveSection("postProperty");
  };

  const handleDelete = (index) => {
    const deletedProperty = properties[index];
    const updatedProperties = properties.filter((_, i) => i !== index);
    setProperties(updatedProperties);
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
    const updatedAllProperties = allProperties.filter(
      (p) =>
        !(
          p.address === deletedProperty.address &&
          p.seller === loggedInUser.email
        )
    );
    localStorage.setItem("properties", JSON.stringify(updatedAllProperties));
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/4 bg-gray-200 p-4">
        <div
          className="p-4 bg-blue-500 text-white rounded mb-4 cursor-pointer"
          onClick={() => setActiveSection("postProperty")}
        >
          Post Property
        </div>
        <div
          className="p-4 bg-green-500 text-white rounded cursor-pointer"
          onClick={() => setActiveSection("viewProperties")}
        >
          View Posted Properties
        </div>
      </div>

      <div className="flex-1 p-8">
        {activeSection === "postProperty" && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-4">
              {editProperty !== null ? "Edit Property" : "Post Property"}
            </h2>
            <input
              name="place"
              placeholder="Place"
              defaultValue={
                editProperty !== null ? properties[editProperty].place : ""
              }
              className="block mb-4 p-2 border border-black hover:border-blue-600"
              required
            />
            <input
              name="area"
              placeholder="Area"
              defaultValue={
                editProperty !== null ? properties[editProperty].area : ""
              }
              className="block mb-4 p-2 border border-black hover:border-blue-600"
              required
            />
            <input
              name="bedrooms"
              type="number"
              placeholder="Number of Bedrooms"
              defaultValue={
                editProperty !== null ? properties[editProperty].bedrooms : ""
              }
              className="block mb-4 p-2 border border-black hover:border-blue-600"
              required
            />
            <input
              name="bathrooms"
              type="number"
              placeholder="Number of Bathrooms"
              defaultValue={
                editProperty !== null ? properties[editProperty].bathrooms : ""
              }
              className="block mb-4 p-2 border border-black hover:border-blue-600"
              required
            />
            <input
              name="amenities"
              placeholder="Nearby Amenities"
              defaultValue={
                editProperty !== null ? properties[editProperty].amenities : ""
              }
              className="block mb-4 p-2 border border-black hover:border-blue-600"
            />
            <input
              name="address"
              placeholder="Address"
              defaultValue={
                editProperty !== null ? properties[editProperty].address : ""
              }
              className="block mb-4 p-2 border border-black hover:border-blue-600"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              {editProperty !== null ? "Update Property" : "Post Property"}
            </button>
          </form>
        )}

        {activeSection === "viewProperties" && (
          <div>
            <h2 className="text-2xl mb-4">Posted Properties</h2>
            {properties.length > 0 ? (
              <ul>
                {properties.map((property, index) => (
                  <li key={index} className="border p-4 mb-4">
                    <p>
                      <strong>Place:</strong> {property.place}
                    </p>
                    <p>
                      <strong>Area:</strong> {property.area}
                    </p>
                    <p>
                      <strong>Bedrooms:</strong> {property.bedrooms}
                    </p>
                    <p>
                      <strong>Bathrooms:</strong> {property.bathrooms}
                    </p>
                    <p>
                      <strong>Amenities:</strong> {property.amenities}
                    </p>
                    <p>
                      <strong>Address:</strong> {property.address}
                    </p>
                    <button
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No properties posted yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
