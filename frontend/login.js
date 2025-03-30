// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    alert(`Login Successful!\nUsername: ${username}\nPassword: ${password}`);
  });
  
  // Signup Link Redirect
  document.getElementById('signup-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Redirecting to Signup Page...');
    window.location.href = 'signup.html'; // Replace with your signup page URL
  });
  
  // Learn More Button
  document.getElementById('learn-more').addEventListener('click', () => {
    alert('Learn More clicked!');
  });