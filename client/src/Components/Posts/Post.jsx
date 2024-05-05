import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
} from "@mui/material";
import { v4 } from 'uuid';
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useEffect, useRef, useState } from "react";
import CommentsModal from "./Modals/CommentsModal";
import { useDispatch, useSelector } from "react-redux";
import { banPost, newComment, putLikes } from "../../Redux/actions";
import { Link } from "react-router-dom";
import "./Post.css";
import { useUserAuth } from "../../context/UserAuthContext";
import OptionsPopper from "./Options/OptionsPopper";

export default function Post({
  created,
  text,
  author,
  comments,
  likes,
  image,
  id,
  enabled,
}) {
  const [User, setUser] = useState({ name: "", avatar: "" });
  const dispatch = useDispatch();
  const { user } = useUserAuth();
  const [profileUser, setProfileUser] = useState({});
  const [timeDate, setTimeDate] = useState("0");
  let token = user.accessToken;
  let payload = { author, id };
  const usr = useSelector(state => state.myUser)

  const commentInputRef = useRef()


  useEffect(() => {
    setUser(usr)
  }, [usr])


  const handleBan = (e) => {
    e.preventDefault(e);
    if (enabled) {
      let data = {
        idPost: id,
        action: "disable",
      };
      dispatch(banPost(data, token));
    } else {
      let data = {
        idPost: id,
        action: "enable",
      };
      dispatch(banPost(data, token));
    }
  };

  useEffect(() => {

    if (created) {
      const parsedDate = new Date(Date.parse(created.toString()));

      const datenow = new Date();

      const hourDifference = Math.floor(Math.abs(datenow - parsedDate) / 36e5);
      if (hourDifference > 730) {
        setTimeDate(Math.floor(hourDifference / 730) + " m");
      } else if (hourDifference > 24) {
        setTimeDate(Math.floor(hourDifference / 24) + " d");
      } else if (hourDifference <= 0) {
        setTimeDate('Now')
      } else {
        setTimeDate(hourDifference + " h");
      }
    }

  }, [created]);

  const putLike = () => {
    dispatch(putLikes(id, user.email, token));
  };

  const [comment, setComment] = useState({
    authorComment: user.email,
    avatar: user.photoURL,
    name: user.displayName,
    idPost: id,
    image: "",
  });

  const handleChangeComment = (e) => {
    e.preventDefault()
    commentInputRef.value = e.target.value;
  };
  const handleSubmmitComment = (e) => {
    e.preventDefault();
    dispatch(newComment(token, { ...comment, text: commentInputRef.value }));
    setComment({
      authorComment: user.email,
      avatar: user.photoURL,
      name: user.displayName,
      idPost: id,
      text: "",
      image: "",
    });
  };


  return (
    <Card
      key={v4()}
      sx={{
        width: 600,
        margin: '2rem',
        padding: '5px',
        bgcolor: "custom.dark",
        fontFamily: "Nunito",
        borderRadius: 3,
        position: "relative",
      }}
      id='card'
    >
      <div className="userInfo"> <CardHeader
        subheader={timeDate}
        subheaderTypographyProps={{ color: "white" }}
        sx={{ pt: 0, pb: 0, mt: 1, color: "primary.main" }}
        avatar={
          <Avatar
            imgProps={{ referrerPolicy: "no-referrer" }}
            sx={{ bgcolor: "primary.light" }}
            src={User.image}
          ></Avatar>
        }
        title={<Link to={"/profile/" + author}>{User.name}</Link>}
      /></div>
      <div className="optionsPopper"> <OptionsPopper payload={payload} /></div>

      {profileUser.role === "admin" ? (
        <div className="banContainer">
          <Button id='banButton' onClick={handleBan} sx={{ mr: 1, fontSize: 11 }} color='error' variant="outlined">
            Ban
          </Button>
          <span style={{ color: "#fff" }}>enabled: {enabled ? "true" : "false"}</span>
        </div>
      ) : (
        <></>
      )}
      <CardContent id='postText' sx={{ color: "primary.main" }}><p>{text}</p></CardContent>

      {image ? (
        <CardMedia component="img" alt="image" image={image} />
      ) : (
        <div></div>
      )}
      <CardActions className="actionsPost">
        <div className="actionLikes">

          <IconButton onClick={putLike}>
            <ThumbUpOffAltIcon className="ButtonActionPost" />
          </IconButton>
          {likes?.length !== 0 ? (
            <div>
              <p className="textLikes">{likes?.length} likes</p>
              <ul>
                <li id="LikeTitle">Likes</li>
                {likes?.map((l) => {
                  return <li key={'l' + l.name}>{l.name}</li>;
                })}
              </ul>
            </div>
          ) : (
            <p id="OLikes">0 likes</p>
          )}
        </div>

        {comments ? <CommentsModal idPost={id} /> : <></>}
        <p className="textCommentarys">
          {comments && comments?.length} comments
        </p>

      </CardActions>

      <div className="inputsdeComments">
        <TextField
          ref={commentInputRef}
          id="filled-multiline-static"
          label="What are you thinking? 👀"
          variant="filled"
          value={commentInputRef.value}
          name="text"
          onChange={handleChangeComment}
        />
        <Button
          sx={{ mb: '2px', fontFamily: "Nunito", color: "primary.dark", borderRadius: '12px' }}
          variant="outlined"
          onClick={handleSubmmitComment}
        >
          Comment
        </Button>
      </div>
    </Card>
  );
}
