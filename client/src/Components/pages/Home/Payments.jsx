import React from 'react'
import { useState, useEffect } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUserAuth } from "../../../context/UserAuthContext";
import axios from "axios";

const Payments = () => {

	const [modal, setModal] = useState(false);
	const [data, setData] = useState([]);
  const {user} = useUserAuth();
  let token = user.accessToken;

  useEffect(()=>{
    const Config = {
      method: 'post',
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/shop`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    axios(Config).then(res => setData(res.data[0].info))
},[])
//console.log(data)
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
        { data.length !==0 ? 
			 data.map((o)=>{
        if(typeof o === 'object'){
				return(
					<div>
					<p>Name {`${o.payer.name.given_name}  ${o.payer.name.surname}` }</p>
					<p>E-mail {o.payer.email_address}</p>
					<p>Pay {o.infopago.value} {o.infopago.currency_code}</p>
          <hr />
					</div>
				)}
			 })
			 : 
       <div className="List">
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      </div> }

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