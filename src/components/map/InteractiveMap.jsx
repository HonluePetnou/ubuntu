import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Countries from "../../data/countries";
import CountryDescriptions from "../../data/countryDescriptions";
import { MAP_CONFIG } from "../../utils/constants";

const { MODAL_WIDTH, MODAL_HEIGHT, MARGIN, VIEW_BOX } = MAP_CONFIG;

export default function InteractiveMap () {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleCountryClick = (e, id, title) => {
    const svg = e.target.ownerSVGElement;
    const svgRect = svg.getBoundingClientRect();
    
    // Get click position relative to SVG
    let x = e.nativeEvent.offsetX + svgRect.left;
    let y = e.nativeEvent.offsetY + svgRect.top;
    
    // Adjust position to keep modal on screen
    if (x + MODAL_WIDTH + MARGIN > window.innerWidth) {
      x = window.innerWidth - MODAL_WIDTH - MARGIN;
    }
    if (x < MARGIN) {
      x = MARGIN;
    }
    if (y + MODAL_HEIGHT + MARGIN > window.innerHeight) {
      y = window.innerHeight - MODAL_HEIGHT - MARGIN;
    }
    if (y < MARGIN) {
      y = MARGIN;
    }

    setModalPosition({ x, y });
    setSelectedCountry({ id, title });
  };

  const handleCloseModal = () => setSelectedCountry(null);

  const handleExploreCountry = () => {
    if (selectedCountry) {
      navigate(`/country/${selectedCountry.id}`);
    }
  };

  return (
    <div className="map">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox={VIEW_BOX}
        style={{ width: "100%", height: "auto" }}
      >
        {Countries.map((country) => (
          <a key={country.id} xlinkTitle={country.title}>
            <path
              id={country.id}
              title={country.title}
              d={country.d}
              onClick={(e) => handleCountryClick(e, country.id, country.title)}
              style={{
                fill:
                  selectedCountry?.id === country.id ? "#A0522D" : undefined,
              }}
            />
          </a>
        ))}
      </svg>

      {selectedCountry && (
        <div
          className="map-description"
          style={{
            left: modalPosition.x,
            top: modalPosition.y,
          }}
        >
          <button onClick={handleCloseModal}>X</button>

          <h1>
            {selectedCountry.title} ({selectedCountry.id})
          </h1>

          <p>
            {CountryDescriptions[selectedCountry.id] || "Lorem ipsum dolor"}
          </p>

          <div>
            <button 
              type="button" 
              onClick={handleExploreCountry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Explore more
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
