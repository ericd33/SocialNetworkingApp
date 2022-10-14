import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import PostList from "../../Posts/PostList";
import './Home.css';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { IconButton } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";

export default function Home() {
    return (
        <div className='Home'>
            <div className="navbar">
                <span></span>
            </div>
            <NavBar/>
            <div className="media-part">
                <div className="leftHome">
                    <EventsMenu/>   
                </div>
                <div className="centerHome">
                    <PostList/>
                </div>
                <div className="rightHome">
                </div>
                <IconButton id='buttonPost' sx={{bgcolor:yellow[500]}}>
                    <PostAddOutlinedIcon sx={{color:grey[800]}}/>  
                </IconButton>
            </div>
        </div>
    )
}