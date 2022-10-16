import { Avatar, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import './EventDetail.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { details, deleteDetails  } from "../../Redux/actions.js";
import { Link, useParams } from 'react-router-dom'
import React from 'react'



export default function EventDetail({participants}) {
    const detail = useSelector(d=>d.details)
    const dispatch = useDispatch()
    const { id }= useParams()
    useEffect(()=>{
        dispatch(details(id))
        return()=>{
            dispatch(deleteDetails())
        }
    },[dispatch,id])
    return (
        
            <Card sx={{width:800}}>
                <Link to={'/event'}><button>events</button></Link>
                <CardMedia
                component="img"
                alt="image"
                height="140"
                image={detail?.image}
            />
            <CardContent className="infoEvent">
                <div className="left">
                    <Typography sx={{fontFamily: 'Nunito', fontSize: 27,color:grey[900]}} gutterBottom variant="h5" component="div">
                        {detail?.title}
                    </Typography>
                    <Typography sx={{fontFamily: 'Nunito', fontSize: 18,color:grey[700]}} gutterBottom variant="h5" component="div">
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
                    <Button id='assistButton' sx={{bgcolor: yellow[500], color:grey[800]}} variant="contained">Assist</Button>
                    
                    <div className="date-hour-part">
                        <span>Participants: {participants}</span>
                        <span>Date: {detail?.date}</span>
                        <span>Hour: {detail?.hour} hs.</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    
    )
}