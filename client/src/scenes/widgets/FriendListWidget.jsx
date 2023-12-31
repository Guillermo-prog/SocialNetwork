import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId, isLoggedUserList }) => {
  const dispatch = useDispatch();
  const [friendsList, setFriendsList] = useState([]);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const loggedUserFriends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    if (isLoggedUserList) {
      dispatch(setFriends({ friends: data })); //if isLoggedUserList global state friend list is used (logged user friends list)
    } else {
      setFriendsList(data); //if !isLoggedUserList local state list for not modifying the friends state incorrectly
    }
  };
  useEffect(() => {
    getFriends();
  }, [friendsList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
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
        {isLoggedUserList ? (
          loggedUserFriends.length > 0 ? (
            loggedUserFriends.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
                isLoggedUserList={isLoggedUserList}
              />
            ))
          ) : (
            <p>There are no friends yet :(</p>
          )
        ) : friendsList.length > 0 ? (
          friendsList.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
              isLoggedUserList={isLoggedUserList}
            />
          ))
        ) : (
          <p>There are no friends yet :( </p>
        )}
      </Box>
      <Box m="1rem 0" />
    </WidgetWrapper>
  );
};

export default FriendListWidget;
