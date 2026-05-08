/**
 * THE EMPIRE FOUNDATION - Frontend JavaScript
 * Social Welfare Platform
 */

// API Base URL - uses relative path since frontend is served by the same server
const API_BASE = 'https://empire-foundation.onrender.com';

// ========================================
// DOM Elements
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initEmergencyModal();
    initContactForm();
    initNewsletterForm();
    initServiceCards();
    initCounters();
    loadStats();
});

// ========================================
// volunteer
// ========================================

const volunteerForm = document.getElementById("volunteerForm");

if (volunteerForm) {
  volunteerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("v_name").value,
      email: document.getElementById("v_email").value,
      phone: document.getElementById("v_phone").value,
      city: document.getElementById("v_city").value,
      whyJoin: document.getElementById("v_whyJoin").value,
    };

    try {
      const res = await fetch(`${API_BASE}/api/volunteer/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      const msg = document.getElementById("volunteerMsg");

      if (result.success) {
        msg.style.color = "green";
        msg.innerText = result.message;
        volunteerForm.reset();
      } else {
        msg.style.color = "red";
        msg.innerText = result.message;
      }
    } catch (error) {
      console.error(error);
    }
  });
}


// ========================================
// Navigation
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 50) {
    //         navbar.classList.add('scrolled');
    //     } else {
    //         navbar.classList.remove('scrolled');
    //     }
    // });
    if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ========================================
// Scroll Effects
// ========================================
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// Emergency Modal
// ========================================
function initEmergencyModal() {
    const sosBtn = document.getElementById('sosBtn');
    const emergencyModal = document.getElementById('emergencyModal');
    const modalClose = document.getElementById('modalClose');

    if (sosBtn && emergencyModal) {
        sosBtn.addEventListener('click', () => {
            emergencyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (modalClose && emergencyModal) {
        modalClose.addEventListener('click', () => {
            emergencyModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close on outside click
    if (emergencyModal) {
        emergencyModal.addEventListener('click', (e) => {
            if (e.target === emergencyModal) {
                emergencyModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Emergency action buttons
    const emergencyBtns = document.querySelectorAll('.emergency-btn');
    emergencyBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const type = btn.classList.contains('ambulance') ? 'ambulance' :
                        btn.classList.contains('police') ? 'police' :
                        btn.classList.contains('fire') ? 'fire' : 'blood';
            
            await sendSOS(type);
        });
    });
}


// ========moveup bottom sos=============
// const sosContainer = document.querySelector(".sos-container");
// const footer = document.querySelector(".footer");

// window.addEventListener("scroll", () => {

//     const footerRect = footer.getBoundingClientRect();
//     const windowHeight = window.innerHeight;

//     if (footerRect.top < windowHeight) {
//         const overlap = windowHeight - footerRect.top;
//         sosContainer.style.bottom = overlap + 20 + "px";
//     } else {
//         sosContainer.style.bottom = "20px";
//     }

// });

const sosContainer = document.querySelector(".sos-container");
const footer = document.querySelector(".footer");

if (sosContainer && footer) {
    window.addEventListener("scroll", () => {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top < windowHeight) {
            const overlap = windowHeight - footerRect.top;
            sosContainer.style.bottom = overlap + 20 + "px";
        } else {
            sosContainer.style.bottom = "20px";
        }
    });
}
// ========================================
// Contact Form
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                // interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(`${API_BASE}/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    showAlert('success', data.message);
                    contactForm.reset();
                } else {
                    showAlert('error', data.message || 'Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert('error', 'Failed to send message. Please try again.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// ========================================
// Newsletter Form
// ========================================
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (!email) {
                showAlert('error', 'Please enter your email address');
                return;
            }

            const submitBtn = form.querySelector('button');
            const originalIcon = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

            try {
                const response = await fetch(`${API_BASE}/api/newsletter`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (data.success) {
                    showAlert('success', data.message);
                    emailInput.value = '';
                } else {
                    showAlert('error', data.message || 'Failed to subscribe');
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert('error', 'Failed to subscribe. Please try again.');
            } finally {
                submitBtn.innerHTML = originalIcon;
            }
        });
    });
}

// ========================================
// Service Cards
// ========================================
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.service-btn');
        
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                const service = card.dataset.service;
                handleServiceClick(service);
            });
        }
    });
}

function handleServiceClick(service) {
    // Map services to their corresponding sections or modals
    const serviceMap = {
        'emergency': () => {
            const sosBtn = document.getElementById('sosBtn');
            if (sosBtn) sosBtn.click();
        },
        'ngo': () => {
            // Scroll to contact section for NGO partnership
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            showAlert('info', 'Interested in partnering as an NGO? Fill out the contact form!');
        },
        'blood': () => {
            showAlert('info', 'Blood Donor service - Contact us for emergency blood requirements!');
        },
        'skills': () => {
            showAlert('info', 'Skill Development programs coming soon!');
        },
        'food': () => {
            showAlert('info', 'Food Sharing Network - Coming soon!');
        },
        'govt': () => {
            showAlert('info', 'Government Scheme Guidance - Coming soon!');
        }
    };

    if (serviceMap[service]) {
        serviceMap[service]();
    } else {
        showAlert('info', 'This service is coming soon!');
    }
}

// ========================================
// Counter Animation
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    };

    // Observe counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ========================================
// Load Stats from API
// ========================================
async function loadStats() {
    try {
        const response = await fetch(`${API_BASE}/api/stats`);
        const result = await response.json();
        
        if (result.success) {
            const stats = result.data;
            
            // Update hero stats if they exist
            const statNumbers = document.querySelectorAll('.stat-number[data-count]');
            if (statNumbers.length > 0) {
                // Use API data if available, otherwise keep default
                if (stats.volunteers > 0) {
                    const volunteerStat = document.querySelector('.stat-item:nth-child(2) .stat-number');
                    if (volunteerStat) {
                        volunteerStat.dataset.count = stats.volunteers;
                        volunteerStat.textContent = stats.volunteers.toLocaleString();
                    }
                }
            }
        }
    } catch (error) {
        console.log('Stats API not available, using default values');
    }
}

// ========================================
// SOS Alert
// ========================================
async function sendSOS(type) {
    try {
        navigator.geolocation.getCurrentPosition(async (position) => {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const location = `${lat},${lng}`;

            const name = localStorage.getItem('userName') || 'Guest';
            const phone = localStorage.getItem('userPhone') || 'Not provided';

            const response = await fetch(`${API_BASE}/api/sos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    location: location,
                    type: type,
                    message: `Emergency: ${type} assistance needed`
                })
            });

            const data = await response.json();
            
            if (data.success) {
                showAlert('success', `${data.message} (Alert ID: ${data.alertId})`);
                
                const emergencyModal = document.getElementById('emergencyModal');
                if (emergencyModal) {
                    emergencyModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            } else {
                showAlert('error', 'Failed to send SOS. Please call emergency services directly.');
            }

        }, () => {
            showAlert('error', 'Location access denied');
        });

    } catch (error) {
        console.error('SOS Error:', error);
        showAlert('error', 'Failed to send SOS. Please call emergency services directly.');
    }
}

// ========================================
// Alert/Notification System
// ========================================
function showAlert(type, message) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="alert-close"><i class="fas fa-times"></i></button>
    `;

    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    // Type-specific colors
    const colors = {
        success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
        error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
        info: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' }
    };

    const color = colors[type] || colors.info;
    alert.style.background = color.bg;
    alert.style.color = color.color;
    alert.style.border = `1px solid ${color.border}`;

    // Add animation keyframes if not exists
    if (!document.querySelector('#alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Close button
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);

    document.body.appendChild(alert);
}

// ========================================
// API Helper Functions
// ========================================

// Fetch blood donors
async function getBloodDonors(filters = {}) {
    try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/api/blood-donors?${params}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching blood donors:', error);
        return { success: false, data: [] };
    }
}

// Fetch NGOs
async function getNGOs(filters = {}) {
    try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/api/ngos?${params}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching NGOs:', error);
        return { success: false, data: [] };
    }
}

// Fetch jobs
async function getJobs(filters = {}) {
    try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/api/jobs?${params}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return { success: false, data: [] };
    }
}

// Fetch schemes
async function getSchemes(filters = {}) {
    try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/api/schemes?${params}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching schemes:', error);
        return { success: false, data: [] };
    }
}

// Fetch emergency contacts
async function getEmergencyContacts() {
    try {
        const response = await fetch(`${API_BASE}/api/emergency/contacts`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching emergency contacts:', error);
        return { success: false, data: [] };
    }
}


//Waste location 
const wasteForm = document.getElementById("wasteForm");

if (wasteForm && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            document.getElementById("wasteLatitude").value = position.coords.latitude;
            document.getElementById("wasteLongitude").value = position.coords.longitude;
        },
        (error) => {
            console.log("Location permission denied");
        }
    );
}


if (wasteForm) {
  wasteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const msg = document.getElementById('wasteMsg');
    const formData = new FormData();

    formData.append('image', document.getElementById('wasteImage').files[0]);
    formData.append('address', document.getElementById('wasteLocation').value);
    formData.append('latitude', document.getElementById('wasteLatitude').value);
    formData.append('longitude', document.getElementById('wasteLongitude').value);
    formData.append('issueType', document.getElementById('issueType').value);
    formData.append('description', document.getElementById('wasteDescription').value);

    try {
      const response = await fetch(`${API_BASE}/api/waste`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        msg.style.color = 'green';
        msg.innerText = 'Waste report submitted successfully!';
        setTimeout(() => {
            msg.innerText = '';
        }, 3000);
        
      }
    else {
        msg.style.color = 'red';
        msg.innerText = data.message;
      }

    } catch (error) {
      console.error(error);
      msg.style.color = 'red';
      msg.innerText = 'Failed to submit waste report';
      setTimeout(() => {
            msg.innerText = '';
      }, 4000);
    }
  });
}


// ========================================
// Export for use in console (debugging)
// ========================================
window.EmpireAPI = {
    getBloodDonors,
    getNGOs,
    getJobs,
    getSchemes,
    getEmergencyContacts,
    sendSOS,
    showAlert
};

console.log('🏥 THE EMPIRE FOUNDATION - Frontend Loaded');
console.log('Available API functions:', Object.keys(window.EmpireAPI));
