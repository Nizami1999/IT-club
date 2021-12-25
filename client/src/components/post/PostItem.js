/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { commentPost, getPost } from "../../actions/post";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import PostItemTop from "./PostItemTop";

const PostItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  const { loading, post } = useSelector((state) => state.post);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(commentPost(post._id, text));
    setText("");
  };

  const [text, setText] = useState("");

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section class="container">
      <ToastContainer />
      <Link to="/posts" class="btn">
        Back To Posts
      </Link>
      <PostItemTop post={post} />
      <CommentForm onSubmit={onSubmit} text={text} setText={setText} />
      <Comments post={post} />
    </section>
  );
};

export default PostItem;
