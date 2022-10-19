import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { yellow, grey } from "@mui/material/colors";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentsModal from "./Modals/CommentsModal";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { putLikes } from "../../Redux/actions";
import { updateComment } from "../../Redux/actions";
import { Link } from "react-router-dom";
import "./Post.css";

export default function Post({ text, author, comments, likes, image, id }) {
  const [User, setUser] = useState({ name: "", avatar: "" });
  const dispatch = useDispatch();
  const auth = getAuth();
  const token = auth.currentUser.accessToken;

  useEffect(() => {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${author}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios(Config)
      .then((user) => {
        setUser({
          name: user.data.name,
          avatar: user.data.image,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const putLike = () => {
    dispatch(putLikes(id, auth.currentUser.email, token));
  };

  const [formState, setFormState] = useState({
    image: "",
    text: "",
    idUser: auth.currentUser.email,
    idPost: "",
  });

  const handleClick = (e) => {
    setFormState({
      text: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formState,
      // email: getAuth().currentUser.email,
    };

    dispatch(updateComment(id, data, token));
  };

  const handleSubmitCommentForm = (e) => {
    e.preventDefault();

    dispatch(updateComment(id, auth.currentUser.email, comment, token));

    setComment("");
  };

  const [comment, setComment] = useState();
  const handleChangeComment = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const [commentsModalState, setCommentsmodalState] = useState(false);
  const openCommentsModal = () => setCommentsmodalState(true);

  return (
    <div>
      <br />
      <Card
        sx={{
          width: 600,
          bgcolor: "custom.dark",
          fontFamily: "Nunito",
          borderRadius: 3,
        }}
      >
        <CardHeader
          sx={{ pt: 0, pb: 0, mt: 2, color: "primary.main" }}
          avatar={
            <Avatar sx={{ bgcolor: yellow[500] }} src={User.avatar}></Avatar>
          }
          title={<Link to={"/profile/" + author}>{User.name}</Link>}
        />
        <CardContent sx={{ pb: 1, color: "primary.main" }}>{text}</CardContent>

        {image ? (
          <CardMedia component="img" alt="image" height="400" image={image} />
        ) : (
          <div></div>
        )}

        <CardActions disableSpacing>
          <IconButton id="buttonsPost" onClick={putLike}>
            <ThumbUpOffAltIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <p id="textButtons">{likes?.length} likes</p>
						<p id="textButtons">{comments.length} comments</p>
          </div>

					<CommentsModal comments={comments} />


          {/* ----Dislikes para un FUTURO---- */}

          {/* <IconButton>
                            <ThumbDownOffAltIcon/>
                        </IconButton>
                        <p>6 dislikes</p> */}

          {/* 								
          {comments ? (
            <CommentsModal comments={comments} />
          ) : (
            <IconButton id="buttonsPost">
              <ChatBubbleOutlineRoundedIcon />
            </IconButton>
          )} */}

          {/* --- Shares para FUTURO --- */}

          {/* <IconButton>
                            <ReplyIcon />
                        </IconButton>
                        <p>3 shares</p> */}
        </CardActions>

        <form onSubmit={handleSubmitCommentForm} className="comments-container">
          <textarea
            className="coments-textarea"
            placeholder="what are you thinking? 👀"
            onChange={handleChangeComment}
            value={comment}
          />
          <button className="comments-button" type="submit">
            Send
          </button>
        </form>

        {/*  <form>
          <label />
          <input
            value={formState.content}
            placeholder="leave a comment..."
            className="post-comment-input1"
            onChange={handleClick}
          />
          {console.log(formState, "ESTO ME TRAE EL INPUT")}
          <button onClick={handleSubmit}>Send</button>
        </form> */}
      </Card>
    </div>
  );
}
