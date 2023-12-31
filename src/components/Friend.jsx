import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "/src/state";
import FlexBetween from "./FlexBetween";
import UserImage from "/src/components/UserImage";
import PropTypes from "prop-types";
import getEndpoint from "/utilities"


const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {

   /*  if (friendId === _id) {
      return;
    } */

    const response = await fetch(
      `${getEndpoint()}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

Friend.propTypes = {
    friendId: PropTypes.string.isRequired, // 'friendId' prop is required and should be a string
    name: PropTypes.string.isRequired, // 'name' prop is required and should be a string
    subtitle: PropTypes.string.isRequired, // 'subtitle' prop is required and should be a string
    userPicturePath: PropTypes.string, // 'userPicturePath' prop is required and should be a string
  };

  Friend.defaultProps = {
    userPicturePath: "default-picture.jpg", // Providing a default image path here so I don't get "undefined" as a value
  };

export default Friend;