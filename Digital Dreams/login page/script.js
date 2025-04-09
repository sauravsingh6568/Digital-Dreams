document.querySelector(".auth-form").addEventListener("submit", function (e) {
  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;

  if (!email || !password) {
    alert("Please fill in both email and password.");
    e.preventDefault();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    e.preventDefault();
    return;
  }
});
