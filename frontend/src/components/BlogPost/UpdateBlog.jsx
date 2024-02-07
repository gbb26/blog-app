import { useEffect, useState } from "react"; // Import useEffect
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import AlertCard from "../Cards/AlertCard";
import axios from "axios";

const UpdateBlog = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  // Mock data for demonstration purposes
  const location = useLocation();
  const blogData = location.state;
  // console.log(blogData);
  // Set initial form values based on the existing blog data
  useEffect(() => {
    setValue("title", blogData.title);
    setValue("tags", blogData.tags);
    setValue("description", blogData.description);
  }, [setValue]);

  const onSubmit = (data) => {
    // console.log(data);
    const apiUrl = `https://noteme-the-blog-app-backend.onrender.com/api/notes/${blogData.blogID}`;

    // Replace 'YOUR_BEARER_TOKEN' with your actual Authorization Bearer token
    const bearerToken = localStorage.getItem("jwtToken") || null;

    axios
      .patch(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json", // Set content type to JSON
        },
      })
      .then((response) => {
        // Handle the successful response here
        // console.log("Data:", response.data);
        setFlag(true);
        navigate("/"); // Navigate upon successful API response
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error updating data:", error);
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
              placeholder="Tags Separated by commas"
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
            Update blog
          </button>
        </form>
      ) : (
        <AlertCard message="Blog Updated Successfully" />
      )}
    </div>
  );
};

export default UpdateBlog;
