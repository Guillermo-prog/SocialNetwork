import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  isLoggedUserList,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const user = useSelector((state) => state.user);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.dark;
  const medium = palette.neutral.dark;

  const isFriend = Array.from(friends).find(
    (friend) => friend._id === friendId || friend === friendId
  );

  const isLoggedUser = user._id === friendId;

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
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
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <UserImage
            image={userPicturePath}
            size="55px"
            sx={{
              "&hover": { color: palette.primary.light, cursor: "pointer" },
            }}
          />
        </Box>

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

      {isLoggedUserList ? (
        !isLoggedUser ? (
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
        ) : (
          <IconButton
            disabled
            sx={{
              "&:disabled": {
                backgroundColor: primaryLight,
              },
              p: "0.6rem",
              color: palette.background.alt,
              borderRadius: "3rem",
            }}
          >
            <Typography variant="h6" color={primaryDark}>
              You
            </Typography>
          </IconButton>
        )
      ) : isLoggedUser ? (
        <IconButton
          disabled
          sx={{
            "&:disabled": {
              backgroundColor: primaryLight,
            },
            p: "0.6rem",
            color: palette.background.alt,
            borderRadius: "3rem",
          }}
        >
          <Typography variant="h6" color={primaryDark}>
            You
          </Typography>
        </IconButton>
      ) : undefined}
    </FlexBetween>
  );
};
export default Friend;
