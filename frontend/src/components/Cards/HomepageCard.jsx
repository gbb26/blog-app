/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const HomepageCard = ({ title, author, blogID }) => {
  return (
    <div className="card">
      <div className="image">
        <img
          src="https://images.pexels.com/photos/633409/pexels-photo-633409.jpeg"
          alt="blog-background"
        />
      </div>
      <div className="content">
        <Link to={`/details/${blogID}`}>
          <span className="homepage-title">{title}</span>
        </Link>

        <p className="desc author">{author}</p>

        <Link className="action" to={`/details/${blogID}`}>
          Read More
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
};

export default HomepageCard;
