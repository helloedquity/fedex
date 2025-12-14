// Admin credentials (fallback for demo purposes)
const adminCredentials = {
  username: 'admin',
  password: 'swift2025',
};

// Shipments data will be loaded from backend API
let shipmentsData = {};
let messagesData = [];

// DOM elements
const loginForm = document.getElementById('loginForm');
const adminDashboard = document.getElementById('adminDashboard');
const adminLoginForm = document.getElementById('adminLoginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

// Tab elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Message elements
const messagesList = document.getElementById('messagesList');
const messageStatusFilter = document.getElementById('messageStatusFilter');
const messagePriorityFilter = document.getElementById('messagePriorityFilter');
const messageCount = document.getElementById('messageCount');
const replyModal = document.getElementById('replyModal');
const closeReplyModal = document.getElementById('closeReplyModal');
const cancelReply = document.getElementById('cancelReply');
const replyForm = document.getElementById('replyForm');
const messageDetails = document.getElementById('messageDetails');

// Form elements
const createShipmentForm = document.getElementById('createShipmentForm');
const updateModal = document.getElementById('updateModal');
const updateForm = document.getElementById('updateForm');
const closeModal = document.getElementById('closeModal');
const cancelUpdate = document.getElementById('cancelUpdate');

// Search and filter elements
const searchShipments = document.getElementById('searchShipments');
const statusFilter = document.getElementById('statusFilter');

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();
  setupEventListeners();
  renderShipmentsList();
});

// Check if user is already authenticated
async function checkAuthStatus() {
  const token = localStorage.getItem('authToken');
  if (token && window.apiClient) {
    try {
      // Verify token with backend
      const response = await window.apiClient.getProfile();
      if (response.success) {
        showDashboard();
        return;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Clear invalid token
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminAuthenticated');
    }
  }

  // Fallback to local authentication check
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  if (isAuthenticated) {
    showDashboard();
  } else {
    showLogin();
  }
}

// Setup event listeners
function setupEventListeners() {
  // Login form
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', handleLogin);
  }

  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Create shipment form
  if (createShipmentForm) {
    createShipmentForm.addEventListener('submit', handleCreateShipment);

    // Auto-geocode addresses when user types
    const originInput = document.getElementById('newOrigin');
    const destinationInput = document.getElementById('newDestination');
    const currentLocationInput = document.getElementById('newCurrentLocation');

    if (originInput) {
      originInput.addEventListener('blur', () =>
        autoGeocodeAddress('newOrigin', 'newOriginLat', 'newOriginLng')
      );
    }
    if (destinationInput) {
      destinationInput.addEventListener('blur', () =>
        autoGeocodeAddress('newDestination', 'newDestinationLat', 'newDestinationLng')
      );
    }
    if (currentLocationInput) {
      currentLocationInput.addEventListener('blur', () =>
        autoGeocodeAddress('newCurrentLocation', 'newCurrentLocationLat', 'newCurrentLocationLng')
      );
    }
  }

  // Update modal
  if (closeModal) {
    closeModal.addEventListener('click', closeUpdateModal);
  }
  if (cancelUpdate) {
    cancelUpdate.addEventListener('click', closeUpdateModal);
  }
  if (updateForm) {
    updateForm.addEventListener('submit', handleUpdateShipment);
  }

  // Search and filter
  if (searchShipments) {
    searchShipments.addEventListener('input', filterShipments);
  }
  if (statusFilter) {
    statusFilter.addEventListener('change', filterShipments);
  }

  // Message filters
  if (messageStatusFilter) {
    messageStatusFilter.addEventListener('change', filterMessages);
  }
  if (messagePriorityFilter) {
    messagePriorityFilter.addEventListener('change', filterMessages);
  }

  // Reply modal
  if (closeReplyModal) {
    closeReplyModal.addEventListener('click', closeReplyModalHandler);
  }
  if (cancelReply) {
    cancelReply.addEventListener('click', closeReplyModalHandler);
  }
  if (replyForm) {
    replyForm.addEventListener('submit', handleReplySubmit);
  }

  // Close modal when clicking outside
  if (updateModal) {
    updateModal.addEventListener('click', (e) => {
      if (e.target === updateModal) {
        closeUpdateModal();
      }
    });
  }

  // Close map picker modal when clicking outside
  const mapPickerModal = document.getElementById('mapPickerModal');
  if (mapPickerModal) {
    mapPickerModal.addEventListener('click', (e) => {
      if (e.target === mapPickerModal) {
        closeMapPicker();
      }
    });
  }
}

// Handle login
async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Show loading state
  const loginBtn = e.target.querySelector('button[type="submit"]');
  const originalText = loginBtn.textContent;
  loginBtn.textContent = 'Logging in...';
  loginBtn.disabled = true;

  try {
    // Try backend API first
    if (window.apiClient) {
      const response = await window.apiClient.login(username, password);
      if (response.success) {
        localStorage.setItem('adminAuthenticated', 'true');
        showDashboard();
        loginError.style.display = 'none';
        showNotification('Login successful!', 'success');
        return;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    }

    // Fallback to local credentials
    if (username === adminCredentials.username && password === adminCredentials.password) {
      localStorage.setItem('adminAuthenticated', 'true');
      showDashboard();
      loginError.style.display = 'none';
      showNotification('Login successful!', 'success');
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    loginError.style.display = 'block';
    showNotification('Login failed. Please check your credentials.', 'error');
  } finally {
    // Reset button state
    loginBtn.textContent = originalText;
    loginBtn.disabled = false;
  }
}

// Handle logout
async function handleLogout() {
  try {
    // Try backend logout
    if (window.apiClient) {
      await window.apiClient.logout();
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('authToken');
    showLogin();
    showNotification('Logged out successfully', 'success');
  }
}

// Show login form
function showLogin() {
  if (loginForm) loginForm.style.display = 'flex';
  if (adminDashboard) adminDashboard.style.display = 'none';

  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');

  if (usernameField) usernameField.value = '';
  if (passwordField) passwordField.value = '';
  if (loginError) loginError.style.display = 'none';
}

// Show dashboard
async function showDashboard() {
  if (loginForm) loginForm.style.display = 'none';
  if (adminDashboard) adminDashboard.style.display = 'block';

  // Load data from backend
  await Promise.all([updateStats(), loadShipments(), loadMessages()]);
}

// Switch tabs
function switchTab(tabName) {
  // Update tab buttons
  tabBtns.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Update tab content
  tabContents.forEach((content) => {
    content.classList.toggle('active', content.id === `${tabName}Tab`);
  });
}

// Update dashboard stats
async function updateStats() {
  try {
    // Try to get stats from backend API
    if (window.apiClient) {
      const response = await window.apiClient.getDashboardStats();
      if (response.success) {
        const stats = response.data;
        const statCards = document.querySelectorAll('.stat-number');
        if (statCards[0]) statCards[0].textContent = stats.activeShipments || 0;
        if (statCards[1]) statCards[1].textContent = stats.inCustoms || 0;
        if (statCards[2]) statCards[2].textContent = stats.deliveredToday || 0;
        if (statCards[3])
          statCards[3].textContent = `$${((stats.totalValue || 0) / 1000000).toFixed(1)}M`;
        return;
      }
    }

    // Fallback to local data
    const shipments = Object.values(shipmentsData);
    const activeShipments = shipments.filter((s) => s.status !== 'delivered').length;
    const inCustoms = shipments.filter((s) => s.status === 'customs').length;
    const deliveredToday = shipments.filter((s) => {
      const today = new Date().toDateString();
      const shipmentDate = new Date(s.lastUpdate).toDateString();
      return s.status === 'delivered' && shipmentDate === today;
    }).length;
    const totalValue = shipments.reduce((sum, s) => sum + s.shipmentValue, 0);

    const statCards = document.querySelectorAll('.stat-number');
    if (statCards[0]) statCards[0].textContent = activeShipments;
    if (statCards[1]) statCards[1].textContent = inCustoms;
    if (statCards[2]) statCards[2].textContent = deliveredToday;
    if (statCards[3]) statCards[3].textContent = `$${(totalValue / 1000000).toFixed(1)}M`;
  } catch (error) {
    console.error('Error updating stats:', error);
    showNotification('Failed to load dashboard stats', 'error');

    // Use fallback local data
    const shipments = Object.values(shipmentsData);
    const activeShipments = shipments.filter((s) => s.status !== 'delivered').length;
    const inCustoms = shipments.filter((s) => s.status === 'customs').length;
    const deliveredToday = shipments.filter((s) => {
      const today = new Date().toDateString();
      const shipmentDate = new Date(s.lastUpdate).toDateString();
      return s.status === 'delivered' && shipmentDate === today;
    }).length;
    const totalValue = shipments.reduce((sum, s) => sum + s.shipmentValue, 0);

    const statCards = document.querySelectorAll('.stat-number');
    if (statCards[0]) statCards[0].textContent = activeShipments;
    if (statCards[1]) statCards[1].textContent = inCustoms;
    if (statCards[2]) statCards[2].textContent = deliveredToday;
    if (statCards[3]) statCards[3].textContent = `$${(totalValue / 1000000).toFixed(1)}M`;
  }
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

// Format customs status for display
function formatCustomsStatus(status) {
  const statusMap = {
    pending: 'Pending Review',
    processing: 'Processing',
    cleared: 'Cleared',
    hold: 'On Hold',
  };
  return statusMap[status] || status;
}

// Load shipments from backend
async function loadShipments() {
  try {
    if (window.apiClient) {
      const response = await window.apiClient.getShipments();
      if (response.success) {
        // Convert array to object with trackingId as key
        shipmentsData = {};
        response.data.shipments.forEach((shipment) => {
          shipmentsData[shipment.trackingId] = shipment;
        });
        renderShipmentsList();
        return;
      }
    }

    // Fallback to empty state
    shipmentsData = {};
    renderShipmentsList();
  } catch (error) {
    console.error('Error loading shipments:', error);
    showNotification('Failed to load shipments', 'error');
    shipmentsData = {};
    renderShipmentsList();
  }
}

// Render shipments list
function renderShipmentsList(filteredShipments = null) {
  const shipmentsList = document.getElementById('shipmentsList');
  if (!shipmentsList) return;

  const shipments = filteredShipments || Object.values(shipmentsData);

  if (shipments.length === 0) {
    shipmentsList.innerHTML =
      '<p style="text-align: center; color: #64748b; padding: 2rem;">No shipments found.</p>';
    return;
  }

  shipmentsList.innerHTML = shipments
    .map(
      (shipment) => `
        <div class="shipment-item">
            <div class="shipment-header-item">
                <div class="shipment-id">${shipment.trackingId}</div>
                <div class="shipment-status ${shipment.status}">${formatStatus(
        shipment.status
      )}</div>
            </div>
            <div class="shipment-details-grid">
                <div class="shipment-detail">
                    <div class="label">Customer</div>
                    <div class="value">${shipment.customerName || 'N/A'}</div>
                </div>
                <div class="shipment-detail">
                    <div class="label">Phone</div>
                    <div class="value">${shipment.customerPhone || 'N/A'}</div>
                </div>
                <div class="shipment-detail">
                    <div class="label">Service Type</div>
                    <div class="value">${shipment.serviceType}</div>
                </div>
                <div class="shipment-detail">
                    <div class="label">Route</div>
                    <div class="value">${shipment.origin} → ${shipment.destination}</div>
                </div>
                <div class="shipment-detail">
                    <div class="label">Value</div>
                    <div class="value">NET WT.${shipment.shipmentValue.toLocaleString()} Kg</div>
                </div>
                <div class="shipment-detail">
                    <div class="label">Current Location</div>
                    <div class="value">${shipment.currentLocation}</div>
                </div>
                <div class="shipment-detail">
                    <div class="label">Customs Status</div>
                    <div class="value">${formatCustomsStatus(shipment.customsStatus)}</div>
                </div>
                <div class="shipment-detail">
                    <div class="label">Last Update</div>
                    <div class="value">${new Date(shipment.lastUpdate).toLocaleDateString()}</div>
                </div>
            </div>
            <div class="shipment-actions">
                <button class="btn btn-small btn-primary" onclick="openUpdateModal('${
                  shipment.trackingId
                }')">Update Status</button>
                <button class="btn btn-small btn-outline" onclick="deleteShipment('${
                  shipment.trackingId
                }')">Delete</button>
            </div>
        </div>
    `
    )
    .join('');
}

// Filter shipments
function filterShipments() {
  const searchTerm = searchShipments ? searchShipments.value.toLowerCase() : '';
  const statusValue = statusFilter ? statusFilter.value : '';

  const filtered = Object.values(shipmentsData).filter((shipment) => {
    const matchesSearch =
      shipment.trackingId.toLowerCase().includes(searchTerm) ||
      shipment.origin.toLowerCase().includes(searchTerm) ||
      shipment.destination.toLowerCase().includes(searchTerm);
    const matchesStatus = !statusValue || shipment.status === statusValue;

    return matchesSearch && matchesStatus;
  });

  renderShipmentsList(filtered);
}

// Handle create shipment
async function handleCreateShipment(e) {
  e.preventDefault();

  const customerName = document.getElementById('newCustomerName').value;
  const customerPhone = document.getElementById('newCustomerPhone').value;
  const serviceType = document.getElementById('newServiceType').value;
  const origin = document.getElementById('newOrigin').value;
  const destination = document.getElementById('newDestination').value;
  const value = parseFloat(document.getElementById('newValue').value);
  const deliveryDate = document.getElementById('newDeliveryDate').value;
  const currentLocation = document.getElementById('newCurrentLocation').value;

  // Get coordinates
  const originLat = parseFloat(document.getElementById('newOriginLat').value);
  const originLng = parseFloat(document.getElementById('newOriginLng').value);
  const destinationLat = parseFloat(document.getElementById('newDestinationLat').value);
  const destinationLng = parseFloat(document.getElementById('newDestinationLng').value);
  const currentLocationLat = parseFloat(document.getElementById('newCurrentLocationLat').value);
  const currentLocationLng = parseFloat(document.getElementById('newCurrentLocationLng').value);

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Creating...';
  submitBtn.disabled = true;

  try {
    // Try backend API first
    if (window.apiClient) {
      const shipmentData = {
        customerName,
        customerPhone,
        serviceType,
        origin,
        destination,
        estimatedDelivery: deliveryDate,
        shipmentValue: value,
        currentLocation,
      };

      // Add coordinates if provided
      if (!isNaN(originLat) && !isNaN(originLng)) {
        shipmentData.originCoordinates = {
          latitude: originLat,
          longitude: originLng,
        };
      }
      if (!isNaN(destinationLat) && !isNaN(destinationLng)) {
        shipmentData.destinationCoordinates = {
          latitude: destinationLat,
          longitude: destinationLng,
        };
      }
      if (!isNaN(currentLocationLat) && !isNaN(currentLocationLng)) {
        shipmentData.currentLocationCoordinates = {
          latitude: currentLocationLat,
          longitude: currentLocationLng,
        };
      }

      const response = await window.apiClient.createShipment(shipmentData);
      if (response.success) {
        // Update local data
        shipmentsData[response.data.trackingId] = response.data;

        // Reset form
        createShipmentForm.reset();

        // Update displays
        await updateStats();
        renderShipmentsList();

        // Switch to shipments tab
        switchTab('shipments');

        // Show success message
        showNotification('Shipment created successfully!', 'success');
        return;
      } else {
        throw new Error(response.message || 'Failed to create shipment');
      }
    }

    // Fallback to local creation
    const generatedTrackingId = generateTrackingId();

    // Create new shipment locally
    shipmentsData[generatedTrackingId] = {
      trackingId: generatedTrackingId,
      customerName,
      customerPhone,
      serviceType: serviceType,
      origin: origin,
      destination: destination,
      estimatedDelivery: deliveryDate,
      shipmentValue: value,
      status: 'processing',
      currentLocation: currentLocation,
      locationDescription: 'Shipment created and documentation being prepared',
      customsStatus: 'pending',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString(),
    };

    // Reset form
    createShipmentForm.reset();

    // Update displays
    await updateStats();
    renderShipmentsList();

    // Switch to shipments tab
    switchTab('shipments');

    // Show success message
    showNotification('Shipment created successfully!', 'success');
  } catch (error) {
    console.error('Create shipment error:', error);
    showNotification(`Failed to create shipment: ${error.message}`, 'error');
  } finally {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Open update modal
function openUpdateModal(trackingId) {
  const shipment = shipmentsData[trackingId];
  if (!shipment) return;

  // Populate form
  document.getElementById('updateTrackingId').value = trackingId;
  document.getElementById('updateStatus').value = shipment.status;
  document.getElementById('updateLocation').value = shipment.currentLocation;
  document.getElementById('updateDescription').value = shipment.locationDescription || '';
  document.getElementById('updateCustomsStatus').value = shipment.customsStatus;

  // Populate coordinates if available
  if (shipment.currentLocationCoordinates) {
    document.getElementById('updateLocationLat').value =
      shipment.currentLocationCoordinates.latitude || '';
    document.getElementById('updateLocationLng').value =
      shipment.currentLocationCoordinates.longitude || '';
  } else {
    document.getElementById('updateLocationLat').value = '';
    document.getElementById('updateLocationLng').value = '';
  }

  // Show modal
  updateModal.style.display = 'flex';
}

// Close update modal
function closeUpdateModal() {
  updateModal.style.display = 'none';
  updateForm.reset();
}

// Handle update shipment
async function handleUpdateShipment(e) {
  e.preventDefault();

  const trackingId = document.getElementById('updateTrackingId').value;
  const status = document.getElementById('updateStatus').value;
  const location = document.getElementById('updateLocation').value;
  const description = document.getElementById('updateDescription').value;
  const customsStatus = document.getElementById('updateCustomsStatus').value;

  // Get coordinates
  const locationLat = parseFloat(document.getElementById('updateLocationLat').value);
  const locationLng = parseFloat(document.getElementById('updateLocationLng').value);

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Updating...';
  submitBtn.disabled = true;

  try {
    // Try backend API first
    if (window.apiClient) {
      const updateData = {
        status,
        currentLocation: location,
        locationDescription: description,
        customsStatus,
      };

      // Add coordinates if provided
      if (!isNaN(locationLat) && !isNaN(locationLng)) {
        updateData.currentLocationCoordinates = {
          latitude: locationLat,
          longitude: locationLng,
        };
      }

      const response = await window.apiClient.updateShipment(trackingId, updateData);
      if (response.success) {
        // Update local data
        shipmentsData[trackingId] = {
          ...shipmentsData[trackingId],
          ...updateData,
          lastUpdate: new Date().toISOString(),
        };

        // Update displays
        await updateStats();
        renderShipmentsList();

        // Close modal
        closeUpdateModal();

        // Show success message
        showNotification('Shipment updated successfully!', 'success');
        return;
      } else {
        throw new Error(response.message || 'Failed to update shipment');
      }
    }

    // Fallback to local update
    if (shipmentsData[trackingId]) {
      shipmentsData[trackingId].status = status;
      shipmentsData[trackingId].currentLocation = location;
      shipmentsData[trackingId].locationDescription = description;
      shipmentsData[trackingId].customsStatus = customsStatus;
      shipmentsData[trackingId].lastUpdate = new Date().toISOString();
    }

    // Update displays
    updateStats();
    renderShipmentsList();

    // Close modal
    closeUpdateModal();

    // Show success message
    showNotification('Shipment updated successfully!', 'success');
  } catch (error) {
    console.error('Update shipment error:', error);
    showNotification(`Failed to update shipment: ${error.message}`, 'error');
  } finally {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Delete shipment
async function deleteShipment(trackingId) {
  if (confirm(`Are you sure you want to delete shipment ${trackingId}?`)) {
    try {
      // Try backend API first
      if (window.apiClient) {
        const response = await window.apiClient.deleteShipment(trackingId);
        if (response.success) {
          // Remove from local data
          delete shipmentsData[trackingId];

          // Update displays
          await updateStats();
          renderShipmentsList();

          // Show success message
          showNotification('Shipment deleted successfully!', 'success');
          return;
        } else {
          throw new Error(response.message || 'Failed to delete shipment');
        }
      }

      // Fallback to local deletion
      delete shipmentsData[trackingId];
      updateStats();
      renderShipmentsList();
      showNotification('Shipment deleted successfully!', 'success');
    } catch (error) {
      console.error('Delete shipment error:', error);
      showNotification(`Failed to delete shipment: ${error.message}`, 'error');
    }
  }
}

// Generate automatic tracking ID
function generateTrackingId() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');

  return `SCS-${year}${month}${day}-${random}`;
}

// Auto-generate tracking ID when create form loads
document.addEventListener('DOMContentLoaded', () => {
  const newTrackingIdField = document.getElementById('newTrackingId');
  if (newTrackingIdField && !newTrackingIdField.value) {
    newTrackingIdField.value = generateTrackingId();
  }

  // Set minimum date to today for delivery date
  const deliveryDateField = document.getElementById('newDeliveryDate');
  if (deliveryDateField) {
    const today = new Date();
    const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
    deliveryDateField.min = minDate.toISOString().split('T')[0];

    // Set default to 7 days from now
    const defaultDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    deliveryDateField.value = defaultDate.toISOString().split('T')[0];
  }
});

// Export shipment data (for demo purposes)
function exportShipments() {
  const dataStr = JSON.stringify(shipmentsData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'shipments-export.json';
  link.click();
  URL.revokeObjectURL(url);
}

// Add export button functionality (if exists)
const exportBtn = document.getElementById('exportBtn');
if (exportBtn) {
  exportBtn.addEventListener('click', exportShipments);
}

// Message management functions

// Load messages from backend
async function loadMessages() {
  try {
    if (window.apiClient) {
      const response = await window.apiClient.getContactMessages();
      if (response.success) {
        messagesData = response.data.messages || [];
        renderMessagesList();
        updateMessageCount();
        return;
      }
    }

    // Fallback to empty array
    messagesData = [];
    renderMessagesList();
    updateMessageCount();
  } catch (error) {
    console.error('Error loading messages:', error);
    showNotification('Failed to load messages', 'error');
    // Fallback to empty array
    messagesData = [];
    renderMessagesList();
    updateMessageCount();
  }
}

// Render messages list
function renderMessagesList(filteredMessages = null) {
  if (!messagesList) return;

  const messages = filteredMessages || messagesData;

  if (messages.length === 0) {
    messagesList.innerHTML =
      '<p style="text-align: center; color: #64748b; padding: 2rem;">No messages found.</p>';
    return;
  }

  messagesList.innerHTML = messages
    .map(
      (message) => `
        <div class="message-item ${message.status === 'new' ? 'unread' : ''}">
            <div class="message-header">
                <div class="message-sender">
                    <h4>${message.name}</h4>
                    <div class="email">${message.email}</div>
                    ${message.phone ? `<div class="phone">📞 ${message.phone}</div>` : ''}
                </div>
                <div class="message-meta">
                    <div class="message-status ${message.status}">${formatMessageStatus(
        message.status
      )}</div>
                    <div class="message-priority ${message.priority}">${message.priority}</div>
                    <div class="message-time">${new Date(
                      message.createdAt
                    ).toLocaleDateString()}</div>
                </div>
            </div>
            <div class="message-content">
                ${message.message ? `<p><strong>Message:</strong> ${message.message}</p>` : ''}
                ${
                  message.shipmentValue
                    ? `<p><strong>Shipment Value:</strong> ${message.shipmentValue}</p>`
                    : ''
                }
                ${message.service ? `<p><strong>Service:</strong> ${message.service}</p>` : ''}
            </div>
            <div class="message-actions">
                <button class="btn btn-small btn-primary" onclick="openReplyModal('${
                  message._id
                }')">Reply</button>
                <button class="btn btn-small btn-outline" onclick="markAsRead('${
                  message._id
                }')">Mark as Read</button>
                <button class="btn btn-small btn-outline" onclick="deleteMessage('${
                  message._id
                }')">Delete</button>
            </div>
        </div>
    `
    )
    .join('');
}

// Filter messages
function filterMessages() {
  const statusValue = messageStatusFilter ? messageStatusFilter.value : '';
  const priorityValue = messagePriorityFilter ? messagePriorityFilter.value : '';

  const filtered = messagesData.filter((message) => {
    const matchesStatus = !statusValue || message.status === statusValue;
    const matchesPriority = !priorityValue || message.priority === priorityValue;

    return matchesStatus && matchesPriority;
  });

  renderMessagesList(filtered);
}

// Update message count badge
function updateMessageCount() {
  if (messageCount) {
    const newMessages = messagesData.filter((m) => m.status === 'new').length;
    if (newMessages > 0) {
      messageCount.textContent = newMessages;
      messageCount.style.display = 'inline';
    } else {
      messageCount.style.display = 'none';
    }
  }
}

// Format message status
function formatMessageStatus(status) {
  const statusMap = {
    new: 'New',
    read: 'Read',
    replied: 'Replied',
    closed: 'Closed',
  };
  return statusMap[status] || status;
}

// Open reply modal
function openReplyModal(messageId) {
  const message = messagesData.find((m) => m._id === messageId);
  if (!message) return;

  // Populate message details
  messageDetails.innerHTML = `
        <div class="message-detail-row">
            <span class="message-detail-label">From:</span>
            <span class="message-detail-value">${message.name} (${message.email})</span>
        </div>
        ${
          message.phone
            ? `
        <div class="message-detail-row">
            <span class="message-detail-label">Phone:</span>
            <span class="message-detail-value">${message.phone}</span>
        </div>
        `
            : ''
        }
        <div class="message-detail-row">
            <span class="message-detail-label">Service:</span>
            <span class="message-detail-value">${message.service || 'Not specified'}</span>
        </div>
        <div class="message-detail-row">
            <span class="message-detail-label">Shipment Value:</span>
            <span class="message-detail-value">${message.shipmentValue || 'Not specified'}</span>
        </div>
        <div class="message-detail-row">
            <span class="message-detail-label">Message:</span>
            <span class="message-detail-value">${message.message || 'No message'}</span>
        </div>
    `;

  // Set message ID
  document.getElementById('replyMessageId').value = messageId;

  // Show modal
  replyModal.style.display = 'flex';
}

// Close reply modal
function closeReplyModalHandler() {
  replyModal.style.display = 'none';
  replyForm.reset();
}

// Handle reply submit
async function handleReplySubmit(e) {
  e.preventDefault();

  const messageId = document.getElementById('replyMessageId').value;
  const replyMessage = document.getElementById('replyMessage').value;

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    if (window.apiClient) {
      const response = await window.apiClient.replyToMessage(messageId, { replyMessage });
      if (response.success) {
        showNotification('Reply sent successfully!', 'success');
        closeReplyModalHandler();
        await loadMessages(); // Reload messages
      } else {
        throw new Error(response.message || 'Failed to send reply');
      }
    } else {
      throw new Error('API client not available');
    }
  } catch (error) {
    console.error('Reply error:', error);
    showNotification(`Failed to send reply: ${error.message}`, 'error');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Mark message as read
async function markAsRead(messageId) {
  try {
    if (window.apiClient) {
      const response = await window.apiClient.updateMessageStatus(messageId, { status: 'read' });
      if (response.success) {
        showNotification('Message marked as read', 'success');
        await loadMessages(); // Reload messages
      } else {
        throw new Error(response.message || 'Failed to update message status');
      }
    } else {
      throw new Error('API client not available');
    }
  } catch (error) {
    console.error('Mark as read error:', error);
    showNotification(`Failed to update message status: ${error.message}`, 'error');
  }
}

// Delete message
async function deleteMessage(messageId) {
  if (confirm('Are you sure you want to delete this message?')) {
    try {
      // Note: We don't have a delete endpoint in the backend, so we'll just remove from local data
      // In a real implementation, you would add a DELETE endpoint to the backend
      messagesData = messagesData.filter((m) => m._id !== messageId);
      renderMessagesList();
      updateMessageCount();
      showNotification('Message deleted', 'success');
    } catch (error) {
      console.error('Delete message error:', error);
      showNotification('Failed to delete message', 'error');
    }
  }
}

// Map Picker functionality
let mapPickerInstance = null;
let mapPickerMarker = null;
let mapPickerGeocoder = null;
let currentMapPickerField = null;

// Open map picker modal
async function openMapPicker(field) {
  currentMapPickerField = field;
  const modal = document.getElementById('mapPickerModal');
  const title = document.getElementById('mapPickerTitle');

  // Set title based on field
  const titles = {
    origin: 'Select Origin Location',
    destination: 'Select Destination Location',
    current: 'Select Current Location',
    updateCurrent: 'Select Current Location',
  };
  title.textContent = titles[field] || 'Select Location on Map';

  modal.style.display = 'flex';

  // Initialize map if not already done
  if (!mapPickerInstance && window.google && window.google.maps) {
    await initMapPicker();
  } else if (mapPickerInstance) {
    // Reset map to default view
    mapPickerInstance.setCenter({ lat: 20, lng: 0 });
    mapPickerInstance.setZoom(2);
  }
}

// Initialize map picker
async function initMapPicker() {
  if (!window.google || !window.google.maps) {
    console.error('Google Maps API not loaded');
    return;
  }

  const mapElement = document.getElementById('mapPicker');
  if (!mapElement) return;

  mapPickerGeocoder = new google.maps.Geocoder();

  const { Map } = await google.maps.importLibrary('maps');
  const markerLib = await google.maps.importLibrary('marker');
  const AdvancedMarkerElement = markerLib.AdvancedMarkerElement;

  mapPickerInstance = new Map(mapElement, {
    center: { lat: 20, lng: 0 },
    zoom: 2,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
  });

  // Create marker
  if (AdvancedMarkerElement) {
    mapPickerMarker = new AdvancedMarkerElement({
      map: mapPickerInstance,
      position: { lat: 20, lng: 0 },
    });
  } else {
    mapPickerMarker = new google.maps.Marker({
      map: mapPickerInstance,
      position: { lat: 20, lng: 0 },
    });
  }

  // Handle map clicks
  mapPickerInstance.addListener('click', (e) => {
    const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    updateMapPickerMarker(position);
    reverseGeocode(position);
  });

  // Handle confirm button
  document.getElementById('confirmMapPicker').addEventListener('click', confirmMapPicker);

  // Handle cancel button
  document.getElementById('cancelMapPicker').addEventListener('click', closeMapPicker);
  document.getElementById('closeMapPicker').addEventListener('click', closeMapPicker);
}

// Update map picker marker position
function updateMapPickerMarker(position) {
  if (mapPickerMarker) {
    if (mapPickerMarker.position !== undefined) {
      mapPickerMarker.position = position;
    } else {
      mapPickerMarker.setPosition(position);
    }
    mapPickerInstance.setCenter(position);
    mapPickerInstance.setZoom(10);
  }

  // Update coordinate inputs
  document.getElementById('mapPickerLat').value = position.lat.toFixed(6);
  document.getElementById('mapPickerLng').value = position.lng.toFixed(6);
}

// Reverse geocode coordinates to address
function reverseGeocode(position) {
  if (!mapPickerGeocoder) return;

  mapPickerGeocoder.geocode({ location: position }, (results, status) => {
    if (status === 'OK' && results[0]) {
      document.getElementById('mapPickerAddress').value = results[0].formatted_address;
    }
  });
}

// Search address and update map
function searchAddress() {
  const address = document.getElementById('mapPickerAddress').value;
  if (!address || !mapPickerGeocoder) return;

  mapPickerGeocoder.geocode({ address }, (results, status) => {
    if (status === 'OK' && results[0]) {
      const position = results[0].geometry.location;
      updateMapPickerMarker({ lat: position.lat(), lng: position.lng() });
    } else {
      alert('Address not found. Please try a different address.');
    }
  });
}

// Confirm map picker selection
function confirmMapPicker() {
  const lat = parseFloat(document.getElementById('mapPickerLat').value);
  const lng = parseFloat(document.getElementById('mapPickerLng').value);
  const address = document.getElementById('mapPickerAddress').value;

  if (isNaN(lat) || isNaN(lng)) {
    alert('Please select a location on the map or enter valid coordinates.');
    return;
  }

  // Update the appropriate form fields based on currentMapPickerField
  if (currentMapPickerField === 'origin') {
    document.getElementById('newOriginLat').value = lat;
    document.getElementById('newOriginLng').value = lng;
    if (address) document.getElementById('newOrigin').value = address;
  } else if (currentMapPickerField === 'destination') {
    document.getElementById('newDestinationLat').value = lat;
    document.getElementById('newDestinationLng').value = lng;
    if (address) document.getElementById('newDestination').value = address;
  } else if (currentMapPickerField === 'current') {
    document.getElementById('newCurrentLocationLat').value = lat;
    document.getElementById('newCurrentLocationLng').value = lng;
    if (address) document.getElementById('newCurrentLocation').value = address;
  } else if (currentMapPickerField === 'updateCurrent') {
    document.getElementById('updateLocationLat').value = lat;
    document.getElementById('updateLocationLng').value = lng;
    if (address) document.getElementById('updateLocation').value = address;
  }

  closeMapPicker();
}

// Close map picker modal
function closeMapPicker() {
  document.getElementById('mapPickerModal').style.display = 'none';
  document.getElementById('mapPickerAddress').value = '';
  currentMapPickerField = null;
}

// Auto-geocode address to fill coordinates
async function autoGeocodeAddress(addressFieldId, latFieldId, lngFieldId) {
  const addressInput = document.getElementById(addressFieldId);
  const latInput = document.getElementById(latFieldId);
  const lngInput = document.getElementById(lngFieldId);

  // Skip if coordinates are already filled
  if (latInput.value && lngInput.value) return;

  const address = addressInput.value.trim();
  if (!address || !window.google || !window.google.maps) return;

  try {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        latInput.value = location.lat().toFixed(6);
        lngInput.value = location.lng().toFixed(6);
      }
    });
  } catch (error) {
    console.error('Auto-geocode error:', error);
  }
}

// Make functions available globally
window.openMapPicker = openMapPicker;
window.searchAddress = searchAddress;

// Utility function for showing notifications
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}
