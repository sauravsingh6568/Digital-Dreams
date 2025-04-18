document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "https://digital-dreams-ovk2.onrender.com/auth";

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email || !password) {
        alert("Please fill in all fields.");
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
          document.getElementById("successMessage").style.display = "block";
          setTimeout(() => {
            window.location.href = "/life sync app/land.html";
          }, 1500);
        } else {
          alert(data.error || "Login failed.");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Server error. Try again later.");
      }
    });
  }

  console.log("Script loaded successfully");
});
