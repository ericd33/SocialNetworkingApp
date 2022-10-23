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
import { yellow, grey } from "@mui/material/colors";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentsModal from "./Modals/CommentsModal";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { useDispatch } from "react-redux";
import { newComment, putLikes } from "../../Redux/actions";
import { updateComment } from "../../Redux/actions";
import { Link } from "react-router-dom";
import "./Post.css";
import { useUserAuth } from "../../context/UserAuthContext";

export default function Post({ text, author, comments, likes, image, id }) {
  // console.log(comments)
  const [User, setUser] = useState({ name: "", avatar: "" });
  const dispatch = useDispatch();
  const {user} = useUserAuth();
  let token = user.accessToken;

  // console.log(token)

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

  const [comment, setComment] = useState({
    authorComment:user.email,
    avatar: user.photoURL,
    name: user.displayName,
    idPost: id,
    text:"",
    image:""
  });
  // console.log(comment)

  const handleChangeComment = (e) => {
    // e.preventDefault();
    setComment({
      ...comment,
      [e.target.name]:e.target.value});
  };

  const handleSubmmitComment = (e)=>{
    e.preventDefault()
    // console.log(comment)
    dispatch(newComment(token,comment))
  }

  // const [commentsModalState, setCommentsmodalState] = useState(false);
  // const openCommentsModal = () => setCommentsmodalState(true);

  return (
    <div className="card">
      {/* {console.log(User)} */}
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
        <CardContent sx={{color: "primary.main" }}>{text}</CardContent>

        {image ? (
          <CardMedia component="img" alt="image" image={image} />
        ) : (
          <div></div>
        )}

        <CardActions sx={{mb:0}}>
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
            <CommentsModal idPost={id} />
            : <></>
          }
          <p className='textCommentarys'>{comments && comments.length} comments</p>

          {/* --- Shares para FUTURO --- */}

          {/* <IconButton>
                            <ReplyIcon />
                        </IconButton>
                        <p>3 shares</p> */}
        </CardActions>

          <div className="inputsdeComments">
            <TextField
              id="filled-multiline-static"
              label="What are you thinking? 👀"
              value={comment?.text}
              variant="filled"
              name="text"
              onChange={handleChangeComment}
            />
            <Button
            sx={{mb:1,fontFamily: "Nunito",
            color:'primary.dark'}} 
            variant='outlined'
            onClick={handleSubmmitComment}
            >
              Comment
            </Button>
          </div>

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