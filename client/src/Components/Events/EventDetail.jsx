import { Avatar, Button, Card, Container, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { grey, red, yellow } from "@mui/material/colors";
import './EventDetail.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { details, deleteDetails, assitEvent  } from "../../Redux/actions.js";
import { Link, useParams } from 'react-router-dom';
import React from 'react'
import NavBar from "../navbar/Navbar";
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useUserAuth } from "../../context/UserAuthContext";
import Maps from "./map/mapDetail";
import './map/map.css'
import axios from "axios";
import ParticipantsModal from "./ParticipantsModal";


export default function EventDetail() {
    const detail = useSelector(d=>d.details)
    const {user} = useUserAuth();
    const [profileUser, setProfileUser] = useState({})
    let token = user.accessToken;
    
    let emailU =user.email
    
    const dispatch = useDispatch()
    const { id }= useParams()

		const payload ={
			eventId: id,
			userEmail: emailU,
		}
    
    useEffect(()=>{
        const Config = {
            method: 'get',
            baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${emailU}`,
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        axios(Config).then(res => setProfileUser(res.data))

        dispatch(details(id,token))
        return()=>{
            dispatch(deleteDetails())
        }
    },[dispatch,id])

		const submitEvent = ()=>{
			dispatch(assitEvent(token, payload))
            setTimeout(() => {
                window.location.href = window.location.href; 
            }, 1000)
		}
    // console.log(detail)
    if (detail?.length !== 0) {
        console.log(detail);
        let date = detail.date.replace('T',' / ').substring(0,detail.date.length-6);
        if(detail?.type === 'in-person') {
            return (
                <div className='EventDetailContainer'>
                    <Link to={'/events'}><Button id='buttonEventDetail' sx={{position:'absolute', top:'0px', left:'0px',bgcolor: 'secondary.main', color:grey[800], fontWeight:'bold', mb:'10px',mt:'10px',ml:'10px'}} variant="contained">Back</Button></Link>
                    <Container sx={{textAlign:'center', bgcolor:'transparent'}} >
                        <Card sx={{bgcolor:'custom.light'}} id='DetailCard'>
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
                                        {detail?.username}
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
                                    <ParticipantsModal participants={detail.participants}/>
                                    <span>Date: {date} hs.</span>
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
                <div className='EventDetailContainer'>
                    <Link to={'/events'}><Button id='buttonEventDetail' sx={{position:'absolute', top:'0px', left:'0px',bgcolor: 'secondary.main', color:grey[800], fontWeight:'bold', mb:'10px',mt:'10px',ml:'10px'}} variant="contained">Back</Button></Link>
                    <Container sx={{textAlign:'center', bgcolor:'transparent'}} >
                        <Card sx={{bgcolor:'custom.light'}} id='DetailCard'>
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
                                        <CameraIndoorIcon sx={{color:red[900]}}/>
                                    </IconButton>
                                    Online meet
                                </Typography>
                            </div>
                            <div className="right">
                                <Typography id='createdby' sx={{fontFamily: 'Nunito', fontSize: 14,color:grey[500]}} gutterBottom variant="h5" component="div">
                                    - Created by -
                                </Typography>
        
                                <div className="right-namephoto">
                                    <Avatar id='avatar' sx={{ bgcolor: yellow[500] }} src={detail?.avatar}></Avatar>
        
                                    <Typography id="h5" sx={{fontFamily: 'Nunito', fontSize: 16,color:'primary.light'}} gutterBottom variant="h5" component="div">
                                        {profileUser.name}
                                    </Typography>
                                </div>
                            </div>
        
                        </CardContent>
        
                        <div className="text">
                            <div className="descriptionDetailOnline">
                                <h3>Meet link:</h3>
                                <h4>{detail?.meet_link}</h4>
                            </div>
                            <div className="descriptionDetailOnline">
                                <h3>Description:</h3>
                                <h4>{detail?.content}</h4>
                            </div>
                        </div>
        
                        <CardContent sx={{fontFamily: 'Nunito'}}>
                            <div className="info2">
                                <Button id='assistButton' sx={{bgcolor: 'secondary.main', color:grey[800]}} variant="contained" onClick={submitEvent}>Assist</Button>
                                
                                <div className="date-hour-part">
                                    <ParticipantsModal participants={detail.participants}/>
                                    <span>Date: {date} hs.</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </div>
            )
        }
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