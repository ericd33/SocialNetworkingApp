import { useState } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { banPost } from "../../../Redux/actions";
import { red } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';


export default function DeletePost(payload) {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  const dispatch = useDispatch()

  const opencloseModal = () => {
    setModal(!modal);
  };
  const opencloseModal2 = () => {
    setModal2(!modal2);
  };
    
    const handleSubmit = () => {
      let data = {
        idPost: payload.id,
        action: 'delete'
      }
      dispatch(banPost(data,token))
      setModal(false);
      setModal2(true);
    }

  const body = (
    <Card
      className="commentsList"
      sx={{
        width: 500,
        borderRadius: "15px",
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
        maxHeight: 500
      }}
    >
      <CardContent>
        <div className="headerModal">
          <h2>Are you sure to delete the post?</h2>
          <IconButton
            id='closeIcon'
            sx={{ width: "35px", height: "35px", top: "20px",
            bgcolor:'custom.light' }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon sx={{pr:'1px'}}/>
          </IconButton>
        </div>
        <Button onClick={handleSubmit} sx={{mr:'15px'}} variant="outlined" color="error">
            Delete
            <DeleteIcon fontSize="small" />
        </Button>
        <Button onClick={opencloseModal} variant="outlined">Back</Button>
    </CardContent>
  </Card>
  );

  const body2 = (
    <Card
    className="commentsList"
    sx={{
        width: 500,
        borderRadius: "15px",
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
        maxHeight: 500
    }}
    >
    <CardContent sx={{fontSize:'13px'}}>
        <div className="headerModal">
        <h2>Post deleted succesfully</h2>
        <IconButton
            id='closeIcon'
            sx={{ width: "35px", height: "35px", top: "20px",
            bgcolor:'custom.light' }}
            onClick={() => opencloseModal2()}s
        >
            <CloseIcon sx={{pr:'1px'}}/>
        </IconButton>
        </div>
    </CardContent>
    </Card>
);

  return (
    <div className="container">
      <Button sx={{color:red[800]}} onClick={() => opencloseModal()}>
        Delete
      </Button>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
      <Modal open={modal2} onClose={opencloseModal2}>
        {body2}
      </Modal>
    </div>
  );
}