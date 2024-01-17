import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    SendOutlined,
  } from "@mui/icons-material";

  import { Box, Divider, IconButton, Typography, useTheme, InputBase } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]); //remember likes in backend model is a map string: boolean. Checks if current user that is logged in has liked the post
    const likeCount = Object.keys(likes).length; //how many keys there are in the likes object
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    const patchLike = async () => {
      const response = await fetch(`https://social-pedia-api.vercel.app/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
        //backend can keep track of whether the current loggedin user has liked the post or not. Also stringify is used to convert a Javascript object into a JSON-formatted string 
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };

    const submitComment = async () => {
      if (!newComment) return; // Don't submit empty comments
      const response = await fetch(`https://social-pedia-api.vercel.app/posts/${postId}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, comments: newComment }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setNewComment(''); // Clear the input field after submitting the comment
    };
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
                //i is integer 0-3 and then your comment is your indivdual comment within the comments. name-i is just to make the index unique 
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: '0.5rem' }}>
              <InputBase
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                sx={{ flex: 1, mr: '0.5rem', p: '0.5rem', borderRadius: '0.25rem', backgroundColor: palette.neutral.light }}
              />
            
            {/* // sx={{
            //   width: "100%",
            //   backgroundColor: palette.neutral.light,
            //   borderRadius: "2rem", //top bottom  
            //   padding: "1rem 2rem", // 
            // }}
       */}
              <IconButton onClick={submitComment}>
                <SendOutlined />
              </IconButton>
            </Box>

          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;
