import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AlertCard from "../Cards/AlertCard";
import { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const { register, handleSubmit } = useForm();
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // console.log(data);

    // Define the API endpoint
    const apiUrl = "https://noteme-the-blog-app-backend.onrender.com/api/notes";

    // Replace 'YOUR_BEARER_TOKEN' with your actual Authorization Bearer token
    const bearerToken = localStorage.getItem("jwtToken") || "eyz";

    axios
      .post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json", // Set content type to JSON
        },
      })
      .then((response) => {
        // Handle the successful response here
        // console.log("Data:", response.data);
        setFlag(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error posting data:", error);
      });
  };

  return (
    <div>
      {!flag ? (
        <form className="form blog-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-column">
            <label>Title of the blog: </label>
          </div>
          <div className="inputForm">
            <input
              type="text"
              className="input"
              placeholder="Enter the title of the blog"
              {...register("title")}
              required={true}
            />
          </div>

          <div className="flex-column">
            <label>Tags: </label>
          </div>
          <div className="inputForm">
            <input
              type="text"
              className="input"
              placeholder="Tags Separated by spaces"
              {...register("tags", {
                required: false,
                pattern: /^[a-zA-Z0-9\s]+$/,
              })}
              required={false}
            />
          </div>
          <div className="flex-column">
            <label>Content: </label>
          </div>
          <div className="inputForm" style={{ height: "200px" }}>
            <textarea
              type=""
              className="input"
              placeholder="Blog content"
              rows={30}
              {...register("description", {
                required: true,
              })}
              style={{ resize: "none" }}
            />
          </div>

          <button type="submit" className="button-submit">
            Create blog
          </button>
        </form>
      ) : (
        <AlertCard message="Blog Created Successfully" />
      )}
    </div>
  );
};

export default CreateBlog;
