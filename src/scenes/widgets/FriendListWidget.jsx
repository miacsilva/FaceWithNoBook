import { Box, Typography, useTheme } from "@mui/material";
import Friend from "/src/components/Friend.jsx";
import WidgetWrapper from "/src/components/WidgetWrapper.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "/src/state";
import PropTypes from "prop-types";
import getEndpoint from "/utilities";


const FriendListWidget = ({ userId }) => {

  console.log("Component FriendListWidget Rendered");

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `${getEndpoint()}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
          {friends.length && 
            friends.map((friend) => {
              console.log("Mapping friend:", friend);
              if (friend._id) {
                console.log("Valid friend._id:", friend._id);
                return (
                  <Friend
                    key={friend._id}
                    friendId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.occupation}
                    userPicturePath={friend.picturePath}
                  />
                );
              } else {
                console.log("Invalid friend._id - skipping this friend.");
                // Handle the case where friend._id is missing or invalid.
                return null; // Or render a placeholder or error message.
              }
            })
          }
        </Box>
    </WidgetWrapper>
    </>
  );
};


FriendListWidget.propTypes = {
    userId: PropTypes.string.isRequired, 
  };


export default FriendListWidget;