import { useEffect, useState } from "react";
import logo from "./logo.svg";
import Login from "./pages/Login";
import { ReactSession } from "react-client-session";
import Axios from "axios";

function App() {
  let [loggedIn, setLoggedIn] = useState({
    loginStatus: false,
  });

  let [tokenExist, setTokenExist] = useState(false);

  let base = "http://localhost:3001";

  ReactSession.setStoreType("localStorage");

  const token = ReactSession.get("token");
  console.log(token);

  let checkTokenInSession = () => {
    Axios.get(`${base}/api/v1/findSession`).then((result) => {
      console.log(result?.data?.jwtToken);
      if (token === result?.data?.jwtToken) {
        console.log("Match");
        setTokenExist(true);
      } else {
        console.log("Not match");
      }
    });
  };

  let logOut = () => {
    console.log("Log Out");
    ReactSession.set("token", "");
  };

  useEffect(() => {
    checkTokenInSession();
  }, []);

  return (
    <>
      <div className="text-2xl">Job Portal</div>
      <div className="text-blue-600  w-full h-screen flex items-center justify-center">
        {!tokenExist ? (
          <div>
            {loggedIn.loginStatus ? (
              `Already logged In Job Portal ${loggedIn?.userData}`
            ) : (
              <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
            )}
          </div>
        ) : (
          <p
            onClick={() => {
              logOut();
            }}
          >
            Log Out
          </p>
        )}
      </div>
    </>
  );
}

export default App;
