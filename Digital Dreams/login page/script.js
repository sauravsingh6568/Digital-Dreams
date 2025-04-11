document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "http://127.0.0.1:8000/auth";

  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

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
          // ✅ Match old behavior
          window.location.href = "/life%20sync%20app/dash.html";
        } else {
          alert(data.error || "Login failed.");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Server error. Try again later.");
      }
    });
  }

  // SIGNUP
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const dob = document.getElementById("dob").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      const password = document.getElementById("password").value;

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

  console.log("Script loaded successfully");
});
