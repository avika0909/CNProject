// Form Submission
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    // Validate password match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Simulate successful signup
    alert(`Signup Successful!\nUsername: ${username}\nEmail: ${email}`);
    // Redirect or perform other actions here
  });
  
  // Login Link Redirect
  document.getElementById('login-link').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Redirecting to Login Page...');
    // Replace with your login page URL
    window.location.href = 'login.html';
  });