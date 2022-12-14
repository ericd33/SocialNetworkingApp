import { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  Input,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { grey, yellow } from "@mui/material/colors";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import "./EditPost.css";
import { getMyUser, putPost } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useEffect } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import axios from "axios";
import { width } from "@mui/system";

export default function EditPost({ idPost }) {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [prev, setPrev] = useState(false);
  const { user } = useUserAuth();
  let userEmail = user.email;
  const token = user.accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyUser(userEmail));
  }, []);

  const dispatch = useDispatch();
  const opencloseModal = () => {
    setModal(!modal);
  };
  const [formState, setFormState] = useState({
    content: "",
    imageCloudinary: "",
  });

  const submit = (e) => {
    setFile(e.target.files[0]);
  };

  const submitFile = async (e) => {
    let FILE = file;
    const formdata = new FormData();
    formdata.append("imageCloudinary", FILE);
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/file`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: formdata,
    };
    await axios(Config)
      .then((res) => {
        setFormState({
          ...formState,
          imageCloudinary: `${res.data}`,
        });
        setPrev(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // await submitFile()
    const data = {
      ...formState,
      email: userEmail,
    };
    setTimeout(() => {
      dispatch(putPost(idPost, token, data));
    }, 1000);
    setModal(!modal);
    setFormState({
      content: "",
      imageCloudinary: "",
    });
  };

  const body = (
    <Card
      className="postCreator"
      sx={{
        width: 600,
        borderRadius: "15px",
        bgcolor: "custom.main",
        fontFamily: "Nunito",
        color: "primary.light",
      }}
    >
      <CardContent>
        <div className="headerModal">
          <h2>Edit a post</h2>
          <IconButton
            id="closeIcon"
            sx={{
              width: "35px",
              height: "35px",
              top: "20px",
              bgcolor: "custom.light",
            }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon sx={{ pr: "1px" }} />
          </IconButton>
        </div>
        <div className="inputsdePost">
          <TextField
            id="filled-multiline-static"
            label="What do you want to share?"
            multiline
            rows={4}
            value={formState.content}
            variant="filled"
            name="content"
            className="textField"
            onChange={handleChange}
            inputProps={{
              maxLength: 200,
            }}
          />
        </div>

        <div align="right">
          <Button
            id="Postbutton"
            sx={{
              mt: 3,
              bgcolor: "secondary.main",
              fontFamily: "Nunito",
              color: "custom.dark",
            }}
            onClick={handleSubmit}
            variant="contained"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  const userStorage = JSON.parse(localStorage.getItem("user"));
  return userStorage.enabled ? (
    <div className="container">
      <Button onClick={() => opencloseModal()}>Editar Post</Button>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  ) : (
    <></>
  );
}
