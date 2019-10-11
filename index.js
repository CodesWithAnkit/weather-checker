window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temprature-degree");

  let locationTimezone = document.querySelector(".location-timezone");

  let temperatureSection = document.querySelector(".degree-section");

  let temperatureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const url = "https://cors-anywhere.herokuapp.com/";

      const api = `${url}https://api.darksky.net/forecast/02a4937dcc54b58b8ca116427e128e5a/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;

          //   Set DOm Element from api

          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //   Changing the degree Formula
          let celsius = (temperature - 32) * (5 / 9);

          //   Set Icons
          setIcons(icon, document.querySelector(".icon"));

          //Change temperature fenerhiegth to celcius

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent == "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    // skycons.play();
    return skycons.set(iconID, skycons[currentIcon]);
  }
});
