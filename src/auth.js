class Auth {
  constructor() {
    // Initialize the state by reading the truth from localStorage
    this.authenticated = this.isAuthenticated();
  }

  login(cb) {
    // 1. Set the class state
    this.authenticated = true;
    // 2. Persist the state to localStorage
    localStorage.setItem('loggedin', 'true');
    // 3. Execute the callback (e.g., navigate to dashboard)
    cb();
  }

  logout(cb) {
    // 1. Set the class state
    this.authenticated = false;
    // 2. Remove the item from localStorage
    localStorage.removeItem('loggedin');
    // 3. Execute the callback (e.g., navigate to login)
    cb();
  }

  isAuthenticated() {
    // Check localStorage for the source of truth.
    // Returns true only if the item exists and is set to 'true'
    return localStorage.getItem('loggedin') === 'true';
  }
}

export default new Auth();
