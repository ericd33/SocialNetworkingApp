import { Avatar, Button, Card, Container, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { grey, red, yellow } from "@mui/material/colors";
import './EventDetail.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { details, deleteDetails, assitEvent  } from "../../Redux/actions.js";
import { Link, useParams } from 'react-router-dom';
import React, {useState}  from 'react';
import NavBar from "../navbar/Navbar";
import LocationOnIcon from '@mui/icons-material/LocationOn';



export default function EventDetail() {
    var detail = useSelector(state => state.details);
    let token = window.localStorage.getItem('token')
    let user = window.localStorage.getItem('user')
    user = JSON.parse(user)
    let emailU =user.email
		// console.log(emailU)
    token=token.slice(1,-1)
    const dispatch = useDispatch()
    const { id }= useParams()
    const [ assist , setAssist ] = useState(true)

		const payload ={
			eventId: id,
			userEmail: emailU,
		}
    
    useEffect(()=>{
        dispatch(details(id,token))
        return()=>{
            dispatch(deleteDetails())
        }
    },[dispatch,id,assist])

	const submitEvent = ()=>{
		dispatch(assitEvent(token, payload))
		setTimeout(()=>{
			setAssist(!assist)
		},1000)};
      
    if (detail.length !== 0) {
        console.log(detail);
        return (
            <div className='EventDetailContainer'>
                <Link to={'/events'}><Button sx={{position:'absolute', top:'0px', left:'0px',bgcolor: yellow[500], color:grey[800], fontWeight:'bold', mb:'10px',mt:'10px',ml:'10px'}} variant="contained">Back</Button></Link>
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
    
                    <CardContent sx={{fontFamily: 'Nunito'}}>
                        <div className="text">
                            {detail?.content}
                        </div>
                    </CardContent>
    
                    <CardContent sx={{fontFamily: 'Nunito'}}>
                        <div className="info2">
                            <Button id='assistButton' sx={{bgcolor: yellow[500], color:grey[800]}} variant="contained" onClick={submitEvent}>Assist</Button>
                            
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