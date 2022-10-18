import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import PostList from "../../Posts/PostList";
import "./Home.css";
import CreatePost from "../../Posts/CreatePost";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyID } from "../../../Redux/actions";
import { Avatar, Card, CardHeader } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";

export default function Home() {

  let users_finded = useSelector((state) => state.searchByNameUsers);

  return (
    <div className="Home">
      <div className="navbar">
        <span></span>
      </div>
      <NavBar />
      <div className="media-part">
        <div className="leftHome">
          <div className="finded-persons">
              {
                typeof users_finded === 'object' && users_finded?.map(u => {
                  return(
                    <Card sx={{width: 130, bgcolor: grey[400], fontFamily: 'Nunito', color:grey[900], mb:2,mt:1}}>
                      <CardHeader
                          sx={{p:1}}
                          avatar={
                          <Avatar sx={{ bgcolor: yellow[500]}} src={u.image}>
                          </Avatar>
                          }
                          title={u.name}
                      />
                    </Card>
                  )})
              }
          </div>
          <EventsMenu />
        </div>
        <div className="centerHome">
          <PostList />
        </div>
        <div className="rightHome"></div>
      </div>
      
    </div>
  );
}

<CreatePost />