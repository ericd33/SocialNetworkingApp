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

export default function AboutUs() {
  const [modal, setModal] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("user"))

  const opencloseModal = () => {
    setModal(!modal);
  };
  console.log(user)

  const body = (
    <Card
      className="postCreator"
      sx={{
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
        This is our Team. A group of developers that create this WebSite for people who works on IT area.
        </p>

<div className="cards">
      <div className="devCards"> <img src={ FedeRosales } className="image"  alt="Not found"/>
        <h4 className="devName"> Federico Salvador Rosales </h4>
       <div className="devButtons"><Button href="https://www.linkedin.com/in/federico-salvador-rosales-183824245/" >
            <LinkedInIcon/></Button> 
            <Button href="https://github.com/FedeRosaless">
                <GitHubIcon/></Button> </div> </div> 

        <div className="devCards"> 
        <h4 className="devName"> Eric Alan Daniele </h4>
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