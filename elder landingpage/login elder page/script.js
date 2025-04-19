document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "https://digital-dreams-ovk2.onrender.com/auth";

  // Signup Handler
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
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

      try {
        const response = await fetch(`${API_URL}/signup/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: email,
            password,
            full_name: fullName,
            dob,
            mobile,
          }),
        });

        const data = await response.json();
        console.log("Signup response:", response.status, data);

        if (response.ok) {
          alert("Signup successful! You can now log in.");
          window.location.href = "login.html";
        } else {
          alert(data.error || "Signup failed.");
        }
      } catch (err) {
        console.error("Signup error:", err);
        alert("Server error. Try again later.");
      }
    });
  }

  // Login Handler
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Validate inputs
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
        });

        const data = await response.json();
        console.log("Login response:", response.status, data);

        if (response.ok) {
          localStorage.setItem("loggedInUser", email);

          window.location.href = "../../elder dashboard/elderindex.html";

          // For debugging, log the redirect URL
          console.log(
            "Redirecting to:",
            "/family%20dashboard/familylandingpage.html"
          );

          // Show success message
          const successMsg = document.getElementById("successMessage");
          if (successMsg) {
            successMsg.style.display = "block";
          }
        } else {
          alert(data.error || "Login failed.");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Server error. Try again later.");
      }
    });
  }

  // Debug output
  console.log("Script loaded successfully");
});
