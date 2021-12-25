import React from "react";
import Post from "./Post";

const Posts = ({ posts }) =>
  posts.length > 0 && posts.map((post) => <Post key={post._id} post={post} />);

export default Posts;
