import { useState } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { grey, yellow } from "@mui/material/colors";
import "./Donations.css";
import { useDispatch } from "react-redux";
import { Donate } from "../../Redux/actions";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useUserAuth } from "../../context/UserAuthContext";

export default function Donations() {
  const [modal, setModal] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("user"))
  const dispatch = useDispatch();
  const opencloseModal = () => {
    setModal(!modal);
  };
  const [amount, setAmount] = useState();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(Donate(amount,user._id));
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
          <h2>Donations</h2>
          <IconButton
            sx={{ width: "35px", height: "35px", top: "20px" }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <p>
          From the ConcatUs team we are very grateful for your support, we hope
          that the website is to your liking! ♡
        </p>
        <div className="inputDonation">
          <TextField
            id="filled-multiline-static"
            label="Amount"
            value={amount}
            variant="filled"
            name="content"
            onChange={handleChange}
          />
          <Button
            sx={{ mb: 1, fontFamily: "Nunito", color: "primary.dark" }}
            id="ButtonDonate"
            variant="outlined"
            onClick={handleSubmit}
          >
            Donate
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container">
      <IconButton onClick={() => opencloseModal()}>
        <VolunteerActivismIcon sx={{ color: "secondary.main" }} />
      </IconButton>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}
