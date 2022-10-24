import { Avatar, Button, Card, Container, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { grey, red, yellow } from "@mui/material/colors";
import './EventDetail.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { details, deleteDetails, assitEvent  } from "../../Redux/actions.js";
import { Link, useParams } from 'react-router-dom';
import React from 'react'
import NavBar from "../navbar/Navbar";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useUserAuth } from "../../context/UserAuthContext";
import Maps from "./map/mapDetail";
import './map/map.css'


export default function EventDetail() {
    const detail = useSelector(d=>d.details)
    const {user} = useUserAuth();
    // console.log(user.image)
    let token = user.accessToken;

    
    let emailU =user.email
		// console.log(emailU)
    
    const dispatch = useDispatch()
    const { id }= useParams()

		const payload ={
			eventId: id,
			userEmail: emailU,
		}
    
    useEffect(()=>{
        dispatch(details(id,token))
        return()=>{
            dispatch(deleteDetails())
        }
    },[dispatch,id])

		const submitEvent = ()=>{
			dispatch(assitEvent(token, payload))
		}
    // console.log(detail)
    if (detail.length !== 0) {
        // console.log(detail);
    return (
        <div className='EventDetailContainer'>
            <Link to={'/events'}><Button id='buttonEventDetail' sx={{position:'absolute', top:'0px', left:'0px',bgcolor: 'secondary.main', color:grey[800], fontWeight:'bold', mb:'10px',mt:'10px',ml:'10px'}} variant="contained">Back</Button></Link>
            <Container sx={{textAlign:'center', bgcolor:'transparent'}} >
                <Card sx={{bgcolor:'custom.light'}}>
                    <CardMedia
                    component="img"
                    alt="image"
                    height="140"
                    image={detail?.image}
                />
                <CardContent className="infoEvent">
                    <div className="left">
                        <Typography sx={{fontFamily: 'Nunito', fontSize: 27,color:'primary.light'}} gutterBottom variant="h5" component="div">
                            {detail?.name}
                        </Typography>
                        <Typography sx={{fontFamily: 'Nunito', fontSize: 18,color:red[900]}} gutterBottom variant="h5" component="div">
                            <IconButton sx={{pb:'13px'}}>
                                <LocationOnIcon sx={{color:red[900]}}/>
                            </IconButton>
                            {detail?.location}
                        </Typography>
                    </div>
                    <div className="right">
                        <Typography id='createdby' sx={{fontFamily: 'Nunito', fontSize: 14,color:grey[500]}} gutterBottom variant="h5" component="div">
                            - Created by -
                        </Typography>

                        <div className="right-namephoto">
                            <Avatar id='avatar' sx={{ bgcolor: yellow[500] }} src={detail?.avatar}></Avatar>

                            <Typography id="h5" sx={{fontFamily: 'Nunito', fontSize: 16,color:'primary.light'}} gutterBottom variant="h5" component="div">
                                {detail?.nameAuthor}
                            </Typography>
                        </div>
                    </div>

                </CardContent>

                <div className="text">
                    <Maps className='map' latLon={detail?.lat_log}/>
                    <div className="descriptionDetail">
                        <h3>Description:</h3>
                        <h4>{detail?.content}</h4>
                    </div>
                </div>

                <CardContent sx={{fontFamily: 'Nunito'}}>
                    <div className="info2">
                        <Button id='assistButton' sx={{bgcolor: 'secondary.main', color:grey[800]}} variant="contained" onClick={submitEvent}>Assist</Button>
                        
                        <div className="date-hour-part">
                            {
                                detail ? <span>Participants: {detail.participants}</span> : <></>
                            }
                            <span>Date: {detail?.date}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Container>
    </div>
    
    )
}
else {
    return (
        <div className="LoadingDetails">
            <div className="wrapperDetail">
                <div className="circleDetail"></div>
                <div className="circleDetail"></div>
                <div className="circleDetail"></div>
                <div className="shadowDetail"></div>
                <div className="shadowDetail"></div>
                <div className="shadowDetail"></div>
            </div>
            
        </div>
    )
}
}