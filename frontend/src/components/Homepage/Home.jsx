import { useEffect, useState } from "react";
import HomepageCard from "../Cards/HomepageCard";
import axios from "axios";

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    const apiUrl = "https://noteme-the-blog-app-backend.onrender.com/api/notes";
    axios
      .get(apiUrl)
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
      <div className="homepage-container">
        {blogData.map((blog, index) => {
          return (
            <span key={index}>
              <HomepageCard
                title={blog.title}
                author={blog.author.authorName}
                blogID={
                  localStorage.getItem("userLoggedIn") === "true"
                    ? blog._id
                    : "you-need-to-login-first"
                }
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
