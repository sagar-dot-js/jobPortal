import Axios from "axios";
import React, { useState } from "react";
import { ReactSession } from "react-client-session";

// useEffect(() => {}, []);

const Login = ({ setLoggedIn, loggedIn }) => {
  let [userDetails, setUserDetails] = useState();

  let base = "http://localhost:3001";

  let handelinputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  let UserLogin = () => {
    Axios.post(`${base}/api/v1/login`, userDetails).then((result) => {
      if (result?.data?.loginStatus) {
        setLoggedIn({
          ...loggedIn,
          loginStatus: true,
          UserData: result?.data?.loggedUser,
        });
        ReactSession.set("token", result.data.jwtToken);
      } else {
        console.log("False");
      }
    });
  };

  return (
    <div>
      <div className="border w-[500px] h-[400px] p-10">
        <table className=" login-table">
          <tr>
            <td> Email</td>
            <td>
              {" "}
              <input
                type="email"
                className="customTextbox"
                name="email"
                onChange={(e) => {
                  handelinputChange(e);
                }}
              />
            </td>
          </tr>
          <tr>
            <td> Password</td>
            <td>
              {" "}
              <input
                type="password"
                className="customTextbox"
                name="password"
                onChange={(e) => {
                  handelinputChange(e);
                }}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td> </td>
            <td>
              {" "}
              <div className="w-full flex gap-5">
                <button
                  className="px-2 py-1 border hover:bg-sky-500 hover:text-white transition"
                  onClick={() => {
                    UserLogin();
                  }}
                >
                  Login
                </button>{" "}
                <button className="px-2 py-1 border hover:bg-sky-500 hover:text-white transition">
                  {" "}
                  Add User
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Login;
