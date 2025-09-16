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

// Track button event listener
trackBtn.addEventListener('click', handleTracking);
trackingIdInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleTracking();
  }
});

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
        displayTrackingResults(response.data);
        hideError();
        return;
      } else {
        throw new Error(response.message || 'Shipment not found');
      }
    }

    // Fallback to local data if API fails
    const shipment = trackingData[trackingId];

    if (shipment) {
      displayTrackingResults(shipment);
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
      displayTrackingResults(shipment);
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
function displayTrackingResults(shipment) {
  // Update shipment details
  document.getElementById('displayTrackingId').textContent = shipment.trackingId;
  document.getElementById('serviceType').textContent = shipment.serviceType;
  document.getElementById('origin').textContent = shipment.origin;
  document.getElementById('destination').textContent = shipment.destination;
  document.getElementById('estimatedDelivery').textContent = formatDate(shipment.estimatedDelivery);
  document.getElementById(
    'shipmentValue'
  ).textContent = `$${shipment.shipmentValue.toLocaleString()} USDT`;

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

  timeline.forEach((item) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = `timeline-item ${item.completed ? 'completed' : ''} ${
      item.current ? 'current' : ''
    }`;

    timelineItem.innerHTML = `
            <div class="timeline-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <div class="timeline-time">${item.timestamp}</div>
            </div>
        `;

    timelineContainer.appendChild(timelineItem);
  });
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
