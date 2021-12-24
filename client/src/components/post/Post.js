import React from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../../actions/post";

const Post = ({
  post: { _id, user, text, name, avatar, likes, comments, date },
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClick = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt={avatar} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          <span>{likes.length}</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <a href="post.html" className="btn btn-primary">
          Discussion <span className="comment-count">{comments.length}</span>
        </a>
        {!auth.loading && auth.user._id === user && (
          <button
            type="button"
            onClick={() => onClick(_id)}
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
