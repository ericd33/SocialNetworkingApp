import { Button, Card, CardActions, CardContent, CardMedia, Icon, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function PostEvent({location,title,creator,text,image,photoperfil,date,hour}) {
    return (
        <Card sx={{ width: 600, bgcolor: grey[300], color:grey[900]}}>
        <Typography sx={{fontSize: 14, fontFamily: 'Nunito', mt: '1px', ml:1, color:grey[800], pb:'1px'}} color="text.secondary" gutterBottom>
            <Icon sx={{pt:'1px'}}>
                <LocationOnIcon/>
            </Icon>
            <span>{location} - {date} - {hour} hs.</span>
            
        </Typography>
        <CardMedia
            component="img"
            alt={image ?? "events"}
            height="140"
            image={image ?? 'https://images.squarespace-cdn.com/content/v1/5ca4ccae8dfc8c3d55b30c4b/1554485986869-KXBAG4G64H3FCQT7RYPJ/Events.jpg?format=2500w'}
        />
        <CardContent>
            <Typography sx={{fontFamily: 'Nunito', color:grey[900]}} gutterBottom variant="h5" component="div">
            {title}
            </Typography>
            <Typography sx={{fontFamily: 'Nunito', color:grey[800]}} variant="body2" color="text.secondary">
            {text?.substring(0,100)+'...'}
            </Typography>
        </CardContent>
        <CardActions sx={{mt:0}}>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
        </CardActions>
        </Card>
    )
}