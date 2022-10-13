import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import { yellow, grey } from '@mui/material/colors';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

export default function Post({photoperfil,text,name,image}) {

        return (
            
            <Card sx={{width: 600, bgcolor: grey[300], fontFamily: 'Nunito', color:grey[900]}}>
                <CardHeader
                    sx={{pt: 0, pb: 0, mt:2}}
                    avatar={
                    <Avatar sx={{ bgcolor: yellow[500]}} src={photoperfil}>
                    </Avatar>
                    }
                    title={name}
                    subheader="1h"
                />
                <CardContent sx={{pb:1}}>
                    {text}
                </CardContent>

                {
                    image? <CardMedia
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
                    <p>25 likes</p>

                    <IconButton>
                        <ThumbDownOffAltIcon/>
                    </IconButton>
                    <p>6 dislikes</p>
    
                    <IconButton>
                        <ChatBubbleOutlineRoundedIcon/>
                    </IconButton>
                    <p>12 comments</p>
    
                    <IconButton>
                        <ReplyIcon />
                    </IconButton>
                    <p>3 shares</p>
                </CardActions>
            </Card>
        )
}