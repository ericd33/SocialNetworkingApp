import { Avatar, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import './EventDetail.css';

export default function EventDetail({location,title,creator,text,image,photoperfil,participants,date,hour}) {
    return (
        <Card sx={{width:800}}>
            <CardMedia
                component="img"
                alt="image"
                height="140"
                image={image}
            />
            <CardContent className="infoEvent">
                <div className="left">
                    <Typography sx={{fontFamily: 'Nunito', fontSize: 27,color:grey[900]}} gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography sx={{fontFamily: 'Nunito', fontSize: 18,color:grey[700]}} gutterBottom variant="h5" component="div">
                        {location}
                    </Typography>
                </div>
                <div className="right">
                    <Typography id='createdby' sx={{fontFamily: 'Nunito', fontSize: 12,color:grey[500]}} gutterBottom variant="h5" component="div">
                        - Created by -
                    </Typography>

                    <div className="right-namephoto">
                        <Avatar sx={{ bgcolor: yellow[500] }} src={photoperfil}></Avatar>

                        <Typography id="h5" sx={{fontFamily: 'Nunito', fontSize: 16,color:grey[800]}} gutterBottom variant="h5" component="div">
                            {creator}
                        </Typography>
                    </div>

                </div>

            </CardContent>

            <CardContent sx={{fontFamily: 'Nunito'}}>
                <div className="text">
                    {text}
                </div>
            </CardContent>

            <CardContent sx={{fontFamily: 'Nunito'}}>
                <div className="info2">
                    <Button id='assistButton' sx={{bgcolor: yellow[500], color:grey[800]}} variant="contained">Assist</Button>
                    
                    <div className="date-hour-part">
                        <span>Participants: {participants}</span>
                        <span>Date: {date}</span>
                        <span>Hour: {hour} hs.</span>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}