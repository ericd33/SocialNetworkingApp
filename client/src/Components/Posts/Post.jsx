import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import { yellow, grey } from '@mui/material/colors';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentsModal from './Modals/CommentsModal';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

export default function Post({text,author,comments,likes,image}) {
        const [User, setUser] = useState({name:'',avatar:''});

        useEffect(() => {
            axios.get(`${process.env.REACT_APP_MY_API_URL}/users/${author}`)
            .then((user) => {
                setUser({
                    name: user.data.name,
                    avatar: user.data.image
                });
            })
            .catch(function(err) {console.log(err)});
        },[])
    


        return (
            <div>
                <br/>
                <Card sx={{width: 600, bgcolor: grey[300], fontFamily: 'Nunito', color:grey[900]}}>
                    <CardHeader
                        sx={{pt: 0, pb: 0, mt:2}}
                        avatar={
                        <Avatar sx={{ bgcolor: yellow[500]}} src={User.avatar}>
                        </Avatar>
                        }
                        title={User.name}
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
                        <p>{likes.length} likes</p>


                        {/* ----Dislikes para un FUTURO---- */}
                        
                        {/* <IconButton>
                            <ThumbDownOffAltIcon/>
                        </IconButton>
                        <p>6 dislikes</p> */}
                        {
                            comments.length !== 0 ?
                            <CommentsModal comments={comments}/>
                            :
                            <IconButton>
                                <ChatBubbleOutlineRoundedIcon/>
                            </IconButton>
                        }
                        <p>{comments.length} comments</p>
        
                        {/* --- Shares para FUTURO --- */}

                        {/* <IconButton>
                            <ReplyIcon />
                        </IconButton>
                        <p>3 shares</p> */}
                    </CardActions>
                </Card>
            </div>
        )
}