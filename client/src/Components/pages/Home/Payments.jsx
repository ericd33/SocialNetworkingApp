import React from 'react'
import { useState, useEffect } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  Button,
  CardHeader,
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
    
    axios(Config).then(res => {setData(res.data)
    console.log(res.data)})
},[])
// console.log(data)
	const opencloseModal = () => {
    setModal(!modal);
  };
	const body = (
    <Card
      className="postCreator"
      sx={{
        maxWidth: '90%',
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
        <div className='opinionContainer'>
       {data?.map((o) => {

        console.log(0)
        return(o?.info?.map((e)=>{
          // console.log(e)
          return (
            <div id='commentCard'>
                <Card
                className="cardOpinion"
                sx={{
                bgcolor: "custom.light",
                fontFamily: "Nunito",
                color: "primary.light",
                borderRadius: "15px",
                mb: "10px",
                }}>
  
                <CardHeader
                  sx={{ pt: "8px", color: "secondary.main" }}
                  title={e?.payer?.email_address}
                  subheader={`${e?.payer?.name?.given_name}  ${e?.payer?.name?.surname}` }
                  subheaderTypographyProps={{ color: "white"}}
                />
                <div className='pays'>
                  <p id='textComment'>Pay {e?.infopago?.value} {e?.infopago?.currency_code}</p>
                </div>
              </Card>
            </div>
            )
        }))
        // if(typeof o.info === 'object'){
				  //  }
			    })}

      </div>
      </CardContent>
      </Card>
  );

  return (
    <div className="container">
      <Button id='banButton' sx={{fontSize:11}} color='error' variant="outlined" onClick={() => opencloseModal()}>
        Payments
      </Button>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}

export default Payments