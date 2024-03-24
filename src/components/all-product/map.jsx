import React from 'react';

const MapAppSelector = ({ latitude, longitude }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
  const bingMapsUrl = `https://bing.com/maps/default.aspx?rtp=~pos.${latitude}_${longitude}`;
  const appleMapsUrl = `http://maps.apple.com/?daddr=${latitude},${longitude}`;

  return (
    <div>
      <h1>Open Location in Your Preferred Map App</h1>
      <p>Select the map app to open the location:</p>
      <ul>
        <li><a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></li>
        <li><a href={wazeUrl} target="_blank" rel="noopener noreferrer">Open in Waze</a></li>
        <li><a href={bingMapsUrl} target="_blank" rel="noopener noreferrer">Open in Bing Maps</a></li>
        <li><a href={appleMapsUrl} target="_blank" rel="noopener noreferrer">Open in Apple Maps</a></li>
      </ul>
    </div>
  );
};

export default MapAppSelector;
