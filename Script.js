// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      // Submit to backend API
      if (window.apiClient) {
        const response = await window.apiClient.submitContactMessage(data);

        if (response.success) {
          showNotification(
            "Thank you for your message! We'll get back to you within 24 hours.",
            'success'
          );
          this.reset();
        } else {
          throw new Error(response.message || 'Failed to send message');
        }
      } else {
        throw new Error('API client not available');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showNotification(
        `Failed to send message: ${error.message}. Please try again or call us directly.`,
        'error'
      );
    } finally {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#2563eb'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        ">
            ${message}
        </div>
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.firstElementChild.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.firstElementChild.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
  // Set initial styles for animations
  const animatedElements = document.querySelectorAll(
    '.service-card, .pricing-card, .step, .testimonial'
  );
  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Service card animations
document.querySelectorAll('.service-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    const icon = card.querySelector('.service-icon');
    icon.style.transform = 'scale(1.2) rotate(5deg)';
    icon.style.transition = 'transform 0.3s ease';
  });

  card.addEventListener('mouseleave', () => {
    const icon = card.querySelector('.service-icon');
    icon.style.transform = 'scale(1) rotate(0deg)';
  });
});

// Dynamic stats counter (when stats section comes into view)
function animateStats() {
  const stats = document.querySelectorAll('.stat h3');
  const statsSection = document.querySelector('.stats');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        stats.forEach((stat) => {
          const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
          const suffix = stat.textContent.replace(/[\d]/g, '');
          let current = 0;
          const increment = target / 100;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(current).toLocaleString() + suffix;
            }
          }, 20);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }
}

// Initialize stats animation
animateStats();

// Form validation with real-time feedback
document.addEventListener('DOMContentLoaded', () => {
  const formInputs = document.querySelectorAll(
    '.contact-form input, .contact-form select, .contact-form textarea'
  );

  formInputs.forEach((input) => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
});

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  // Remove existing error styles
  field.classList.remove('error');
  removeErrorMessage(field);

  // Validate based on field type
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    showFieldError(field, 'This field is required');
  } else if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      showFieldError(field, 'Please enter a valid email address');
    }
  } else if (field.name === 'shipment-value' && value) {
    const numValue = parseFloat(value.replace(/[^\d.]/g, ''));
    if (isNaN(numValue) || numValue < 14350) {
      isValid = false;
      showFieldError(field, 'Minimum shipment value is $14,350 USDT');
    }
  }

  return isValid;
}

function showFieldError(field, message) {
  field.classList.add('error');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
  errorDiv.textContent = message;

  field.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(field) {
  const errorDiv = field.parentNode.querySelector('.field-error');
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Add error styles
const style = document.createElement('style');
style.textContent = `
    .contact-form input.error,
    .contact-form select.error,
    .contact-form textarea.error {
        border-color: #ef4444 !important;
        background-color: #fef2f2;
    }
`;
document.head.appendChild(style);

// Load API client
document.addEventListener('DOMContentLoaded', () => {
  // Load API client script
  const script = document.createElement('script');
  script.src = 'backend/utils/apiClient.js';
  script.onload = () => {
    console.log('API Client loaded successfully');
    // Test API connection
    testApiConnection();
  };
  script.onerror = () => {
    console.error('Failed to load API Client');
    showNotification('API client failed to load. Some features may not work properly.', 'error');
  };
  document.head.appendChild(script);
});

// Test API connection
async function testApiConnection() {
  try {
    if (window.apiClient) {
      const response = await window.apiClient.healthCheck();
      if (response.success) {
        console.log('API connection successful');
      } else {
        console.warn('API health check failed');
      }
    }
  } catch (error) {
    console.warn('API connection test failed:', error);
  }
}
