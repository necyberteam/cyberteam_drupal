// Add current path to login url for redirect destination
const login = document.querySelector('.login-link')
login.href = "/user/login?destination=" + window.location.pathname