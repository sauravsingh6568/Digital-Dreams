// hamburge menue

const toggler = document.querySelector(".navbar-toggler");
toggler.addEventListener("click", () => {
  toggler.classList.toggle("collapsed");
});

// location
let map, marker;

function initMap(latitude, longitude) {
  const userLocation = { lat: latitude, lng: longitude };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: userLocation,
  });

  marker = new google.maps.Marker({
    position: userLocation,
    map: map,
    title: "You are here!",
  });
}

function updateMarker(latitude, longitude) {
  const newPosition = { lat: latitude, lng: longitude };
  marker.setPosition(newPosition);
  map.setCenter(newPosition);
}

window.onload = function () {
  const status = document.getElementById("locationStatus");

  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = "Tracking your live location...";

        if (!map) {
          initMap(latitude, longitude);
        } else {
          updateMarker(latitude, longitude);
        }
      },
      function (error) {
        status.textContent = "Unable to retrieve your location.";
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );
  } else {
    status.textContent = "Geolocation is not supported by your browser.";
  }
};

// chatbot
