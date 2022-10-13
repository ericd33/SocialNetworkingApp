import { Button, Card, Typography } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import './EventsMenu.css'

export default function EventsMenu() {
    return (
        <Card sx={{width:200, bgcolor:grey[300]}}>
            <div className="eventsMenu">
                <Typography sx={{fontFamily: 'Nunito', fontSize: 14,color:grey[900]}} gutterBottom variant="h5" component="div">
                    - Events -
                </Typography>
            </div>
            <div className="buttons">
                <Button id='assistButton' sx={{bgcolor: yellow[500], color:grey[900], fontSize: 11}} variant="contained">
                    Create Event
                </Button>
                <Button id='assistButton' sx={{bgcolor: yellow[500], color:grey[900], fontSize:11}} variant="contained">
                    Assist an event
                </Button>
            </div>
        </Card>
    )
}