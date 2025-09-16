// API Client utility for frontend integration
class ApiClient {
  constructor(baseURL = 'https://fedex-ec01.onrender.com/api') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Get headers for API requests
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Make API request
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Authentication methods
  async login(username, password) {
    const response = await this.post('/auth/login', { username, password });
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async logout() {
    const response = await this.post('/auth/logout');
    this.removeToken();
    return response;
  }

  async getProfile() {
    return this.get('/auth/profile');
  }

  // Shipment methods
  async getShipments(params = {}) {
    return this.get('/shipments', params);
  }

  async getShipmentByTrackingId(trackingId) {
    return this.get(`/shipments/tracking/${trackingId}`);
  }

  async createShipment(shipmentData) {
    return this.post('/shipments', shipmentData);
  }

  async updateShipment(trackingId, updateData) {
    return this.put(`/shipments/${trackingId}`, updateData);
  }

  async deleteShipment(trackingId) {
    return this.delete(`/shipments/${trackingId}`);
  }

  async getDashboardStats() {
    return this.get('/shipments/stats/dashboard');
  }

  async generateTrackingId() {
    return this.get('/shipments/generate-tracking-id');
  }

  // Contact methods
  async submitContactMessage(messageData) {
    return this.post('/contact/submit', messageData);
  }

  async getContactMessages(params = {}) {
    return this.get('/contact/messages', params);
  }

  async getContactMessage(messageId) {
    return this.get(`/contact/messages/${messageId}`);
  }

  async updateMessageStatus(messageId, statusData) {
    return this.put(`/contact/messages/${messageId}/status`, statusData);
  }

  async replyToMessage(messageId, replyData) {
    return this.post(`/contact/messages/${messageId}/reply`, replyData);
  }

  async getContactStats() {
    return this.get('/contact/stats');
  }

  // Health check
  async healthCheck() {
    return this.get('/health');
  }
}

// Create global instance
window.apiClient = new ApiClient();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApiClient;
}
