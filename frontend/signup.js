document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm"); // ✅ ADDED!

  // ========== SIGNUP ==========
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirm-password").value.trim();
      console.log({ username, email, password, confirmPassword });
      

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })
        .then(res => res.text())
        .then(data => {
          if (data.trim() === "User registered successfully") {
            alert("🎉 You have successfully registered! Now Login the account");
            // signupForm.reset();
            setTimeout(() => {
              window.location.href = "select.html";
            }, 1000); // ✅ redirect after signup
            signupForm.reset();
            
          } 
          else {
            alert(data);
          }
        })
        .catch(err => {
          console.error("Signup error:", err);
          alert("Signup error occurred");
        });
    });
  }

  // ========== LOGIN ==========
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then(res => res.text())
        .then(data => {
          console.log("Login response:", data);
          if (data.trim() === "Login successful") {
            // alert("🎉 You have successfully registered! Now Login the account");
            window.location.href = "select.html";
          } else {
            alert(data);
          }
        })
        .catch(err => {
          console.error("Login error:", err);
          alert("Error during login.");
        });
    });
  }
});
