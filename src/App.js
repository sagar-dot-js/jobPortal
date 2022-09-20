import React, { useEffect, useState } from "react";
var geolocation = require("geolocation");

const App = () => {
  let [currntLocation, setCurrntLocation] = useState();
  let getCurrntLocation = () => {
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err;
      setCurrntLocation(position);
    });
  };

  function toRad(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function calculateDistance() {
    if (!currntLocation) {
      console.log("Loading...");
    } else {
      var lat1 = currntLocation?.coords.latitude;
      var lon1 = currntLocation?.coords.longitude;
      var lat2 = 19.05173554859482;
      var lon2 = 72.93142634316389;
      var radiusOfEarth = 6371;
      var lattitudeDifference = lat2 - lat1;
      var dLat = toRad(lattitudeDifference);
      var longitudeDifference = lon2 - lon1;
      var dLon = toRad(longitudeDifference);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = radiusOfEarth * c;
      distance = parseFloat(distance).toFixed(2);
      var distanceInMiles = 0.62137119 * distance;
      distanceInMiles = parseFloat(distanceInMiles).toFixed(2);
      console.log(distance);
    }
  }
  calculateDistance();

  console.log(currntLocation?.coords);

  // setInterval(getCurrntLocation, 5000);

  useEffect(() => {
    getCurrntLocation();
  }, []);

  return (
    <div>
      <p>
        latitude: {currntLocation ? currntLocation?.coords.latitude : "Loading"}
      </p>
      <p>
        longitude:{" "}
        {currntLocation ? currntLocation?.coords.longitude : "Loading"}{" "}
      </p>
    </div>
  );
};

export default App;
