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
import { useDispatch } from "react-redux";
import { putLikes } from "../../Redux/actions";
import { updateComment } from "../../Redux/actions";
import { Link } from "react-router-dom";
import "./Post.css";

export default function Post({ text, author, comments, likes, image, id }) {
  const [User, setUser] = useState({ name: "", avatar: "" });
  const dispatch = useDispatch();
  let token = window.localStorage.getItem("token");
  token = token.slice(1, -1);
  let user = window.localStorage.getItem("user");

  user = JSON.parse(user);
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
    dispatch(putLikes(id, user.email, token));
  };

  const [formState, setFormState] = useState({
    image: "",
    text: "",
    idUser: author,
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

    dispatch(updateComment(id, author, comment, token));

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
    <div className="card">
      <br />
      <Card
        sx={{
          width: 600,
          bgcolor: "custom.dark",
          fontFamily: "Nunito",
          borderRadius:3,
          position:'relative'
        }}
      >
        <CardHeader
          sx={{ pt: 0, pb: 0, mt: 2, color: "primary.main" }}
          avatar={
            <Avatar
              imgProps={{ referrerPolicy: "no-referrer" }}
              sx={{ bgcolor: "primary.light" }}
              src={User.avatar}
            ></Avatar>
          }
          title={<Link to={"/profile/" + author}>{User.name}</Link>}
        />
        <CardContent sx={{ pb: 1, color: "primary.main" }}>{text}</CardContent>

        {image ? (
          <CardMedia component="img" alt="image" image={image} />
        ) : (
          <div></div>
        )}

        <CardActions>
          <div className="actionsPost">
            <div className="actionLikes">
                <IconButton onClick={putLike}>
                  <ThumbUpOffAltIcon className='ButtonActionPost'/>
                </IconButton>
                {
                  likes.length !== 0 ?
                  <div>
                    <p className="textLikes">{likes?.length} likes</p>
                    <ul>
                      <li id='LikeTitle'>Likes</li>
                    {
                      likes?.map(l => {
                        return (
                          <li>{l.name}</li>
                        )
                      })
                    }
                    </ul>
                  </div> : 
                  <p id="OLikes">0 likes</p>
                }
              </div>
            </div>

          {comments ? 
            <CommentsModal comments={comments} />
            : <></>
          }
          <p className='textCommentarys'>{comments.length} comments</p>

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
