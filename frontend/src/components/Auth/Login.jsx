import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AlertCard from "../Cards/AlertCard";
import axios from "axios";
import { Typography } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [wrongData, setWrongData] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // console.log(data);
    const apiUrl =
      "https://noteme-the-blog-app-backend.onrender.com/api/auth/login";
    axios
      .post(apiUrl, data)
      .then((response) => {
        // Handle the successful response here
        // console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("jwtToken", response.data.token);
          // // Set a timer for 3 hours (in milliseconds)
          // const expirationTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 hours
          // // Store the expiration time in local storage
          // localStorage.setItem("logoutTime", expirationTime.toString());
          setTimeout(() => {
            localStorage.setItem("userLoggedIn", true);
            navigate("/");
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => {
        // Handle errors here
        setWrongData(!wrongData);
        console.error("Error authenticating user:", error);
      });
  };
  return (
    <div>
      {!localStorage.getItem("userLoggedIn") === true ? (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-column">
            <label>Email </label>
          </div>
          <div className="inputForm">
            <input
              type="email"
              className="input"
              placeholder="Enter your Email"
              {...register("email")}
              required={true}
            />
          </div>

          <div className="flex-column">
            <label>Password </label>
          </div>
          <div className="inputForm">
            <input
              type="password"
              className="input"
              placeholder="Enter your Password"
              {...register("password")}
              required={true}
            />
          </div>

          <button type="submit" className="button-submit">
            Sign In
          </button>
          <Typography
            variant="h6"
            color="red"
            align="center"
            sx={{ display: wrongData ? "initial" : "none" }}
          >
            Something Is wrong...😶
          </Typography>
          <p className="p">
            Don&apos;t have an account?{" "}
            <span className="span">
              <Link to="/auth/register">Sign Up</Link>
            </span>
          </p>
        </form>
      ) : (
        <AlertCard message="User logged in successfully" />
      )}
    </div>
  );
};

export default Login;
