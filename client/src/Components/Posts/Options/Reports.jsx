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
import { reportPost } from "../../../Redux/actions";


export default function Reports({payload}) {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  const dispatch = useDispatch()

  const opencloseModal = () => {
    setModal(!modal);
  };
  const opencloseModal2 = () => {
    if(modal2) { 
    window.location.href = window.location.href;
    setModal2(!modal2);
  }else{
    setModal2(!modal2)
  }
  };

  const reports = [
      'Spam',
      'Inappropriate',
      'Sexual content',
      'Offensive or violent content',
      'Bullying',
      'Other'
    ];
    
    const handleSubmit = (r) => {
      let data = {
          author: payload.author,
          id: payload.id,
          reporter: sessionUser.user.email,
          report: r
      }
      dispatch(reportPost(data,token))
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
          <h2>Explain us the reason!</h2>
          <IconButton
            id='closeIcon'
            sx={{ width: "35px", height: "35px", top: "20px",
            bgcolor:'custom.light' }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon sx={{pr:'1px'}}/>
          </IconButton>
        </div>
        <div className='boxReports'>
        {reports.map((r) => (
            <Button
            sx={{
              width: 440,
              bgcolor: 'custom.light',
              fontFamily: "Nunito",
              color: 'primary.light',
              borderRadius:'15px',
              height:'50px',
              mb:'10px'
            }}
            onClick={() => handleSubmit(r)}>
                <p>{r}</p>
            </Button>
      ))}
      </div>
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
        <h2>This post will no longer appear in your feed, ty.</h2>
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
      <Button sx={{color:'custom.dark'}} onClick={() => opencloseModal()}>
        Report
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