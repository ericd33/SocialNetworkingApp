import { Button, Card, CardContent, IconButton, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUserAuth } from "../../../../context/UserAuthContext";
import { imageChange, nameChange, presentationChange, webSiteChange } from "../../../../Redux/actions";
import CloseIcon from "@mui/icons-material/Close";
import './EditProfile.css';


export function EditProfile (){
const [modal, setModal] = useState(false);
const opencloseModal = () => {
    setModal(!modal);
  };
const dispatch = useDispatch()
const {user} = useUserAuth()
const [image,setImage ] = useState("")
const [name,setName]= useState("")
const [presentation,setPresentation]= useState("")
const [webSite,setWebSite]= useState("")

const handleWebSite = (e)=>{
    setWebSite(e.target.value)
}
const webSites ={
    email:user.email,
    website:webSite
}
const handleImage = (e)=>{
    setImage(e.target.value)
}
const images ={
    email:user.email,
    image:image
}
const handleName = (e)=>{
    setName(e.target.value)
}
const handlePresentation = (e)=>{
    setPresentation(e.target.value)
}
const names ={
    email:user.email,
    name:name
}
const presentations ={
    email:user.email,
    presentation:presentation
}
console.log(image)
let token = user.accessToken
const handleSubmitImage = (e)=>{
    e.preventDefault()
    dispatch(imageChange(images,token))
}
const handleSubmitWebSite = (e)=>{
    e.preventDefault()
    dispatch(webSiteChange(webSites,token))
}
const handleSubmitName = (e)=>{
    e.preventDefault()
    dispatch(nameChange(names,token))
}
const handleSubmitPresentation=(e)=>{
    e.preventDefault()
    dispatch(presentationChange(presentations,token))
}

const body = (
    <Card
      className="ProfileEdit"
      sx={{
        width: 500,
        borderRadius: "15px",
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
        maxHeight: 400
      }}
    >
      <CardContent>
        <div className="headerModal">
          <h2>Edit profile</h2>
          <IconButton
            id='closeIcon'
            sx={{ width: "35px", height: "35px", top: "20px",
            bgcolor:'custom.light' }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon sx={{pr:'1px'}}/>
          </IconButton>
        </div>
        {/* <div className="inputsdePost">
          <TextField
            id="filled-multiline-static"
            label="What do you want to share?"
            multiline
            rows={4}
            value={formState.content}
            variant="filled"
            name="content"
            className="textField"
            onChange={handleChange}
          />
          <TextField id="filled-basic" 
          label="Image link" variant="filled" 
          value={formState.image}
          name="image"
          className="textField"
          onChange={handleChange}
          />
        </div> */}
        <div className="inputsdePerfil">
            <div>
                <TextField
                    id="filled-multiline-static"
                    label="Change avatar"
                    value={image}
                    variant="filled"
                    onChange={handleImage}
                />
                <Button onClick={handleSubmitImage} id='assistButton' sx={{bgcolor: 'secondary.main', color:'custom.dark', fontSize:11}} variant="contained">
                    Submit
                </Button>
            </div>
            <div>
                <TextField
                    id="filled-multiline-static"
                    label="Change name"
                    value={name}
                    variant="filled"
                    onChange={handleName}
                />
                <Button onClick={handleSubmitName} id='assistButton' sx={{bgcolor: 'secondary.main', color:'custom.dark', fontSize:11}} variant="contained">
                    Submit
                </Button>
            </div>
            <div>
                <TextField
                    id="filled-multiline-static"
                    label="Add a presentation"
                    value={presentation}
                    variant="filled"
                    onChange={handlePresentation}
                />
                <Button onClick={handleSubmitPresentation} id='assistButton' sx={{bgcolor: 'secondary.main', color:'custom.dark', fontSize:11}} variant="contained">
                    Submit
                </Button>
            </div>

            <div>
                <TextField
                    id="filled-multiline-static"
                    label="Add a website:"
                    value={webSite}
                    variant="filled"
                    onChange={handleWebSite}
                />
                <Button onClick={handleSubmitWebSite} id='assistButton' sx={{bgcolor: 'secondary.main', color:'custom.dark', fontSize:11}} variant="contained">
                    Submit
                </Button>
            </div>
        </div>
    </CardContent>
  </Card>
  );

    return(
        <div>
            <Button onClick={() => opencloseModal()} id='assistButton' sx={{bgcolor: 'secondary.main', color:'custom.dark', fontSize:11}} variant="contained">
              Edit perfil
              </Button>
            <Modal open={modal} onClose={opencloseModal}>
                {body}
            </Modal>
        </div>
    )
}