document.querySelector(".auth-form").addEventListener("submit", function (e) {
  const name = this.querySelector('input[placeholder="Full Name"]').value;
  const dob = this.querySelector('input[type="date"]').value;
  const email = this.querySelector('input[placeholder="Gmail"]').value;
  const mobile = this.querySelector('input[placeholder="Mobile Number"]').value;

  if (!name || !dob || !email || !mobile) {
    alert("Please fill in all fields.");
    e.preventDefault();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid Gmail address.");
    e.preventDefault();
    return;
  }

  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    e.preventDefault();
    return;
  }
});
