import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AlertCard from "../Cards/AlertCard";
import { useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [wrongData, setWrongData] = useState(false);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);

    const apiUrl =
      "https://noteme-the-blog-app-backend.onrender.com/api/auth/signup";
    axios
      .post(apiUrl, data)
      .then((response) => {
        // Handle the successful response here
        // console.log(response.data);
        if (response.data) {
          setTimeout(() => {
            setFlag(true);
            navigate(
              "https://noteme-the-blog-app-backend.onrender.com/auth/login"
            );
            // window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => {
        // Handle errors here
        setWrongData(!wrongData);
        console.error("Error creating user:", error);
      });
  };

  return (
    <div>
      {!flag ? (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-column">
            <label>Name </label>
          </div>
          <div className="inputForm">
            <input
              type="text"
              className="input"
              placeholder="Enter your Name"
              {...register("name", { required: true })}
              required={true}
            />
          </div>

          <div className="flex-column">
            <label>Email </label>
          </div>
          <div className="inputForm">
            <input
              type="email"
              className="input"
              placeholder="Enter your Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
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
              {...register("password", { required: true })}
              required={true}
            />
          </div>

          <button type="submit" className="button-submit">
            Sign Up
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
            Already have an account?{" "}
            <span className="span">
              <Link to="/auth/login">Login</Link>
            </span>
          </p>
        </form>
      ) : (
        <AlertCard message="User Registered Successfully" />
      )}
    </div>
  );
};

export default SignUp;
