import { Avatar, Button, Card, CardHeader, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { banComments } from "../../../Redux/actions";

export function Comments({ avatar, name, text, id, enabled }) {
  const dispatch = useDispatch();
  const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  const userE = JSON.parse(localStorage.getItem("user"));
  const handleBan = (e) => {
    e.preventDefault(e);
    if (enabled) {
      let data = {
        id: id,
        action: "disable",
      };
      dispatch(banComments(data, token));
    } else {
      let data = {
        id: id,
        action: "enable",
      };
      dispatch(banComments(data, token));
    }
  };


  const handleDeleteComment = () => {
    dispatch(
      banComments(
        {
          action: "disable",
          id,
        },
        token
      )
    );
  };

  return (
  <div id='commentCard'>
    <Card
      sx={{
        bgcolor: "custom.light",
        fontFamily: "Nunito",
        color: "primary.light",
        borderRadius: "15px",
        mb: "10px",
      }}
    >
      {userE.role === "admin" ? (
        <div className="banButtonComment">
        <Button id='banButton' onClick={handleBan} sx={{ mr:1,fontSize:11}} color='error' variant="outlined">
                Ban
        </Button>
        <span style={{ color: "#fff" }}>enabled: {enabled ? "true" : "false"}</span>
      </div>
      ) : (
        <></>
      )}
      <CardHeader
        sx={{ pt: "8px", color: "secondary.main" }}
        avatar={
          <Avatar
            imgProps={{ referrerPolicy: "no-referrer" }}
            sx={{ bgcolor: "primary.light" }}
            src={avatar}
          />
        }
        title={name}
        subheader=" . "
      />
      <p id='textComment'>{text}</p>
    </Card>
    </div>
  );
}
