import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import PostList from "../../Posts/PostList";
import './Home.css';

export default function Home() {
    return (
        <div className='Home'>
            <div className="navbar">
                <NavBar/>
            </div>
            <div className="media-part">
                <div className="leftHome">
                    <EventsMenu/>   
                </div>
                <div className="centerHome">
                    <PostList/>
                </div>
                <div className="rightHome">
                    
                </div>
            </div>
        </div>
    )
}