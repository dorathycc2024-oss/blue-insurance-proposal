// Authentication Check - Protects the proposal page
// Checks for valid session token before allowing access

(function() {
  'use strict';

  const SESSION_KEY = 'blue_proposal_auth';
  const LOGIN_PAGE = './login.html';

  // Compute expected hash for validation
  async function computeExpectedHash() {
    const password = 'gt2026newpage';
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function validateSession() {
    try {
      const sessionData = sessionStorage.getItem(SESSION_KEY);

      if (!sessionData) {
        redirectToLogin();
        return;
      }

      const parsed = JSON.parse(sessionData);
      const expectedHash = await computeExpectedHash();

      // Validate username and password hash
      if (parsed.username === 'blueinsurance' && parsed.passwordHash === expectedHash) {
        // Valid session - allow access
        return;
      }

      // Invalid session
      sessionStorage.removeItem(SESSION_KEY);
      redirectToLogin();

    } catch (error) {
      console.error('Auth check error:', error);
      redirectToLogin();
    }
  }

  function redirectToLogin() {
    window.location.replace(LOGIN_PAGE);
  }

  // Run auth check immediately
  validateSession();

})();
