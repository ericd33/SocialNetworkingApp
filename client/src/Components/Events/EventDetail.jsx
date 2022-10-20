import { Avatar, Button, Card, Container, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import './EventDetail.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { details, deleteDetails, assitEvent, getMyUser } from "../../Redux/actions.js";
import { useParams } from 'react-router-dom'
import React from 'react'
import NavBar from "../navbar/Navbar";
import LocationOnIcon from '@mui/icons-material/LocationOn';



export default function EventDetail({participants}) {
    const detail = useSelector(d=>d.details)
    const users = useSelector(d=>d.myUser)
    let token = window.localStorage.getItem('token')
    let user = window.localStorage.getItem('user')
    user = JSON.parse(user)
    let emailU =user.email
		// console.log(emailU)
    token=token.slice(1,-1)
    const dispatch = useDispatch()
    const { id }= useParams()
    const [Assist,setAssist]= useState(true)

		const payload ={
			eventId: id,
			userEmail: emailU,
		}
    
    useEffect(()=>{
        dispatch(details(id,token))
        return()=>{
            dispatch(deleteDetails())
        }
    },[dispatch,id,Assist])

		const submitEvent = ()=>{
			dispatch(assitEvent(token, payload))
            setAssist(!Assist)
		}
    // console.log(detail)
    return (
            <Container sx={{textAlign:'center', width:'100%'}} >
               <div>
								{console.log(detail)}
                    <div className="navbar">
                        <span></span>
                    </div>
                    <NavBar />
                </div> 
                <Card>
                    <CardMedia
                    component="img"
                    alt="image"
                    height="140"
                    image={detail?.image}
                />
                <CardContent className="infoEvent">
                    <div className="left">
                        <Typography sx={{fontFamily: 'Nunito', fontSize: 27,color:grey[900]}} gutterBottom variant="h5" component="div">
                            {detail?.name}
                        </Typography>
                        <Typography sx={{fontFamily: 'Nunito', fontSize: 18,color:grey[700]}} gutterBottom variant="h5" component="div">
                            <IconButton>
                                <LocationOnIcon/>
                            </IconButton>
                            {detail?.location}
                        </Typography>
                    </div>
                    <div className="right">
                        <Typography id='createdby' sx={{fontFamily: 'Nunito', fontSize: 12,color:grey[500]}} gutterBottom variant="h5" component="div">
                            - Created by -
                        </Typography>

                        <div className="right-namephoto">
                            <Avatar sx={{ bgcolor: yellow[500] }} src={detail?.avatar}></Avatar>

                            <Typography id="h5" sx={{fontFamily: 'Nunito', fontSize: 16,color:grey[800]}} gutterBottom variant="h5" component="div">
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
                        {/* {console.log(detail.participants)} */}
					    {detail.participants?.includes(emailU) ? <Button id='assistButton' sx={{bgcolor: yellow[500], color:grey[800]}} variant="contained" onClick={submitEvent}>No Assist</Button>:<Button id='assistButton' sx={{bgcolor: yellow[500], color:grey[800]}} variant="contained" onClick={submitEvent}>Assist</Button>}
                        {/* <Button id='assistButton' sx={{bgcolor: yellow[500], color:grey[800]}} variant="contained" onClick={submitEvent}>Assist</Button> */}
                        <div className="date-hour-part">
                            <span>Participants: 
                                {detail.participants?.map((p,index)=>{
                                        // dispatch(getMyUser(token,p))
                                    return(
                                        <div key={index}>{p}</div>
                                    )
                                })}
                            </span>
                            <span>Date: {detail?.date}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Container>
    
    )
}