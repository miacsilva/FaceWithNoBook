import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "/src/state";
import PostWidget from "./PostWidget";
import PropTypes from "prop-types";
import { useCallback } from "react";
import getEndpoint from "/utilities";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = useCallback(async () => {
    try{

    const response = await fetch(`${getEndpoint()}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  } catch (error){

    console.error("Error fetching posts:", console.error);
    
  }
  
  }, [dispatch, token]);

  const getUserPosts = useCallback(async () => {
    const response = await fetch(
      `${getEndpoint()}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  }, [dispatch, userId, token]);

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); 

  return (
    <>

    {posts.length > 0 && (
      <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
      </>

    )}
    </>
  );
};

PostsWidget.propTypes = {
    userId: PropTypes.string, 
    isProfile: PropTypes.bool, 
  };

export default PostsWidget;