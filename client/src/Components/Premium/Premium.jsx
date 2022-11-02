import { useState } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Premium.css";
import { useDispatch } from "react-redux";
import { Premium } from "../../Redux/actions";
import PaidIcon from '@mui/icons-material/Paid';
import { useUserAuth } from "../../context/UserAuthContext";


export default function Prem() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  // const user = JSON.parse(window.localStorage.getItem("user"))
  const {user} = useUserAuth();
  const opencloseModal = () => {
    setModal(!modal);
  };
  console.log(user)

  const handleSubmit = () => {
    dispatch(Premium(user.id));
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
          <h2>ConcatUs <span className="outl"> Premium</span></h2>
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
        <p>
          Are you ready for the next step? <br/>
          Just for $5,99 😎<br/>
          You will be able to create your <span className="outl">own Events!</span>  <br/>
          Invite you friends yo the best party or organize a Online meeting!
        </p>
        <div className="premiumButton">

          <Button
            sx={{ mb: 1, fontFamily: "Nunito", color: "primary.dark" }}
            id="ButtonPremium"
            variant="outlined"
            onClick={handleSubmit}
          >
            Premium
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container">
      <IconButton sx={{width:'35px'}} onClick={() => opencloseModal()}>
        <PaidIcon sx={{ color: "secondary.main" }} />
      </IconButton>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}