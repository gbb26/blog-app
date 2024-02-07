import { Route, Routes } from "react-router-dom";
import Home from "./components/Homepage/Home";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import CreateBlog from "./components/BlogPost/CreateBlog";
import NotFound from "./components/Cards/NotFound";
import UpdateBlog from "./components/BlogPost/UpdateBlog";
import AlertCard from "./components/Cards/AlertCard";
import BlogDetails from "./components/Details/BlogDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/details/:blogID"
          element={
            localStorage.getItem("userLoggedIn") === "true" ? (
              <BlogDetails />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/auth/register"
          element={
            localStorage.getItem("userLoggedIn") === "true" ? (
              <AlertCard message="User already logged in " />
            ) : (
              <SignUp />
            )
          }
        />
        <Route exact path="/auth/login" element={<Login />} />
        <Route
          exact
          path="/create-new-blog"
          element={
            localStorage.getItem("userLoggedIn") === "true" ? (
              <CreateBlog />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/update-blog/:blogID"
          element={
            localStorage.getItem("userLoggedIn") === "true" ? (
              <UpdateBlog />
            ) : (
              <Login />
            )
          }
        />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
