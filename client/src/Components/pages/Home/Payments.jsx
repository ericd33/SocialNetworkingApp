import React from 'react'
import { useState } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Payments = () => {

	const [modal, setModal] = useState(false);

	const opencloseModal = () => {
    setModal(!modal);
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
          <h2>ConcatUs <span className="outl"> Payments </span></h2>
          <IconButton
            sx={{ width: "35px", height: "35px", top: "20px" }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <p>
        This is the Payments
        </p>

      </CardContent>
    </Card>
  );

  return (
    <div className="container">
      <Button onClick={() => opencloseModal()}>
        Payments
      </Button>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}

export default Payments