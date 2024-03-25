import React from "react";

const MapAppSelector = ({ latitude, longitude, text }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div>
      <ul>
        <li>
          <a
            className="font-[400] text-[16px] tg-button-text underline"
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MapAppSelector;
