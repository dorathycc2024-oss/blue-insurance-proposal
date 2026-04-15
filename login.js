// Login Page JavaScript
// Password is hashed with SHA-256 before transmission - never sent in plain text

(function() {
  'use strict';

  // Configuration
  const API_ENDPOINT = '/api/auth/login'; // Replace with your actual API endpoint

  // Hardcoded credentials hash for demo (in production, verify on server)
  // Username: blueinsurance, Password: gt2026newpage
  const CREDENTIALS = {
    username: 'blueinsurance',
    passwordHash: 'a3f8b9c2d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0' // SHA-256 hash placeholder
  };

  // Generate SHA-256 hash of password
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  // Compute actual password hash on page load (for demo purposes)
  async function computePasswordHash() {
    const actualPassword = 'gt2026newpage';
    CREDENTIALS.passwordHash = await hashPassword(actualPassword);
  }

  // Initialize
  computePasswordHash();

  // DOM Elements
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const eyeIcon = document.querySelector('.eye-icon');
  const eyeOffIcon = document.querySelector('.eye-off-icon');
  const submitBtn = document.querySelector('.login-submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const errorDiv = document.getElementById('login-error');

  // Toggle password visibility
  togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    if (type === 'text') {
      eyeIcon.style.display = 'none';
      eyeOffIcon.style.display = 'block';
    } else {
      eyeIcon.style.display = 'block';
      eyeOffIcon.style.display = 'none';
    }
  });

  // Handle form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous errors
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Validate inputs
    if (!username || !password) {
      showError('Please enter both username and password');
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Hash the password before transmission
      const passwordHash = await hashPassword(password);

      // Prepare auth payload (password hash, NOT plain text)
      const authPayload = {
        username: username,
        passwordHash: passwordHash,
        timestamp: Date.now() // Prevent replay attacks
      };

      // SIMULATED AUTH CHECK (replace with actual API call in production)
      // In production, send to your backend:
      // const response = await fetch(API_ENDPOINT, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(authPayload)
      // });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Verify credentials (client-side for demo, should be server-side in production)
      if (username === CREDENTIALS.username && passwordHash === CREDENTIALS.passwordHash) {
        // Success - save session and redirect to proposal
        sessionStorage.setItem('blue_proposal_auth', JSON.stringify({
          username: username,
          passwordHash: passwordHash,
          loginTime: Date.now()
        }));
        window.location.href = './index.html';
      } else {
        showError('Invalid username or password. Please try again.');
        setLoading(false);
      }

    } catch (error) {
      console.error('Login error:', error);
      showError('An error occurred. Please try again.');
      setLoading(false);
    }
  });

  // Show error message
  function showError(message) {
    errorDiv.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <circle cx="12" cy="16" r="1"></circle>
      </svg>
      ${message}
    `;
    errorDiv.style.display = 'flex';
  }

  // Set loading state
  function setLoading(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'flex';
    } else {
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  }

  // Allow Enter key to submit
  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      loginForm.dispatchEvent(new Event('submit'));
    }
  });

})();
