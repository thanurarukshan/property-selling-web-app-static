// LocationMap.js

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = ({ location }) => {
  useEffect(() => {
    // Create map instance
    const map = L.map('map').setView([location.latitude, location.longitude], 15);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add marker
    L.marker([location.latitude, location.longitude]).addTo(map);

    // Cleanup function to remove the map instance when the component is unmounted
    return () => {
      map.remove();
    };
  }, [location.latitude, location.longitude]);

  return <div id="map" style={{ height: '400px' }} />;
};

export default LocationMap;
