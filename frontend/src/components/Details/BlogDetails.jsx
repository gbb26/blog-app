import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsCard from "../Cards/DetailsCard";
import axios from "axios";
import userProfile from "../../api";

const BlogDetails = () => {
  const params = useParams();

  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    userProfile();
    const bearerToken = localStorage.getItem("jwtToken");
    const apiUrl = `https://noteme-the-blog-app-backend.onrender.com/api/notes/${params.blogID}`;
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => {
        // Handle the successful response here
        // console.log(response.data);
        setBlogData(response.data.results);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching blog data:", error);
      });
  }, []);
  return (
    <div>
      {blogData.map((blog, index) => {
        return (
          <span key={index}>
            <DetailsCard
              title={blog.title}
              author={blog.author.authorName}
              date={blog.date}
              tags={blog.tags}
              description={blog.description}
              isAuthor={
                blog.author.authorID == localStorage.getItem("userID")
                  ? true
                  : false
              }
              blogID={blog._id}
            />
          </span>
        );
      })}
    </div>
  );
};

export default BlogDetails;
