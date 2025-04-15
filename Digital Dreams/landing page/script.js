// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navbarMenu = document.getElementById("navbar-menu");
  const animatedIcon = document.querySelector(".animated-icon");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navbarMenu.classList.toggle("show");
      animatedIcon.classList.toggle("open");
    });
  }

  // Profile Dropdown Toggle
  const profileToggle = document.getElementById("profile-toggle");
  const profileMenu = document.getElementById("profile-menu");

  if (profileToggle && profileMenu) {
    profileToggle.addEventListener("click", function (e) {
      e.preventDefault();
      profileMenu.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !profileToggle.contains(e.target) &&
        !profileMenu.contains(e.target)
      ) {
        profileMenu.classList.remove("show");
      }
    });
  }

  // AI Chatbot Toggle
  const chatToggle = document.getElementById("chat-toggle");
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const micBtn = document.getElementById("mic-btn");
  const chatMessages = document.getElementById("chat-messages");

  if (chatToggle && chatBox) {
    // Initialize chatbot
    chatToggle.addEventListener("click", function () {
      if (chatBox.style.display === "flex") {
        chatBox.style.display = "none";
      } else {
        chatBox.style.display = "flex";
        userInput.focus();

        // Add welcome message if first time opening
        if (chatMessages.children.length === 0) {
          addBotMessage(
            "Hello! I'm your LifeSync assistant. How can I help you today?"
          );
        }
      }
    });

    // Send message function
    function sendMessage() {
      const message = userInput.value.trim();
      if (message) {
        addUserMessage(message);
        userInput.value = "";

        // Simple bot response (would be replaced with actual AI in production)
        setTimeout(() => {
          let response;
          if (message.toLowerCase().includes("help")) {
            response =
              "I can help you with using LifeSync, setting up emergency contacts, or connecting with caregivers. What would you like to know?";
          } else if (
            message.toLowerCase().includes("sos") ||
            message.toLowerCase().includes("emergency")
          ) {
            response =
              "To use the SOS feature, simply tap the red emergency button on the home screen. This will immediately alert your caregivers.";
          } else if (
            message.toLowerCase().includes("video") ||
            message.toLowerCase().includes("call")
          ) {
            response =
              "To make a video call, go to the Contacts tab and select the person you want to call, then tap the video icon.";
          } else {
            response =
              "Thank you for your message. How else can I assist you with LifeSync today?";
          }
          addBotMessage(response);
        }, 1000);
      }
    }

    // Add user message to chat
    function addUserMessage(text) {
      const messageDiv = document.createElement("div");
      messageDiv.className = "user-message";
      messageDiv.style.textAlign = "right";
      messageDiv.style.margin = "10px 0";
      messageDiv.style.color = "#4e54c8";
      messageDiv.innerHTML = `<strong>You:</strong> ${text}`;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add bot message to chat
    function addBotMessage(text) {
      const messageDiv = document.createElement("div");
      messageDiv.className = "bot-message";
      messageDiv.style.margin = "10px 0";
      messageDiv.innerHTML = `<strong>LifeSync:</strong> ${text}`;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listeners for sending messages
    if (sendBtn) {
      sendBtn.addEventListener("click", sendMessage);
    }

    if (userInput) {
      userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          sendMessage();
        }
      });
    }

    if (micBtn) {
      micBtn.addEventListener("click", function () {
        addBotMessage(
          "Voice recognition is currently unavailable. Please type your message instead."
        );
      });
    }
  }

  // Map functionality
  function initMap() {
    if (document.getElementById("map")) {
      const locationStatus = document.getElementById("locationStatus");

      if (navigator.geolocation) {
        locationStatus.textContent = "Locating you...";

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            locationStatus.textContent = "Your current location";

            const map = new google.maps.Map(document.getElementById("map"), {
              center: userLocation,
              zoom: 15,
            });

            new google.maps.Marker({
              position: userLocation,
              map: map,
              title: "You are here",
            });
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                locationStatus.textContent =
                  "Location access denied. Please enable location services.";
                break;
              case error.POSITION_UNAVAILABLE:
                locationStatus.textContent =
                  "Location information unavailable.";
                break;
              case error.TIMEOUT:
                locationStatus.textContent =
                  "Request timed out. Please try again.";
                break;
              default:
                locationStatus.textContent = "An unknown error occurred.";
                break;
            }
          }
        );
      } else {
        locationStatus.textContent =
          "Geolocation is not supported by your browser.";
      }
    }
  }

  // Initialize map when Google Maps API loads
  if (window.google && google.maps) {
    initMap();
  } else {
    window.initMap = initMap;
  }
});
