import React from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, likeDislikePost } from "../../actions/post";

const Post = ({
  post: { _id, user, text, name, avatar, likes, comments, date },
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClick = (id) => {
    dispatch(deletePost(id));
  };

  const likeUnlike = (id) => {
    dispatch(likeDislikePost(id));
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
        <button
          type="button"
          onClick={() => likeUnlike(_id)}
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up"></i>
          <span>{likes.length}</span>
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-primary">
          Discussion <span className="comment-count">{comments.length}</span>
        </Link>
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
