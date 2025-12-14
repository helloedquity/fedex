// Sample tracking data (in real application, this would come from a database)
const trackingData = {
  'SCS-2025-001': {
    trackingId: 'SCS-2025-001',
    serviceType: 'Express Clearance',
    origin: 'Shanghai, China',
    destination: 'New York, NY',
    estimatedDelivery: '2025-01-20',
    shipmentValue: '$25,000 USDT',
    status: 'in-transit',
    currentLocation: 'Port of Los Angeles, CA',
    locationDescription: 'Shipment has cleared customs and is being prepared for inland transport',
    lastUpdate: '2025-01-15 14:30 PST',
    customsStatus: 'Cleared through customs',
    timeline: [
      {
        status: 'processing',
        title: 'Order Processed',
        description: 'Shipment documentation received and validated',
        location: 'Shanghai, China',
        timestamp: '2025-01-10 09:00 CST',
        completed: true,
      },
      {
        status: 'in-transit',
        title: 'Departed Origin Port',
        description: 'Container loaded on vessel MSC MAYA',
        location: 'Port of Shanghai',
        timestamp: '2025-01-12 16:45 CST',
        completed: true,
      },
      {
        status: 'in-transit',
        title: 'In Transit - Ocean',
        description: 'Vessel en route to destination port',
        location: 'Pacific Ocean',
        timestamp: '2025-01-13 08:00 PST',
        completed: true,
      },
      {
        status: 'customs',
        title: 'Arrived at Destination Port',
        description: 'Container arrived and undergoing customs inspection',
        location: 'Port of Los Angeles, CA',
        timestamp: '2025-01-15 11:20 PST',
        completed: true,
      },
      {
        status: 'in-transit',
        title: 'Customs Cleared',
        description: 'All customs procedures completed successfully',
        location: 'Port of Los Angeles, CA',
        timestamp: '2025-01-15 14:30 PST',
        completed: true,
        current: true,
      },
      {
        status: 'out-for-delivery',
        title: 'Out for Delivery',
        description: 'Shipment loaded for final delivery',
        location: 'New York Distribution Center',
        timestamp: 'Estimated: 2025-01-19 08:00 EST',
        completed: false,
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Package delivered to recipient',
        location: 'New York, NY',
        timestamp: 'Estimated: 2025-01-20 15:00 EST',
        completed: false,
      },
    ],
  },
  'SCS-2025-002': {
    trackingId: 'SCS-2025-002',
    serviceType: 'Premium Service',
    origin: 'Hamburg, Germany',
    destination: 'Miami, FL',
    estimatedDelivery: '2025-01-18',
    shipmentValue: '$45,000 USDT',
    status: 'customs',
    currentLocation: 'Port of Miami, FL',
    locationDescription: 'Undergoing priority customs inspection',
    lastUpdate: '2025-01-15 16:45 EST',
    customsStatus: 'Priority processing in progress',
    timeline: [
      {
        status: 'processing',
        title: 'Order Processed',
        description: 'Premium service documentation prepared',
        location: 'Hamburg, Germany',
        timestamp: '2025-01-08 10:00 CET',
        completed: true,
      },
      {
        status: 'in-transit',
        title: 'Departed Origin Port',
        description: 'Container loaded on vessel MAERSK ESSEX',
        location: 'Port of Hamburg',
        timestamp: '2025-01-09 14:30 CET',
        completed: true,
      },
      {
        status: 'in-transit',
        title: 'In Transit - Ocean',
        description: 'Express shipping route via Atlantic',
        location: 'Atlantic Ocean',
        timestamp: '2025-01-10 12:00 GMT',
        completed: true,
      },
      {
        status: 'customs',
        title: 'Arrived at Destination Port',
        description: 'Priority handling initiated',
        location: 'Port of Miami, FL',
        timestamp: '2025-01-15 14:20 EST',
        completed: true,
        current: true,
      },
      {
        status: 'out-for-delivery',
        title: 'Customs Clearance',
        description: 'Final inspection and release',
        location: 'Port of Miami, FL',
        timestamp: 'Estimated: 2025-01-17 10:00 EST',
        completed: false,
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'White-glove delivery service',
        location: 'Miami, FL',
        timestamp: 'Estimated: 2025-01-18 14:00 EST',
        completed: false,
      },
    ],
  },
  'SCS-2025-003': {
    trackingId: 'SCS-2025-003',
    serviceType: 'Standard Clearance',
    origin: 'Tokyo, Japan',
    destination: 'Seattle, WA',
    estimatedDelivery: '2025-01-25',
    shipmentValue: '$18,750 USDT',
    status: 'delivered',
    currentLocation: 'Seattle, WA',
    locationDescription: 'Successfully delivered to recipient',
    lastUpdate: '2025-01-14 11:30 PST',
    customsStatus: 'Completed',
    timeline: [
      {
        status: 'processing',
        title: 'Order Processed',
        description: 'Standard clearance documentation prepared',
        location: 'Tokyo, Japan',
        timestamp: '2025-01-05 09:15 JST',
        completed: true,
      },
      {
        status: 'in-transit',
        title: 'Departed Origin Port',
        description: 'Container loaded on vessel EVERGREEN EVER ACE',
        location: 'Port of Tokyo',
        timestamp: '2025-01-07 11:00 JST',
        completed: true,
      },
      {
        status: 'in-transit',
        title: 'In Transit - Ocean',
        description: 'Trans-Pacific shipping route',
        location: 'Pacific Ocean',
        timestamp: '2025-01-08 06:00 PST',
        completed: true,
      },
      {
        status: 'customs',
        title: 'Arrived at Destination Port',
        description: 'Standard customs processing initiated',
        location: 'Port of Seattle, WA',
        timestamp: '2025-01-12 15:45 PST',
        completed: true,
      },
      {
        status: 'out-for-delivery',
        title: 'Customs Cleared',
        description: 'All documentation approved',
        location: 'Port of Seattle, WA',
        timestamp: '2025-01-13 13:20 PST',
        completed: true,
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Package delivered successfully',
        location: 'Seattle, WA',
        timestamp: '2025-01-14 11:30 PST',
        completed: true,
        current: true,
      },
    ],
  },
};

// DOM elements
const trackingIdInput = document.getElementById('trackingId');
const trackBtn = document.getElementById('trackBtn');
const trackingResults = document.getElementById('trackingResults');
const errorMessage = document.getElementById('errorMessage');
let mapInstance = null;
let mapMarkers = {
  origin: null,
  destination: null,
  current: null,
  history: [],
};
let mapInfoWindow = null;
let mapPlaceholder = null;
let geocoder = null;
let AdvancedMarkerElement = null;
let mapId = null;
let routePolyline = null;
let historyPolyline = null;

// Make initMap available for Google Maps callback
window.initMap = initMap;

// Track button event listener
trackBtn.addEventListener('click', handleTracking);
trackingIdInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleTracking();
  }
});

// Initialize Google Map (uses AdvancedMarkerElement)
async function initMap() {
  if (!window.google || !window.google.maps) return;
  if (mapInstance) return mapInstance;

  const mapElement = document.getElementById('locationMap');
  if (!mapElement) return;

  mapPlaceholder = mapElement.querySelector('.map-placeholder');
  geocoder = new google.maps.Geocoder();
  mapId = mapElement.dataset.mapId || window.GOOGLE_MAP_ID || null;

  // Use standard Map to avoid Map ID warning
  // Only use Advanced Markers if we have a valid Map ID
  mapInstance = new google.maps.Map(mapElement, {
    center: { lat: 20, lng: 0 },
    zoom: 2,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
  });

  // Try to load Advanced Marker library only if we have a Map ID
  if (mapId) {
    try {
      const markerLib = await google.maps.importLibrary('marker');
      AdvancedMarkerElement = markerLib.AdvancedMarkerElement;
    } catch (error) {
      console.warn('Advanced Markers not available, using standard markers');
      AdvancedMarkerElement = null;
    }
  } else {
    AdvancedMarkerElement = null;
  }

  mapInfoWindow = new google.maps.InfoWindow();
  return mapInstance;
}

// Update map with full shipment data including origin, destination, current location, and history
async function updateMapFromShipment(shipment) {
  if (!shipment) return;
  if (!mapInstance) {
    await initMap();
  }
  if (!mapInstance) return;

  // Clear existing markers and polylines
  clearMapMarkers();

  const bounds = new google.maps.LatLngBounds();
  let hasAnyCoordinates = false;

  // Add origin marker
  if (shipment.originCoordinates) {
    const originCoords = {
      lat: shipment.originCoordinates.latitude,
      lng: shipment.originCoordinates.longitude,
    };
    addMarker('origin', originCoords, shipment.origin || 'Origin', 'green', '🟢');
    bounds.extend(originCoords);
    hasAnyCoordinates = true;
  } else if (shipment.origin && geocoder) {
    // Fallback: geocode origin
    try {
      const results = await geocodeAddress(shipment.origin);
      if (results && results[0]) {
        const loc = results[0].geometry.location;
        addMarker('origin', { lat: loc.lat(), lng: loc.lng() }, shipment.origin, 'green', '🟢');
        bounds.extend({ lat: loc.lat(), lng: loc.lng() });
        hasAnyCoordinates = true;
      }
    } catch (error) {
      console.error('Error geocoding origin:', error);
    }
  }

  // Add destination marker
  if (shipment.destinationCoordinates) {
    const destCoords = {
      lat: shipment.destinationCoordinates.latitude,
      lng: shipment.destinationCoordinates.longitude,
    };
    addMarker('destination', destCoords, shipment.destination || 'Destination', 'red', '🔴');
    bounds.extend(destCoords);
    hasAnyCoordinates = true;
  } else if (shipment.destination && geocoder) {
    // Fallback: geocode destination
    try {
      const results = await geocodeAddress(shipment.destination);
      if (results && results[0]) {
        const loc = results[0].geometry.location;
        addMarker(
          'destination',
          { lat: loc.lat(), lng: loc.lng() },
          shipment.destination,
          'red',
          '🔴'
        );
        bounds.extend({ lat: loc.lat(), lng: loc.lng() });
        hasAnyCoordinates = true;
      }
    } catch (error) {
      console.error('Error geocoding destination:', error);
    }
  }

  // Add current location marker
  if (shipment.currentLocationCoordinates) {
    const currentCoords = {
      lat: shipment.currentLocationCoordinates.latitude,
      lng: shipment.currentLocationCoordinates.longitude,
    };
    addMarker(
      'current',
      currentCoords,
      shipment.currentLocation || 'Current Location',
      'blue',
      '🔵'
    );
    bounds.extend(currentCoords);
    hasAnyCoordinates = true;
  } else if (shipment.currentLocation && geocoder) {
    // Fallback: geocode current location
    try {
      const results = await geocodeAddress(shipment.currentLocation);
      if (results && results[0]) {
        const loc = results[0].geometry.location;
        addMarker(
          'current',
          { lat: loc.lat(), lng: loc.lng() },
          shipment.currentLocation,
          'blue',
          '🔵'
        );
        bounds.extend({ lat: loc.lat(), lng: loc.lng() });
        hasAnyCoordinates = true;
      }
    } catch (error) {
      console.error('Error geocoding current location:', error);
    }
  }

  // Draw route from origin to destination
  if (mapMarkers.origin && mapMarkers.destination) {
    let originPos, destPos;

    // Get position from marker (handle both AdvancedMarkerElement and standard Marker)
    if (mapMarkers.origin.position) {
      originPos = mapMarkers.origin.position;
    } else if (mapMarkers.origin.getPosition) {
      originPos = mapMarkers.origin.getPosition();
    }

    if (mapMarkers.destination.position) {
      destPos = mapMarkers.destination.position;
    } else if (mapMarkers.destination.getPosition) {
      destPos = mapMarkers.destination.getPosition();
    }

    if (originPos && destPos) {
      drawRoute(originPos, destPos);
    }
  }

  // Add location history trail
  if (
    shipment.locationHistory &&
    Array.isArray(shipment.locationHistory) &&
    shipment.locationHistory.length > 0
  ) {
    drawLocationHistoryTrail(shipment.locationHistory);
    // Add history markers
    shipment.locationHistory.forEach((entry, index) => {
      if (entry.coordinates) {
        const historyCoords = {
          lat: entry.coordinates.latitude,
          lng: entry.coordinates.longitude,
        };
        addHistoryMarker(
          historyCoords,
          entry.location || `Location ${index + 1}`,
          entry.timestamp,
          entry.status
        );
        bounds.extend(historyCoords);
      }
    });
  }

  // Fit bounds to show all markers
  if (hasAnyCoordinates) {
    try {
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      if (ne.lat() !== sw.lat() || ne.lng() !== sw.lng()) {
        mapInstance.fitBounds(bounds, { padding: 50 });
      } else {
        // Single point, just center on it
        mapInstance.setCenter(bounds.getCenter());
        mapInstance.setZoom(9);
      }
    } catch (error) {
      console.error('Error fitting bounds:', error);
      // Fallback: center on current location or origin
      if (mapMarkers.current) {
        const pos =
          mapMarkers.current.position ||
          (mapMarkers.current.getPosition ? mapMarkers.current.getPosition() : null);
        if (pos) {
          mapInstance.setCenter(pos);
          mapInstance.setZoom(9);
        }
      } else if (mapMarkers.origin) {
        const pos =
          mapMarkers.origin.position ||
          (mapMarkers.origin.getPosition ? mapMarkers.origin.getPosition() : null);
        if (pos) {
          mapInstance.setCenter(pos);
          mapInstance.setZoom(9);
        }
      }
    }
  } else if (mapMarkers.current) {
    // Fallback: center on current location
    const pos =
      mapMarkers.current.position ||
      (mapMarkers.current.getPosition ? mapMarkers.current.getPosition() : null);
    if (pos) {
      mapInstance.setCenter(pos);
      mapInstance.setZoom(9);
    }
  } else {
    // Default view
    mapInstance.setCenter({ lat: 20, lng: 0 });
    mapInstance.setZoom(2);
  }

  if (mapPlaceholder) {
    mapPlaceholder.style.display = 'none';
  }
}

function geocodeAddress(address) {
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        resolve(results);
      } else {
        reject(new Error(`Geocode failed: ${status}`));
      }
    });
  });
}

// Helper: convert position to LatLng object
function toLatLng(position) {
  if (position instanceof google.maps.LatLng) {
    return position;
  }
  if (position.lat && position.lng) {
    return new google.maps.LatLng(position.lat, position.lng);
  }
  return null;
}

// Add marker to map
function addMarker(type, position, title, color, icon) {
  if (!mapInstance) return;

  const markerOptions = {
    position,
    map: mapInstance,
    title: title || type,
  };

  // Only use Advanced Marker if we have both Map ID and AdvancedMarkerElement available
  if (mapId && AdvancedMarkerElement) {
    try {
      markerOptions.content = createMarkerContent(icon, color);
      mapMarkers[type] = new AdvancedMarkerElement(markerOptions);
    } catch (error) {
      // Fallback to standard marker if Advanced Marker fails
      console.warn('Advanced Marker failed, using standard marker:', error);
      markerOptions.icon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
      };
      mapMarkers[type] = new google.maps.Marker(markerOptions);
    }
  } else {
    // Use standard marker with custom icon
    markerOptions.icon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#fff',
      strokeWeight: 2,
    };
    mapMarkers[type] = new google.maps.Marker(markerOptions);
  }

  // Add info window
  if (mapInfoWindow) {
    mapMarkers[type].addListener('click', () => {
      mapInfoWindow.setContent(
        `<div style="padding: 0.5rem;"><strong>${title}</strong><br/>${
          type.charAt(0).toUpperCase() + type.slice(1)
        } Location</div>`
      );
      mapInfoWindow.open({
        anchor: mapMarkers[type],
        map: mapInstance,
      });
    });
  }
}

// Create marker content for AdvancedMarkerElement
function createMarkerContent(icon, color) {
  const div = document.createElement('div');
  div.style.cssText = `
    background-color: ${color};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  `;
  div.textContent = icon || '📍';
  return div;
}

// Add history marker
function addHistoryMarker(position, title, timestamp, status) {
  if (!mapInstance) return;

  const markerOptions = {
    position,
    map: mapInstance,
    title: title || 'History Point',
  };

  // Only use Advanced Marker if we have both Map ID and AdvancedMarkerElement available
  if (mapId && AdvancedMarkerElement) {
    try {
      markerOptions.content = createMarkerContent('📍', '#9ca3af');
      const marker = new AdvancedMarkerElement(markerOptions);
      mapMarkers.history.push(marker);
    } catch (error) {
      // Fallback to standard marker
      markerOptions.icon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        fillColor: '#9ca3af',
        fillOpacity: 0.7,
        strokeColor: '#fff',
        strokeWeight: 1,
      };
      const marker = new google.maps.Marker(markerOptions);
      mapMarkers.history.push(marker);
    }
  } else {
    markerOptions.icon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 5,
      fillColor: '#9ca3af',
      fillOpacity: 0.7,
      strokeColor: '#fff',
      strokeWeight: 1,
    };
    const marker = new google.maps.Marker(markerOptions);
    mapMarkers.history.push(marker);
  }

  // Add info window for history marker
  if (mapInfoWindow) {
    const marker = mapMarkers.history[mapMarkers.history.length - 1];
    marker.addListener('click', () => {
      const content = `
        <div style="padding: 0.5rem;">
          <strong>${title}</strong><br/>
          ${timestamp ? `Time: ${new Date(timestamp).toLocaleString()}<br/>` : ''}
          ${status ? `Status: ${status}` : ''}
        </div>
      `;
      mapInfoWindow.setContent(content);
      mapInfoWindow.open({
        anchor: marker,
        map: mapInstance,
      });
    });
  }
}

// Draw route polyline from origin to destination
function drawRoute(originPos, destPos) {
  if (!mapInstance || !originPos || !destPos) return;

  // Remove existing route
  if (routePolyline) {
    routePolyline.setMap(null);
  }

  // Convert positions to LatLng if needed
  const origin = toLatLng(originPos) || originPos;
  const dest = toLatLng(destPos) || destPos;

  routePolyline = new google.maps.Polyline({
    path: [origin, dest],
    geodesic: true,
    strokeColor: '#3b82f6',
    strokeOpacity: 0.6,
    strokeWeight: 3,
    map: mapInstance,
  });
}

// Draw location history trail
function drawLocationHistoryTrail(locationHistory) {
  if (!mapInstance || !locationHistory || locationHistory.length === 0) return;

  // Remove existing history polyline
  if (historyPolyline) {
    historyPolyline.setMap(null);
  }

  // Filter entries with coordinates
  const path = locationHistory
    .filter(
      (entry) => entry.coordinates && entry.coordinates.latitude && entry.coordinates.longitude
    )
    .map((entry) => ({
      lat: entry.coordinates.latitude,
      lng: entry.coordinates.longitude,
    }));

  if (path.length < 2) return;

  historyPolyline = new google.maps.Polyline({
    path: path,
    geodesic: true,
    strokeColor: '#10b981',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    map: mapInstance,
  });
}

// Clear all map markers
function clearMapMarkers() {
  // Clear main markers
  Object.keys(mapMarkers).forEach((key) => {
    if (key === 'history') {
      mapMarkers[key].forEach((marker) => {
        marker.setMap(null);
      });
      mapMarkers[key] = [];
    } else if (mapMarkers[key]) {
      mapMarkers[key].setMap(null);
      mapMarkers[key] = null;
    }
  });

  // Clear polylines
  if (routePolyline) {
    routePolyline.setMap(null);
    routePolyline = null;
  }
  if (historyPolyline) {
    historyPolyline.setMap(null);
    historyPolyline = null;
  }
}

// Handle tracking request
async function handleTracking() {
  const trackingId = trackingIdInput.value.trim().toUpperCase();

  if (!trackingId) {
    showError('Please enter a tracking ID');
    return;
  }

  // Show loading state
  trackBtn.textContent = 'Tracking...';
  trackBtn.disabled = true;

  try {
    // Try to get data from backend API first
    if (window.apiClient) {
      const response = await window.apiClient.getShipmentByTrackingId(trackingId);
      if (response.success) {
        await displayTrackingResults(response.data);
        hideError();
        return;
      } else {
        throw new Error(response.message || 'Shipment not found');
      }
    }

    // Fallback to local data if API fails
    const shipment = trackingData[trackingId];

    if (shipment) {
      await displayTrackingResults(shipment);
      hideError();
    } else {
      showError('Tracking ID not found. Please check your tracking ID and try again.');
      hideResults();
    }
  } catch (error) {
    console.error('Tracking error:', error);

    // Fallback to local data
    const shipment = trackingData[trackingId];

    if (shipment) {
      await displayTrackingResults(shipment);
      hideError();
    } else {
      showError(`Unable to track shipment: ${error.message}`);
      hideResults();
    }
  } finally {
    // Reset button
    trackBtn.textContent = 'Track Shipment';
    trackBtn.disabled = false;
  }
}

// Display tracking results
async function displayTrackingResults(shipment) {
  // Update shipment details
  document.getElementById('displayTrackingId').textContent = shipment.trackingId;
  document.getElementById('serviceType').textContent = shipment.serviceType;
  document.getElementById('origin').textContent = shipment.origin;
  document.getElementById('destination').textContent = shipment.destination;
  document.getElementById('estimatedDelivery').textContent = formatDate(shipment.estimatedDelivery);
  document.getElementById(
    'shipmentValue'
  ).textContent = `NET WT.${shipment.shipmentValue.toLocaleString()} Kg`;

  // Update status badge
  const statusBadge = document.getElementById('statusBadge');
  statusBadge.textContent = formatStatus(shipment.status);
  statusBadge.className = `status-badge ${shipment.status}`;

  // Update current location
  document.getElementById('currentLocation').textContent = shipment.currentLocation;
  document.getElementById('locationDescription').textContent =
    shipment.locationDescription || 'No additional details available';
  document.getElementById('lastUpdate').textContent = `Last updated: ${formatDateTime(
    shipment.lastUpdate
  )}`;

  // Update map with full shipment data
  await updateMapFromShipment(shipment);
  document.getElementById('customsStatus').textContent = formatCustomsStatus(
    shipment.customsStatus
  );

  // Build timeline - use backend timeline if available, otherwise generate from status
  const timeline = shipment.timeline || generateTimelineFromStatus(shipment);
  buildTimeline(timeline);

  // Show results
  trackingResults.style.display = 'block';

  // Smooth scroll to results
  trackingResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Build timeline
function buildTimeline(timeline) {
  const timelineContainer = document.getElementById('timeline');
  timelineContainer.innerHTML = '';

  timeline.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = `timeline-item ${item.completed ? 'completed' : ''} ${
      item.current ? 'current' : ''
    }`;
    timelineItem.style.cursor = 'pointer';
    timelineItem.title = 'Click to view on map';

    timelineItem.innerHTML = `
            <div class="timeline-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <div class="timeline-time">${item.timestamp}</div>
            </div>
        `;

    // Add click handler to center map on this location
    timelineItem.addEventListener('click', () => {
      centerMapOnTimelineItem(item);
    });

    timelineContainer.appendChild(timelineItem);
  });
}

// Center map on timeline item location
async function centerMapOnTimelineItem(item) {
  if (!mapInstance) return;

  // Check if item has coordinates
  if (item.coordinates && item.coordinates.latitude && item.coordinates.longitude) {
    const position = {
      lat: item.coordinates.latitude,
      lng: item.coordinates.longitude,
    };
    mapInstance.setCenter(position);
    mapInstance.setZoom(12);

    // Show info window
    if (mapInfoWindow) {
      const content = `
        <div style="padding: 0.5rem;">
          <strong>${item.title}</strong><br/>
          ${item.description}<br/>
          <strong>Location:</strong> ${item.location}<br/>
          <strong>Time:</strong> ${item.timestamp}
        </div>
      `;
      mapInfoWindow.setContent(content);

      // Create temporary marker for info window
      const tempMarker = new google.maps.Marker({
        position: position,
        map: mapInstance,
        animation: google.maps.Animation.DROP,
      });

      mapInfoWindow.open({
        anchor: tempMarker,
        map: mapInstance,
      });

      // Remove temporary marker after 3 seconds
      setTimeout(() => {
        tempMarker.setMap(null);
      }, 3000);
    }
  } else if (item.location && geocoder) {
    // Fallback: geocode the location
    try {
      const results = await geocodeAddress(item.location);
      if (results && results[0]) {
        const loc = results[0].geometry.location;
        mapInstance.setCenter({ lat: loc.lat(), lng: loc.lng() });
        mapInstance.setZoom(12);
      }
    } catch (error) {
      console.error('Error geocoding timeline location:', error);
    }
  }
}

// Generate timeline from shipment status (fallback)
function generateTimelineFromStatus(shipment) {
  const baseTimeline = [
    {
      status: 'processing',
      title: 'Order Processed',
      description: 'Shipment documentation received and validated',
      location: shipment.origin,
      timestamp: formatDateTime(shipment.createdAt || shipment.lastUpdate),
      completed: true,
    },
    {
      status: 'in-transit',
      title: 'In Transit',
      description: 'Shipment is on its way to destination',
      location: shipment.currentLocation,
      timestamp: formatDateTime(shipment.lastUpdate),
      completed:
        shipment.status === 'in-transit' ||
        shipment.status === 'customs' ||
        shipment.status === 'out-for-delivery' ||
        shipment.status === 'delivered',
      current: shipment.status === 'in-transit',
    },
    {
      status: 'customs',
      title: 'Customs Processing',
      description: 'Shipment is undergoing customs inspection',
      location: shipment.currentLocation,
      timestamp: formatDateTime(shipment.lastUpdate),
      completed:
        shipment.status === 'customs' ||
        shipment.status === 'out-for-delivery' ||
        shipment.status === 'delivered',
      current: shipment.status === 'customs',
    },
    {
      status: 'out-for-delivery',
      title: 'Out for Delivery',
      description: 'Shipment is out for final delivery',
      location: shipment.destination,
      timestamp: formatDateTime(shipment.lastUpdate),
      completed: shipment.status === 'out-for-delivery' || shipment.status === 'delivered',
      current: shipment.status === 'out-for-delivery',
    },
    {
      status: 'delivered',
      title: 'Delivered',
      description: 'Package delivered successfully',
      location: shipment.destination,
      timestamp: formatDateTime(shipment.lastUpdate),
      completed: shipment.status === 'delivered',
      current: shipment.status === 'delivered',
    },
  ];

  return baseTimeline.filter((item) => {
    // Only show relevant timeline items based on current status
    if (shipment.status === 'processing') return item.status === 'processing';
    if (shipment.status === 'in-transit')
      return item.status === 'processing' || item.status === 'in-transit';
    if (shipment.status === 'customs')
      return (
        item.status === 'processing' || item.status === 'in-transit' || item.status === 'customs'
      );
    if (shipment.status === 'out-for-delivery')
      return (
        item.status === 'processing' ||
        item.status === 'in-transit' ||
        item.status === 'customs' ||
        item.status === 'out-for-delivery'
      );
    if (shipment.status === 'delivered') return true;
    return true;
  });
}

// Format customs status
function formatCustomsStatus(status) {
  const statusMap = {
    pending: 'Pending Review',
    processing: 'Processing',
    cleared: 'Cleared',
    hold: 'On Hold',
  };
  return statusMap[status] || status || 'Not specified';
}

// Format date and time
function formatDateTime(dateString) {
  if (!dateString) return 'Not available';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Show error message
function showError(message = null) {
  errorMessage.style.display = 'block';
  if (message) {
    errorMessage.querySelector('p').textContent = message;
  }
}

// Hide error message
function hideError() {
  errorMessage.style.display = 'none';
}

// Hide results
function hideResults() {
  trackingResults.style.display = 'none';
}

// Format status for display
function formatStatus(status) {
  const statusMap = {
    processing: 'Processing',
    'in-transit': 'In Transit',
    customs: 'In Customs',
    'out-for-delivery': 'Out for Delivery',
    delivered: 'Delivered',
  };
  return statusMap[status] || status;
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Email notifications handler
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  const emailBtn = document.getElementById('emailNotifications');
  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      const email = prompt('Enter your email address for notifications:');
      if (email && validateEmail(email)) {
        showNotification('Email notifications enabled successfully!', 'success');
        emailBtn.textContent = 'Notifications Enabled';
        emailBtn.disabled = true;
      } else if (email) {
        showNotification('Please enter a valid email address.', 'error');
      }
    });
  }
});

// Email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Auto-suggest tracking IDs (for demo purposes)
trackingIdInput.addEventListener('input', (e) => {
  const value = e.target.value.toUpperCase();
  if (value.length >= 3) {
    const suggestions = Object.keys(trackingData).filter((id) => id.includes(value));

    // You could implement a dropdown here for suggestions
    if (suggestions.length > 0 && value !== suggestions[0]) {
      // Simple auto-complete hint
      const hint = suggestions[0];
      if (hint.startsWith(value)) {
        // Could show suggestion in a dropdown or as placeholder
      }
    }
  }
});

// Sample tracking IDs for testing (you can remove this in production)
console.log('Sample tracking IDs for testing:');
console.log('SCS-2025-001 - Express Clearance (In Transit)');
console.log('SCS-2025-002 - Premium Service (In Customs)');
console.log('SCS-2025-003 - Standard Clearance (Delivered)');
