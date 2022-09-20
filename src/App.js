import React, { useState } from "react";
var geolocation = require("geolocation");

const App = () => {
  let [location, setLocation] = useState();

  geolocation.getCurrentPosition(function (err, position) {
    if (err) throw err;

    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });

  console.log(location);
  return (
    <div className="h-screen w-full">
      <p>
        Lat: <span>{location?.latitude} </span>
      </p>
      <p>
        Long <span>{location?.longitude} </span>
      </p>
    </div>
  );
};

export default App;
