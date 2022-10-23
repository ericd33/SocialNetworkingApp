import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import PostList from "../../Posts/PostList";
import "./Home.css";
import { useSelector } from "react-redux";
import { Avatar, Card, CardHeader } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import Follow from "./follow";
import CreatePost from '../../Posts/CreatePost'
import CreateEvent from "../../Events/CreateEvent";
import { useUserAuth } from "../../../context/UserAuthContext";
import FilterPost from "./FilterPost";
export default function Home() {
  let users_finded = useSelector((state) => state.searchByNameUsers);
  const {user} = useUserAuth();
  return (
    <div className="Home">
      <div className="navbar">
        <span></span>
      </div>
      <CreatePost />
      <NavBar />
      <div className="media-part">
        <div className="leftHome">
          <div className="finded-persons">
            {typeof users_finded === "object" && users_finded.length !== 0 ? (
              users_finded.map((u) => {
                return (
                  <Card
                    className="cardFinded"
                    sx={{
                      width: 170,
                      bgcolor: 'custom.main',
                      color: grey[900],
                      mb: 2,
                      mt: 1,
                      borderRadius:3
                    }
                  }
                  >
                    <CardHeader
                      sx={{ p: 1 , color:'primary.light'}}
                      avatar={
                        <Avatar
                          src={u.image}
                        ></Avatar>
                      }
                      title={u.name}
                    />
                      {
                        (user.email===u.email)
                          ? <div></div>
                          : <Follow email={u.email}/>
                      }
                  </Card>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
          <EventsMenu />
        </div>
        <div className="centerHome">
          <FilterPost />
          <PostList />
        </div>
        <div className="rightHome"></div>
      </div>
      <CreatePost />
    </div>
  );
}