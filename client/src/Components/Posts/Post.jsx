import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import { yellow, grey } from '@mui/material/colors';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Post({text,author,comments,likes,image}) {

        const [user, setUser] = useState({name:''});

        useEffect(() => {
            axios.get(`http://localhost:3001/users/${author}`)
            .then((user) => {
                setUser({
                    name: user.name
                });
            })
            .catch(function(err) {console.log(err)});
        },[])

        return (
            
            <Card sx={{width: 600, bgcolor: grey[300], fontFamily: 'Nunito', color:grey[900]}}>
                <CardHeader
                    sx={{pt: 0, pb: 0, mt:2}}
                    avatar={
                    <Avatar sx={{ bgcolor: yellow[500]}}>
                    </Avatar>
                    }
                    // src={photoperfil} propiedad del objeto avatar
                    title={user.name}
                    subheader="1h"
                />
                <CardContent sx={{pb:1}}>
                    {text}
                </CardContent>
                
                {
                    image ? <CardMedia
                    component="img"
                    alt="image"
                    height='400'
                    image={image}
                    /> : <div></div>
                }    

                <CardActions disableSpacing>
                    <IconButton>
                        <ThumbUpOffAltIcon/>
                    </IconButton>
                    {/* <p>{likes} likes</p> */}


                    {/* ----Dislikes para un FUTURO---- */}
                    
                    {/* <IconButton>
                        <ThumbDownOffAltIcon/>
                    </IconButton>
                    <p>6 dislikes</p> */}
    
                    <IconButton>
                        <ChatBubbleOutlineRoundedIcon/>
                    </IconButton>
                    <p>{comments.length} comments</p>
    
                    {/* --- Shares para FUTURO --- */}

                    {/* <IconButton>
                        <ReplyIcon />
                    </IconButton>
                    <p>3 shares</p> */}
                </CardActions>
            </Card>
        )
}