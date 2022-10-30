import { Button, Card, CardActions, CardContent, CardMedia, Icon, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from "react-router-dom";
import './EventCard.css';
import { useDispatch } from "react-redux";
import { banEvents } from "../../Redux/actions";
import { useUserAuth } from "../../context/UserAuthContext";
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';

export default function EventCard({location,name,text,image,date,id,enabled,type}) {
    date = date.replace('T',' / ').substring(0,date.length-6)
    const dispatch = useDispatch()
    const {user} = useUserAuth();
    let token = user.accessToken;
    const userE = JSON.parse(localStorage.getItem('user'));
    const handleBanEvent = () =>{
        if(enabled){
            if(enabled){
                let data = {
                    id:id,
                    action:"disable"
                }
                dispatch(banEvents(data,token))
        }else{
            let data = {
                id:id,
                action:"enable"
            }
            dispatch(banEvents(data,token))
        }

    }
}
    return (
        <div>
            <br/>
            <Card sx={{ width: 600, bgcolor: 'custom.dark', borderRadius:3}} id='EventCard'>
            <Typography sx={{fontSize: 14, fontFamily: 'Nunito', mt: '1px', ml:1, color:grey[800], pb:'1px'}} color="text.secondary" gutterBottom>
                <Icon sx={{pt:'1px'}}>
                    {
                        type === 'in-person' ? <LocationOnIcon sx={{color:red[900]}}/> : <CameraIndoorIcon sx={{color:red[900]}}/>
                    }
                </Icon>
                <span id='location'>{type === 'in-person' ? location : 'Online meet'}</span> - <span id='dateHour'>{date} hs.</span>
                
            </Typography>
            <CardMedia
                component="img"
                alt={image ?? "events"}
                height="140"
                image={image ?? 'https://images.squarespace-cdn.com/content/v1/5ca4ccae8dfc8c3d55b30c4b/1554485986869-KXBAG4G64H3FCQT7RYPJ/Events.jpg?format=2500w'}
            />
            <CardContent>
                <Typography sx={{fontFamily: 'Nunito', color:'primary.light'}} gutterBottom variant="h5" component="div">
                {name}
                </Typography>
                {
                    userE.role==="admin"
                    ? <div><button onClick={handleBanEvent}>ban</button><span style={{color:"#fff"}}>{enabled?"true":"false"}</span></div>
                    :<></>
                }
                <Typography sx={{fontFamily: 'Nunito', color:'primary.dark'}} variant="body2" color="text.secondary">
                {text?.substring(0,100)+'...'}
                </Typography>
            </CardContent>
            <CardActions sx={{mt:0}}>
                <Link to={`/events/${id}`}><Button sx={{color:"secondary.main"}} size="small" >Learn More</Button></Link>
            </CardActions>
            </Card>
        </div>
    )
}