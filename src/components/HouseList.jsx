import React, { useState, useEffect } from "react";

const HouseList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [interestedProperty, setInterestedProperty] = useState(null);
  const [filters, setFilters] = useState({
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
  });

  useEffect(() => {
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(allProperties);
    setFilteredProperties(allProperties);
  }, []);

  useEffect(() => {
    const filtered = properties.filter((property) =>
      Object.keys(filters).every(
        (key) =>
          filters[key] === "" ||
          (key !== "address" &&
            property[key]
              ?.toString()
              .toLowerCase()
              .includes(filters[key].toLowerCase()))
      )
    );
    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterest = (property) => {
    setInterestedProperty(property);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Available Properties</h1>

      <div className="mb-8">
        <input
          name="place"
          placeholder="Place"
          value={filters.place}
          onChange={handleFilterChange}
          className="p-2 border mb-2 mr-2"
        />
        <input
          name="area"
          placeholder="Area"
          value={filters.area}
          onChange={handleFilterChange}
          className="p-2 border mb-2 mr-2"
        />
        <input
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          value={filters.bedrooms}
          onChange={handleFilterChange}
          className="p-2 border mb-2 mr-2"
        />
        <input
          name="bathrooms"
          type="number"
          placeholder="Bathrooms"
          value={filters.bathrooms}
          onChange={handleFilterChange}
          className="p-2 border mb-2 mr-2"
        />
        <input
          name="amenities"
          placeholder="Amenities"
          value={filters.amenities}
          onChange={handleFilterChange}
          className="p-2 border mb-2 mr-2"
        />
      </div>

      <div>
        {filteredProperties.length > 0 ? (
          <ul>
            {filteredProperties.map((property, index) => (
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
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => handleInterest(property)}
                >
                  I'm Interested
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No properties found.</p>
        )}
      </div>

      {interestedProperty && (
        <div className="mt-8 p-4 border">
          <h2 className="text-xl mb-2">Interested in:</h2>
          <p>
            <strong>Place:</strong> {interestedProperty.place}
          </p>
          <p>
            <strong>Area:</strong> {interestedProperty.area}
          </p>
          <p>
            <strong>Bedrooms:</strong> {interestedProperty.bedrooms}
          </p>
          <p>
            <strong>Bathrooms:</strong> {interestedProperty.bathrooms}
          </p>
          <p>
            <strong>Amenities:</strong> {interestedProperty.amenities}
          </p>
          <p>
            <strong>Address:</strong> {interestedProperty.address}
          </p>
          <p>
            <strong>Seller Contact:</strong> {interestedProperty.seller}
          </p>
        </div>
      )}
    </div>
  );
};

export default HouseList;
