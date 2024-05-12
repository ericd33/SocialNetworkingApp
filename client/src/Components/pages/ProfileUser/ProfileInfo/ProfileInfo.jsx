import React from "react";
import { Button, CardMedia } from "@mui/material";
import "./ProfileInfo.css";
import { useParams } from "react-router-dom";
import { useUserAuth } from "../../../../context/UserAuthContext";
import { useState } from "react";
import { useEffect } from "react";
import Follow from "../../Home/follow";
import { EditProfile } from "../editProfile/EditProfile";
import { useDispatch } from "react-redux";
import { banUsers } from "../../../../Redux/actions";
import FollowersModal from "../Follows/FollowersModal";
import FollowedsModal from "../Follows/FollowedsModal";

const ProfileInfo = ({ userInfoRen }) => {
  const { user } = useUserAuth();
  const dispatch = useDispatch();
  let token = user.accessToken;
  const [showFolloweds] = useState(false);
  const [showFollows] = useState(false);
  const [myUser, setMyUser] = useState(true);
  const [profileUser] = useState({});

  const follows = userInfoRen.follows;
  const followeds = userInfoRen.followeds;

  let email = useParams();

  useEffect(() => {
    if (email.email === user.email) {
      setMyUser(false);
    }
  }, [myUser, email, user]);

  const handleBanUser = (e) => {
    e.preventDefault(e);
    if (userInfoRen.enabled) {
      let data = {
        email: email.email,
        action: "disable",
      };
      dispatch(banUsers(data, token));
    } else {
      let data = {
        email: email.email,
        action: "enable",
      };
      dispatch(banUsers(data, token));

    }
  };
  return (
    <div className="userCard">
      {userInfoRen.image ? (
        <CardMedia
          className="user"
          component="img"
          alt="image"
          image={userInfoRen.image}
        />
      ) : (
        <div></div>
      )}
      <div className="userInfo">
        <p>{userInfoRen.name}</p>
        {profileUser.role === "admin" ? (
          <div className="banContainerProfile">
            <Button id='banButton' onClick={handleBanUser} sx={{ mr: 1, fontSize: 11 }} color='error' variant="outlined">
              Ban
            </Button>
            <span style={{ color: "#fff" }}>enabled: {userInfoRen.enabled ? "true" : "false"}</span>
          </div>
        ) : (
          <></>
        )}
        {myUser ? <div></div> : <EditProfile />}
        <div className="userPlusInfo">
          <div className="followers">
            <div>
              <p>{userInfoRen.followeds?.length}</p>
              <FollowersModal followers={followeds} />
              {showFolloweds && <ul className="profile-info-list-ul">{followeds.length > 0 && followeds.map((e, i) => <li className="profile-info-list-li" key={`${e}_${i}`} >{e}</li>)}</ul>}
            </div>

            <div>
              <p>{userInfoRen.follows?.length}</p>
              <FollowedsModal followeds={follows} />
              {showFollows && <ul className="profile-info-list-ul">{follows.length > 0 && follows.map((e, i) => <li className="profile-info-list-li" key={`${e}_${i}`} >{e}</li>)}</ul>}
            </div>
          </div>

          <div className="plus">
            <p>{userInfoRen.posts?.length}</p>
            <p className="plusText">Posts</p>
          </div>

          <div className="plus">
            <p>{userInfoRen.events?.length}</p>
            <p className="plusText">Events created</p>
          </div>

          <div className="plus">
            <p>{userInfoRen.asistEvent?.length}</p>
            <p className="plusText">Events that will attend</p>
          </div>
        </div>
        {!myUser ? <div></div> : <Follow email={userInfoRen.email} />}
      </div>
    </div>
  );
};

export default ProfileInfo;
