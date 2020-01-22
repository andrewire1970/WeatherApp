window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/1e484c7203fc448b6a95528d449d3971/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;

          temperatureDegree.textContent = Math.round(
            (temperature - 32) * (5 / 9)
          );
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //SETTING ICONS
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "aliceblue" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
console.log("fuck");
