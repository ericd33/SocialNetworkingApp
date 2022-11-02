import { useState } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./AboutUs.css";
import { useDispatch } from "react-redux";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FedeRosales from './DevelopersPhotos/FedeRosaless.jpg'
import AlejoAvendaño from './DevelopersPhotos/AlejoAvendaño.jpg'
import CarolinaForner from './DevelopersPhotos/CarolinaForner.jpg'
import DanielMolina from './DevelopersPhotos/DanielMolina.jpg'
import PatricioPereyra from './DevelopersPhotos/PatricioPereyra.jpg'
import EricDaniele from './DevelopersPhotos/EricDaniele.jpg'
import { useUserAuth } from "../../context/UserAuthContext";
import { newOpinion } from "../../Redux/actions";
import { TextField } from "@mui/material";

export default function AboutUs() {
  const [modal, setModal] = useState(false);
  const { user } = useUserAuth();
  let token = user.accessToken;
  const dispatch = useDispatch();

  const opencloseModal = () => {
    setModal(!modal);
  };
  console.log( 'userrr',  user)



  const [opinion, setOpinion] = useState({
    authorOpinion: user.email,
    avatar: user.image,
    name: user.name,
    text: "",
  });

  const handleChangeOpinion = (e) => {
     e.preventDefault();
    setOpinion({
      ...opinion,
      "text": e.target.value,
    });
  };

  const handleSubmmitOpinion = (e) => {
    e.preventDefault();
    dispatch(newOpinion(token, opinion));
    setOpinion({
      authorOpinion: user.email,
      avatar: user.image,
      name: user.name,
      text: "",
    });
  };




  const body = (
    <Card
      className="postCreator"
      sx={{
        maxWidth: '90%',
        width: 600,
        borderRadius: "15px",
        bgcolor: "custom.main",
        fontFamily: "Nunito",
        color: "primary.light",
      }}
    >
      <CardContent>
      <div className="headerModal">
          <h2>ConcatUs Team:<span className="outl"> About Us</span></h2>
          <IconButton
            sx={{ width: "35px", height: "35px", top: "20px" }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <p>
        We're a group of Software Developers who love coding. We've been working as a team to bring this project to light and we hope you like it!.
        </p>
        <div className="inputsdeComments">
          <TextField
            id="filled-multiline-static"
            label="Thoughts on our project?"
            value={opinion?.text}
            variant="filled"
            name="text"
            onChange={handleChangeOpinion}
          />
          <Button
            sx={{ mb: '2px', fontFamily: "Nunito", color: "primary.dark", borderRadius:'12px', height: '47px', width: '90px', marginBottom: '10px' }}
            variant="outlined"
            onClick={handleSubmmitOpinion}
          >
            Leave Feedback
          </Button>
        </div>

<div className="cards">
      <div className="devCards"> <img src={ FedeRosales } className="image"  alt="Not found"/>
        <h4 className="devName"> Federico Rosales </h4>
       <div className="devButtons"><Button href="https://www.linkedin.com/in/federico-salvador-rosales-183824245/" >
            <LinkedInIcon/></Button> 
            <Button href="https://github.com/FedeRosaless">
                <GitHubIcon/></Button> </div> </div> 

        <div className="devCards"> <img src={ EricDaniele } className="image"  alt="Not found"/>
        <h4 className="devName"> Eric Daniele </h4>
        <div className="devButtons"><Button href="https://www.linkedin.com/in/danieleeric/">
            <LinkedInIcon/></Button> 
            <Button href="https://github.com/ericd33">
                <GitHubIcon/></Button><br/> </div> </div>

        <div className="devCards"> <img src={ CarolinaForner } className="image"  alt="Not found"/>
        <h4 className="devName"> Carolina Forner </h4>
        <div className="devButtons"><Button href="https://www.linkedin.com/in/carolina-forner/">
            <LinkedInIcon/></Button> 
            <Button href="hhttps://github.com/caroo334">
                <GitHubIcon/></Button><br/> </div> </div>

</div>
<div className="cards2">

        <div className="devCards"> <img src={ DanielMolina } className="image"  alt="Not found"/>
        <h4 className="devName"> Daniel Molina </h4>
        <div className="devButtons"><Button href="https://www.linkedin.com/in/daniel-molina-a61b85236">
            <LinkedInIcon/></Button> 
            <Button href="https://github.com/masterchip14">
                <GitHubIcon/></Button><br/> </div> </div>


        <div className="devCards"> <img src={ PatricioPereyra } className="image"  alt="Not found"/>
        <h4 className="devName">Patricio Pereyra </h4>
        <div className="devButtons"><Button href="https://www.linkedin.com/in/patricio-pereyra-gargiulo-701617245/">
            <LinkedInIcon/>
            </Button> <Button href="https://github.com/Patriciopg02">
                <GitHubIcon/></Button><br/> </div> </div>

        <div className="devCards"> <img src={ AlejoAvendaño } className="image"  alt="Not found"/>
        <h4 className="devName">Alejo Avendaño </h4>
        <div className="devButtons"><Button href="https://www.linkedin.com/in/alejo-avenda%C3%B1o-full-stack-web-developer-5420a620a/">
            <LinkedInIcon/></Button>
            <Button href="https://github.com/AlejoAvendanio">
                <GitHubIcon/></Button><br/> </div> </div>
                
                </div>

      </CardContent>
    </Card>
  );

  return (
    <div className="container">
      <Button onClick={() => opencloseModal()}>
        About Us
      </Button>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}