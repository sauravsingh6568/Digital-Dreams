document.addEventListener("DOMContentLoaded", function () {
  // Signup Handler
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const dob = document.getElementById("dob").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      const password = document.getElementById("password").value;

      // Validate inputs
      if (!fullName || !dob || !email || !mobile || !password) {
        alert("Please fill in all fields");
        return;
      }

      // Save user data in localStorage
      const user = {
        fullName,
        dob,
        email,
        mobile,
        password,
      };

      localStorage.setItem(email, JSON.stringify(user));

      alert("Registration successful! You can now log in.");
      window.location.href = "login.html";
    });
  }

  // Login Handler
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Validate inputs
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }

      const userData = localStorage.getItem(email);

      if (userData) {
        const user = JSON.parse(userData);

        if (user.password === password) {
          alert("Login successful!");
          localStorage.setItem("loggedInUser", email);

          window.location.href = "/life%20sync%20app/firstpage.html";
        } else {
          alert("Incorrect password. Please try again.");
        }
      } else {
        alert("No account found with this email. Please sign up.");
      }
    });
  }

  // Debug output
  console.log("Script loaded successfully");
});
